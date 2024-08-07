import { Adapter } from '@solana/wallet-adapter-base';
import { Connection, Keypair, VersionedTransaction } from '@solana/web3.js';

import { TORQUE_API_ROUTES } from '../constants/index.js';
import {
  ApiResponse,
  ApiTxnTypes,
  AudienceFunctionResponse,
  SignTransaction,
  TxnExecute,
  TxnExecuteResponse,
  TxnInput,
  WithSignature,
} from '../types/index.js';
import { base64ToUint8Array, uint8ArrayToBase64 } from '../utils.js';

/**
 * Options for the TorqueRequestClient.
 */
export type TorqueRequestOptions = {
  /**
   * The signer used to sign transactions.
   */
  signer?: Adapter | Keypair;
  /**
   * The API key for the client.
   */
  apiKey?: string;
  /**
   * The API URL for the client.
   */
  apiUrl?: string;
  /**
   * The app URL for the client.
   */
  appUrl?: string;
  /**
   * The functions URL for the client.
   */
  functionsUrl?: string;
  /**
   * The connection for the client.
   */
  connection?: Connection;
  /**
   * The function used to sign transactions. If provided, it will override the default signing method.
   */
  signTransaction?: SignTransaction;
};

/**
 * The TorqueRequestClient class is used to make requests to the Torque API.
 * It provides methods for performing API requests and handling responses.
 *
 * @example
 * const client = new TorqueRequestClient(<options>);
 *
 * const response = await client.apiFetch<T>("https://api.torque.so/v1/users");
 */
export class TorqueRequestClient {
  private apiKey: string | undefined;
  private apiAuthHeader: Record<string, string>;
  private signer: Adapter | Keypair | undefined;
  private apiUrl: string;
  private appUrl: string;
  private functionsUrl: string;
  private connection: Connection | undefined;
  private signTransaction: SignTransaction | undefined;

  /**
   * Create a new instance of the TorqueRequestClient class.
   *
   * @param {Adapter | Keypair} signer - The signer used to sign transactions.
   * @param {string} apiKey - The API key for the client.
   *
   * @throws {Error} Throws an error if a signer is not provided.
   */
  constructor(options: TorqueRequestOptions) {
    const { signer, apiKey, apiUrl, appUrl, functionsUrl, connection, signTransaction } = options;

    this.signer = signer;
    this.apiKey = apiKey;
    this.apiUrl = apiUrl ?? 'https://api.torque.so';
    this.appUrl = appUrl ?? 'https://app.torque.so';
    this.functionsUrl = functionsUrl ?? 'https://functions.torque.so';
    this.connection = connection;
    this.signTransaction = signTransaction;
    this.apiAuthHeader = apiKey
      ? {
          'x-torque-api-key': `${this.apiKey}`,
        }
      : {};
  }

  /**
   * Perform a regular request to any endpoint.
   *
   * @template {object} T - The type of the response data.
   *
   * @param {string} url - The URL of the API endpoint.
   * @param {RequestInit} options - The options for the request.
   *
   * @returns {Promise<T>} The response from the API.
   *
   * @throws {Error} If there is an error performing the request.
   */
  public static async anyFetch<T>(url: string, options?: RequestInit) {
    const reqOptions: RequestInit = {
      ...options,
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
    };

    try {
      const response = await fetch(url, reqOptions);
      const result = (await response.json()) as unknown as T;

      return result;
    } catch (error) {
      console.error(error);

      throw new Error('There was an error performing the request.');
    }
  }

  /**
   * Perform a request to the Torque API.
   *
   * @template {object} T - The type of the response data.
   *
   * @param {string} url - The URL of the API endpoint.
   * @param {RequestInit} options - The options for the request.
   *
   * @returns {Promise<T>} The response from the API.
   *
   * @throws {Error} If there is an error performing the request.
   */
  public async apiFetch<T>(url: string, options?: RequestInit, supressError = false) {
    const reqOptions: RequestInit = {
      credentials: 'include',
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...this.apiAuthHeader,
        ...options?.headers,
      },
    };

