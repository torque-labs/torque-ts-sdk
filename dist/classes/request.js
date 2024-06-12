import { VersionedTransaction } from '@solana/web3.js';
import { TORQUE_API_ROUTES } from '../constants/index.js';
import { ApiTxnTypes, } from '../types/index.js';
import { base64ToUint8Array, uint8ArrayToBase64 } from '../utils.js';
/**
 * The TorqueRequestClient class is used to make requests to the Torque API.
 * It provides methods for performing API requests and handling responses.
 *
 * @example
 * const client = new TorqueRequestClient(signer, apiKey);
 *
 * const response = await client.apiFetch<T>("https://api.torque.so/v1/users");
 */
export class TorqueRequestClient {
    apiKey;
    apiAuthHeader;
    signer;
    /**
     * Create a new instance of the TorqueRequestClient class.
     *
     * @param {Adapter | Keypair} signer - The signer used to sign transactions.
     * @param {string} apiKey - The API key for the client.
     *
     * @throws {Error} Throws an error if a signer is not provided.
     */
    constructor(signer, apiKey) {
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
    async anyFetch(url, options) {
        const reqOptions = {
            ...options,
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
                ...options?.headers,
            },
        };
        try {
            const response = await fetch(url, reqOptions);
            const result = (await response.json());
            return result;
        }
        catch (error) {
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
    async apiFetch(url, options) {
        const reqOptions = {
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
            const result = (await response.json());
            if (result.status === 'SUCCESS') {
                return result.data;
            }
            else {
                throw new Error(result.message);
            }
        }
        catch (error) {
            console.error(error);
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
    async functionsFetch(url, options) {
        const reqOptions = {
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
            const result = (await response.json());
            return result;
        }
        catch (error) {
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
    async buildTransaction(txnInput) {
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
            });
            return txn;
        }
        catch (error) {
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
    async executeTransaction(txnExecuteInput) {
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
            const txn = await this.apiFetch(TORQUE_API_ROUTES.transactions.execute, {
                method: 'POST',
                body: JSON.stringify({ ...data }),
            });
            return txn;
        }
        catch (error) {
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
     *
     * @returns {Promise<T & { signature: string }>} A promise that resolves with the signature of the transaction.
     */
    async transaction(txnInput) {
        if (!this.signer) {
            throw new Error('The signer is not initialized. You need to provide a SignerWalletAdapter or Keypair.');
        }
        try {
            const { serializedTx, ...rest } = await this.buildTransaction(txnInput);
            const txn = VersionedTransaction.deserialize(base64ToUint8Array(serializedTx));
            const signedTx = 'signTransaction' in this.signer
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
            const { signature } = await this.executeTransaction(executeInput);
            return { signature, ...rest };
        }
        catch (error) {
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
    signWithKeypair(txn) {
        if (!this.signer) {
            throw new Error('The signer is not initialized. You need to provide a SignerWalletAdapter or Keypair.');
        }
        if ('signTransaction' in this.signer) {
            throw new Error('This method is only for signing with a Keypair.');
        }
        const keypair = this.signer;
        txn.sign([keypair]);
        return txn;
    }
}
//# sourceMappingURL=request.js.map