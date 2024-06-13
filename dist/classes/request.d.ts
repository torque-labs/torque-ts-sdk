/// <reference types="node" resolution-mode="require"/>
import { Adapter } from '@solana/wallet-adapter-base';
import { Keypair } from '@solana/web3.js';
import { TxnInput, WithSignature } from '../types/index.js';
/**
 * Options for the TorqueRequestClient.
 */
export type TorqueRequestOptions = {
    signer: Adapter | Keypair;
    apiKey?: string;
    apiUrl?: string;
    appUrl?: string;
    functionsUrl?: string;
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
export declare class TorqueRequestClient {
    private apiKey;
    private apiAuthHeader;
    private signer;
    private apiUrl;
    private appUrl;
    private functionsUrl;
    /**
     * Create a new instance of the TorqueRequestClient class.
     *
     * @param {Adapter | Keypair} signer - The signer used to sign transactions.
     * @param {string} apiKey - The API key for the client.
     *
     * @throws {Error} Throws an error if a signer is not provided.
     */
    constructor(options: TorqueRequestOptions);
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
    anyFetch<T>(url: string, options?: RequestInit): Promise<T>;
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
    apiFetch<T>(url: string, options?: RequestInit, supressError?: boolean): Promise<T>;
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
    functionsFetch<T>(url: string, options?: RequestInit): Promise<T>;
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
    private buildTransaction;
    /**
     * Executes the serialized transaction using the API.
     *
     * @param {TxnExecute} txnExecuteInput - The input object of the transaction to execute.
     *
     * @returns {Promise<TxnExecuteResponse>} A promise that resolves with the signature of the transaction.
     *
     * @throws {Error} Throws an error if the API request is unsuccessful or if the transaction fails.
     */
    private executeTransaction;
    /**
     * Builds and executes the transaction using the Torque API.
     *
     * @template {object} T - The type of the response data.
     *
     * @param {TxnInput} txnInput - The input object of the transaction to process.
     *
     * @returns {Promise<WithSignature>} A promise that resolves with the signature of the transaction.
     */
    transaction<T>(txnInput: TxnInput, token?: string): Promise<WithSignature<T>>;
    /**
     * Signs a transaction with a Keypair.
     *
     * @param {VersionedTransaction} txn - The transaction to sign.
     *
     * @returns {VersionedTransaction} The signed transaction.
     *
     * @throws {Error} If the signer is not initialized or if the signer is not a Keypair.
     */
    private signWithKeypair;
}
//# sourceMappingURL=request.d.ts.map