    try {
      const fetchUrl = `${this.apiUrl}${url}`;

      // TODO: Setup request caching
      const response = await fetch(fetchUrl, reqOptions);
      const result = (await response.json()) as unknown as ApiResponse<T>;
      if (result.status === 'SUCCESS') {
        return result.data;
      } else {
        throw new Error(result.message);
      }
    } catch (error) {
      if (!supressError) {
        console.error(error);
      }

      throw new Error('There was an error performing the request.');
    }
  }

  /**
   * Perform a request to a Torque Function endpoint.
   *
   * @template {object} T - The type of the response data.
   *
   * @param {string} url - The URL of the API endpoint.
   * @param {RequestInit} options - The options for the request.
   *
   * @returns {Promise<AudienceFunctionResponse<T>>} The response from the API.
   *
   * @throws {Error} If there is an error performing the request.
   */
  public async functionsFetch<T>(url: string, options?: RequestInit) {
    const reqOptions: RequestInit = {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...this.apiAuthHeader,
        ...options?.headers,
      },
    };

    try {
      const fetchUrl = `${this.functionsUrl}${url}`;

      // TODO: Setup request caching
      const response = await fetch(fetchUrl, reqOptions);
      const result = (await response.json()) as unknown as AudienceFunctionResponse<T>;

      return result;
    } catch (error) {
      console.error(error);

      throw new Error('There was an error performing the request.');
    }
  }

  /**
   * Builds and returns a serialized transaction from the API based on the provided transaction input.
   *
   * @template {object} T - The type of the response data.
   *
   * @param {TxnInput} txnInput - The input object of the transaction to build.
   * @param {string} [token] - The Torque API token to use for the transaction.
   *
   * @returns {Promise<T>} A promise that resolves with the serialized transaction.
   *
   * @throws {Error} Throws an error if the API is not able to build the transaction.
   */
  private async buildTransaction<T>(txnInput: TxnInput, token?: string) {
    const data = {
      ...(txnInput.txnType === ApiTxnTypes.CampaignCreate ? { createCampaign: txnInput.data } : {}),

      ...(txnInput.txnType === ApiTxnTypes.CampaignEnd ? { endCampaign: txnInput.data } : {}),

      ...(txnInput.txnType === ApiTxnTypes.PublisherCreate
        ? { createPublisher: txnInput.data }
        : {}),

      ...(txnInput.txnType === ApiTxnTypes.PublisherPayout
        ? { payoutPublisher: txnInput.data }
        : {}),
    };

    try {
      const txn = await this.apiFetch(TORQUE_API_ROUTES.transactions.build, {
        method: 'POST',
        body: JSON.stringify({ ...data }),
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return txn as T & { serializedTx: string };
    } catch (error) {
      console.error(error);

      throw new Error('Unable to prepare the transaction.');
    }
  }

  /**
   * Executes the serialized transaction using the API.
   *
   * @param {TxnExecute} txnExecuteInput - The input object of the transaction to execute.
   * @param {string} [token] - The Torque API token to use for the transaction.
   *
   * @returns {Promise<TxnExecuteResponse>} A promise that resolves with the signature of the transaction.
   *
   * @throws {Error} Throws an error if the API request is unsuccessful or if the transaction fails.
   */
  private async executeTransaction(txnExecuteInput: TxnExecute, token?: string) {
    const data = {
      ...(txnExecuteInput.txnType === ApiTxnTypes.CampaignCreate
        ? { createCampaign: txnExecuteInput.data }
        : {}),

      ...(txnExecuteInput.txnType === ApiTxnTypes.CampaignEnd
        ? { endCampaign: txnExecuteInput.data }
        : {}),

      ...(txnExecuteInput.txnType === ApiTxnTypes.PublisherCreate
        ? { createPublisher: txnExecuteInput.data }
        : {}),

      ...(txnExecuteInput.txnType === ApiTxnTypes.PublisherPayout
        ? { payoutPublisher: txnExecuteInput.data }
        : {}),
    };

    try {
      const txn = await this.apiFetch<TxnExecuteResponse>(TORQUE_API_ROUTES.transactions.execute, {
        method: 'POST',
        body: JSON.stringify({ ...data }),
        headers: {
          // todo: remove if token is undefined
          Authorization: `Bearer ${token}`,
        },
      });

      return txn;
    } catch (error) {
      console.error(error);

      throw new Error('Unable to execute the transaction.');
    }
  }

  /**
   * Builds and executes the transaction using the Torque API.
   *
   * @template {object} T - The type of the response data.
   *
   * @param {TxnInput} txnInput - The input object of the transaction to process.
   * @param {string} [token] - The Torque API token to use for the transaction.
   *
   * @returns {Promise<WithSignature>} A promise that resolves with the signature of the transaction.
   */
  public async transaction<T>(txnInput: TxnInput, token?: string) {
    if (!this.signer && !this.signTransaction) {
      throw new Error(
        'Cannot sign transaction. You need to provide a SignerWalletAdapter, Keypair, or a signTransaction function.',
      );
    }

    try {
      const { serializedTx, ...rest } = await this.buildTransaction<T>(txnInput, token);

      const txn = VersionedTransaction.deserialize(base64ToUint8Array(serializedTx));

      const blockhash = await this.connection?.getLatestBlockhash();

      if (blockhash) {
        txn.message.recentBlockhash = blockhash?.blockhash;

        const signedTx = this.signTransaction
          ? await this.signTransaction(txn)
          : this.signer && 'signTransaction' in this.signer
            ? await this.signer.signTransaction(txn)
            : this.signWithKeypair(txn);

        const userSignature = uint8ArrayToBase64(signedTx.signatures[0]);

        const executeInput = {
          txnType: txnInput.txnType,
          data: {
            userSignature,
            blockhash: txn.message.recentBlockhash,
            ...rest,
          },
        };

        const { signature } = await this.executeTransaction(executeInput, token);

        return { signature, ...rest } as WithSignature<T>;
      } else {
        throw new Error('Unable to get latest blockhash.');
      }
    } catch (error) {
      console.error(error);

      throw new Error('The transaction was unable to be processed.');
    }
  }

  /**
   * Signs a transaction with a Keypair.
   *
   * @param {VersionedTransaction} txn - The transaction to sign.
   *
   * @returns {VersionedTransaction} The signed transaction.
   *
   * @throws {Error} If the signer is not initialized or if the signer is not a Keypair.
   */
  private signWithKeypair(txn: VersionedTransaction) {
    if (!this.signer && !this.signTransaction) {
      throw new Error(
        'Cannot sign with Keypair. The signer is not initialized. You need to provide a SignerWalletAdapter, Keypair, or a signTransaction function.',
      );
    }

    if (this.signer && 'signTransaction' in this.signer) {
      throw new Error('This method is only for signing with a Keypair.');
    }

    const keypair = this.signer as Keypair;

    txn.sign([keypair]);

    return txn;
  }
}
