import { Connection, VersionedTransaction, clusterApiUrl } from '@solana/web3.js';
import { TORQUE_API_ROUTES } from '../constants/index.js';
import { ApiTxnTypes, } from '../types/index.js';
import { base64ToUint8Array } from '../utils.js';
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
    apiKey;
    apiAuthHeader;
    signer;
    apiUrl;
    appUrl;
    functionsUrl;
    connection;
    /**
     * Create a new instance of the TorqueRequestClient class.
     *
     * @param {Adapter | Keypair} signer - The signer used to sign transactions.
     * @param {string} apiKey - The API key for the client.
     *
     * @throws {Error} Throws an error if a signer is not provided.
     */
    constructor(options) {
        const { signer, apiKey, apiUrl, appUrl, functionsUrl, connection } = options;
        if (!signer) {
            throw new Error('You need to provide a SignerWalletAdapter or Keypair in the signer parameter.');
        }
        this.signer = signer;
        this.apiKey = apiKey;
        this.apiUrl = apiUrl ?? 'https://api.torque.so';
        this.appUrl = appUrl ?? 'https://app.torque.so';
        this.functionsUrl = functionsUrl ?? 'https://functions.torque.so';
        this.apiAuthHeader = apiKey
            ? {
                'x-torque-api-key': `${this.apiKey}`,
            }
            : {};
        this.connection = connection ?? new Connection(clusterApiUrl('mainnet-beta'));
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
    static async anyFetch(url, options) {
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
    async apiFetch(url, options, supressError = false) {
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
            const fetchUrl = `${this.apiUrl}${url}`;
            // TODO: Setup request caching
            const response = await fetch(fetchUrl, reqOptions);
            const result = (await response.json());
            if (result.status === 'SUCCESS') {
                return result.data;
            }
            else {
                throw new Error(result.message);
            }
        }
        catch (error) {
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
    async functionsFetch(url, options) {
        const reqOptions = {
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
    async buildTransaction(txnInput, token) {
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
            console.log('-- txn: ', txn);
            return txn;
        }
        catch (error) {
            console.error(error);
            throw new Error('Unable to prepare the transaction.');
        }
    }
    /**
     * Syncs the db with transaction execyted using the API.
     *
     * @param {TxnSync} TxnSyncInput - The input object of the transaction to sync with the db.
     *
     * @returns {Promise<TxnSyncResponse>} A promise that resolves with the signature of the transaction.
     *
     * @throws {Error} Throws an error if the API request is unsuccessful or if the transaction fails.
     */
    async syncTransaction(txnSyncInput, token) {
        const data = {
            ...(txnSyncInput.txnType === ApiTxnTypes.CampaignCreate
                ? { createCampaign: txnSyncInput.data }
                : {}),
            ...(txnSyncInput.txnType === ApiTxnTypes.CampaignEnd
                ? { endCampaign: txnSyncInput.data }
                : {}),
            ...(txnSyncInput.txnType === ApiTxnTypes.PublisherCreate
                ? { createPublisher: txnSyncInput.data }
                : {}),
            ...(txnSyncInput.txnType === ApiTxnTypes.PublisherPayout
                ? { payoutPublisher: txnSyncInput.data }
                : {}),
        };
        try {
            const { status } = await this.apiFetch(TORQUE_API_ROUTES.transactions.sync, {
                method: 'POST',
                body: JSON.stringify({ ...data }),
                headers: {
                    // todo: remove if token is undefined
                    Authorization: `Bearer ${token}`,
                },
            });
            return status;
        }
        catch (error) {
            console.error(error);
            throw new Error('Unable to sync the transaction.');
        }
    }
    /**
     * Builds and syncs the transaction using the Torque API.
     *
     * @template {object} T - The type of the response data.
     *
     * @param {TxnInput} txnInput - The input object of the transaction to process.
     *
     * @returns {Promise<WithSignature>} A promise that resolves with the signature of the transaction.
     */
    async transaction(txnInput, token) {
        console.log('-- ATTEMPTING TO SEND TRANSACTION');
        if (!this.signer) {
            throw new Error('The signer is not initialized. You need to provide a SignerWalletAdapter or Keypair.');
        }
        try {
            console.log('-- building tx.... ');
            const { serializedTx, ...rest } = await this.buildTransaction(txnInput, token);
            const txn = VersionedTransaction.deserialize(base64ToUint8Array(serializedTx));
            const signedTx = 'signTransaction' in this.signer
                ? await this.signer.signTransaction(txn)
                : this.signWithKeypair(txn);
            console.log('-- sending tx.... ');
            const signature = await this.connection.sendTransaction(signedTx, { skipPreflight: true });
            console.log('-- confirming: ', signature);
            const { blockhash, lastValidBlockHeight } = await this.connection.getLatestBlockhash();
            await this.connection.confirmTransaction({
                blockhash,
                lastValidBlockHeight,
                signature,
            }, "confirmed");
            let syncData;
            switch (txnInput.txnType) {
                case ApiTxnTypes.CampaignCreate:
                case ApiTxnTypes.CampaignEnd:
                    if ('campaignId' in rest) {
                        syncData = { txnType: txnInput.txnType, data: { campaignId: rest.campaignId } };
                    }
                    else {
                        throw new Error('campaignId is missing from the transaction data');
                    }
                    break;
                case ApiTxnTypes.PublisherPayout:
                    syncData = { txnType: txnInput.txnType, data: { signature } };
                    break;
                case ApiTxnTypes.PublisherCreate:
                    syncData = { txnType: txnInput.txnType, data: true };
                    break;
                default:
                    throw new Error('Unsupported transaction type');
            }
            const syncResult = await this.syncTransaction(syncData, token);
            return { signature, ...rest, syncResult };
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