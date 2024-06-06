import { SignerWalletAdapter } from '@solana/wallet-adapter-base';
import { Keypair, VersionedTransaction } from '@solana/web3.js';

import { TORQUE_API_ROUTES } from '../constants.js';
import { TxnInput, ApiTxnTypes, ApiResponse, TxnExecute, TxnExecuteResponse } from '../types/index.js';
import { base64ToUint8Array, uint8ArrayToBase64 } from '../utils.js';

/**
 * The TorqueRequestClient class is used to make requests to the Torque API.
 * It provides methods for performing API requests and handling responses.
 *
 * @example
 * const client = new TorqueRequestClient({ clientType: "admin", apiKey: "your-api-key" });
 * const response = await client.apiFetch<T>("https://api.torque.so/v1/users");
 * console.log(response);
 */
export class TorqueRequestClient {
  private apiKey: string | undefined;
  private apiAuthHeader: Record<string, string>;
  private signer: SignerWalletAdapter | Keypair;

  /**
   * Create a new instance of the TorqueRequestClient class.
   *
   * @param {SignerWalletAdapter | Keypair} signer - The signer used to sign transactions.
   * @param {string} apiKey - The API key for the client.
   *
   * @throws {Error} Throws an error if a signer is not provided.
   */
  constructor(signer: SignerWalletAdapter | Keypair, apiKey?: string) {
    if (!signer) {
      throw new Error('You need to provide a SignerWalletAdapter or Keypair in the signer parameter.');
    }

    this.signer = signer;
    this.apiKey = apiKey;
    this.apiAuthHeader = apiKey
      ? {
          'x-torque-api-key': `${this.apiKey}`,
        }
      : {};
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
  public async apiFetch<T>(url: string, options?: RequestInit) {
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
      // TODO: Setup request caching
      const response = await fetch(url, reqOptions);
      const result = (await response.json()) as unknown as ApiResponse<T>;

      if (result.status === 'SUCCESS') {
        return result.data;
      } else {
        throw new Error(result.message);
      }
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
   *
   * @returns {Promise<T>} A promise that resolves with the serialized transaction.
   *
   * @throws {Error} Throws an error if the API is not able to build the transaction.
   */
  private async buildTransaction<T>(txnInput: TxnInput) {
    const data = {
      ...(txnInput.txnType === ApiTxnTypes.CampaignCreate ? { createCampaign: txnInput.data } : {}),

      ...(txnInput.txnType === ApiTxnTypes.CampaignEnd ? { endCampaign: txnInput.data } : {}),

      ...(txnInput.txnType === ApiTxnTypes.PublisherCreate ? { createPublisher: txnInput.data } : {}),

      ...(txnInput.txnType === ApiTxnTypes.PublisherPayout ? { payoutPublisher: txnInput.data } : {}),
    };

    try {
      const txn = await this.apiFetch(TORQUE_API_ROUTES.transactions.build, {
        method: 'POST',
        body: JSON.stringify({ ...data }),
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
   *
   * @returns {Promise<TxnExecuteResponse>} A promise that resolves with the signature of the transaction.
   *
   * @throws {Error} Throws an error if the API request is unsuccessful or if the transaction fails.
   */
  private async executeTransaction(txnExecuteInput: TxnExecute) {
    const data = {
      ...(txnExecuteInput.txnType === ApiTxnTypes.CampaignCreate ? { createCampaign: txnExecuteInput.data } : {}),

      ...(txnExecuteInput.txnType === ApiTxnTypes.CampaignEnd ? { endCampaign: txnExecuteInput.data } : {}),

      ...(txnExecuteInput.txnType === ApiTxnTypes.PublisherCreate ? { createPublisher: txnExecuteInput.data } : {}),

      ...(txnExecuteInput.txnType === ApiTxnTypes.PublisherPayout ? { payoutPublisher: txnExecuteInput.data } : {}),
    };

    try {
      const txn = await this.apiFetch<TxnExecuteResponse>(TORQUE_API_ROUTES.transactions.execute, {
        method: 'POST',
        body: JSON.stringify({ ...data }),
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
   * @param {SignerWalletAdapter} wallet - A `SignerWalletAdapter` instance representing the wallet that will be used to sign the transaction.
   * @param {TxnInput} txnInput - The input object of the transaction to process.
   *
   * @returns {Promise<T & { signature: string }>} A promise that resolves with the signature of the transaction.
   */
  public async transaction<T>(txnInput: TxnInput) {
    if (!this.signer) {
      throw new Error('The signer is not initialized. You need to provide a SignerWalletAdapter or Keypair.');
    }

    try {
      const { serializedTx, ...rest } = await this.buildTransaction<T>(txnInput);

      const txn = VersionedTransaction.deserialize(base64ToUint8Array(serializedTx));

      const signedTx =
        'signTransaction' in this.signer
          ? await (this.signer as SignerWalletAdapter).signTransaction(txn)
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

      const { signature } = await this.executeTransaction(executeInput);

      return { signature, ...rest };
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
    if (!this.signer) {
      throw new Error('The signer is not initialized. You need to provide a SignerWalletAdapter or Keypair.');
    }

    if ('signTransaction' in this.signer) {
      throw new Error('This method is only for signing with a Keypair.');
    }

    const keypair = this.signer as Keypair;

    txn.sign([keypair]);

    return txn;
  }
}
