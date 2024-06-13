import { TorqueAdminClient } from './admin.js';
import { TorqueAudienceClient } from './audience.js';
import { TorqueUserClient } from './user.js';
import { TORQUE_API_ROUTES } from '../constants/index.js';
/**
 * The official Torque Typescript SDK.
 *
 * The TorqueSDK class is used to manage the user and api clients for the Torque API.
 *
 * @example
 * const sdk = new TorqueSDK({
 *   signer: <wallet adapter or keypair>,
 *   apiKey: "<your-api-key>",
 *   publisherHandle: "<your-publisher-handle>",
 * });
 *
 * // See if user is already logged in
 * const currentUser = await sdk.user.getCurrentUser();
 *
 * // Authenticate the user if not logged in
 * const user = currentUser
 *   ? currentUser
 *   : await sdk.user.initializeUser(ApiInputLogin);
 */
export class TorqueSDK {
    user;
    api;
    audience;
    apiKey;
    publisherHandle;
    rpc;
    apiUrl;
    appUrl;
    functionsUrl;
    /**
     * Initializes the TorqueSDK with the provided options.
     *
     * @param {TorqueSDKOptions} options - The options for the TorqueSDK.
     *
     * @throws {Error} Throws an error if the there is no api key or publisher handle provided.
     */
    constructor(options) {
        if (!options.apiKey && !options.publisherHandle) {
            throw new Error('You must provide an API key or a publisher handle.');
        }
        this.apiKey = options.apiKey;
        this.publisherHandle = options.publisherHandle;
        this.rpc = options.rpc;
        this.apiUrl = options.apiUrl;
        this.appUrl = options.appUrl;
        this.functionsUrl = options.functionsUrl;
    }
    async initialize(signer, ApiInputLogin) {
        const userClient = new TorqueUserClient({
            signer: signer,
            publisherHandle: this.publisherHandle,
            rpc: this.rpc,
            apiUrl: this.apiUrl,
            appUrl: this.appUrl,
            functionsUrl: this.functionsUrl,
        });
        this.user = userClient;
        try {
            await this.user.initializeUser(ApiInputLogin);
        }
        catch (error) {
            // console.error(error);
            throw new Error('There was an error initializing the Torque SDK.');
        }
        if (this.apiKey) {
            this.api = new TorqueAdminClient({
                signer: signer,
                apiKey: this.apiKey,
                userClient: userClient,
                apiUrl: this.apiUrl,
                appUrl: this.appUrl,
                functionsUrl: this.functionsUrl,
            });
            this.audience = new TorqueAudienceClient({
                signer: signer,
                apiKey: this.apiKey,
                userClient: userClient,
                apiUrl: this.apiUrl,
                appUrl: this.appUrl,
                functionsUrl: this.functionsUrl,
            });
        }
    }
    /**
     * Static method to verify the login options with the Torque API.
     *
     * @param {ApiInputLogin} loginOptions - The verification object that is required to authenticate a user with Torque.
     * @param {string} apiUrl - The API URL to use for the verification. Defaults to the Torque API URL.
     *
     * @returns {Promise<ApiVerifiedUser>} A Promise that resolves to an object containing the user information.
     *
     * @throws {Error} Throws an error if there is an error authenticating the user.
     */
    static async verifyLogin(loginOptions, apiUrl = 'https://api.torque.so') {
        try {
            const url = `${apiUrl}${TORQUE_API_ROUTES.login}`;
            // TODO: Setup request caching
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(loginOptions),
            });
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
            throw new Error('There was an error verifying the login options.');
        }
    }
    /**
     * AUTHENTICATION HELPER METHODS
     */
    /**
     * Retrieves a sample SIWS payload for l ogging into the Torque API.
     *
     * @param {string} apiUrl - The API URL to use for the payload. Defaults to the Torque API URL.
     *
     * @returns {Promise<ApiIdentifyPayload>} A Promise that resolves to the payload containing the identification statement, issued at time, and expiration time.
     *
     * @throws {Error} Throws an error if the API request is unsuccessful.
     */
    static async getLoginPayload(apiUrl = 'https://api.torque.so') {
        try {
            const url = `${apiUrl}${TORQUE_API_ROUTES.identify}`;
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
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
            throw new Error('There was an error getting the login payload.');
        }
    }
    /**
     * Constructs the body for the login API request based on the authentication type.
     *
     * @param {ApiInputLogin} params - The parameters for constructing the login body.
     *
     * @returns The constructed body for the verify API request, formatted based on the authentication type.
     */
    static constructLoginBody(params) {
        const { payload, authType, pubKey } = params;
        const body = authType === 'siws'
            ? {
                authType,
                pubKey,
                payload: {
                    input: payload.input,
                    output: {
                        account: {
                            ...payload.output.account,
                            publicKey: Array.from(new Uint8Array(payload.output.account.publicKey)),
                        },
                        signature: new Uint8Array(payload.output.signature),
                        signedMessage: new Uint8Array(payload.output.signedMessage),
                    },
                },
            }
            : {
                authType,
                pubKey,
                payload: {
                    input: payload.input,
                    output: payload.output,
                },
            };
        return body;
    }
}
//# sourceMappingURL=sdk.js.map