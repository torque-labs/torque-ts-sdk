import { Adapter } from '@solana/wallet-adapter-base';
import { SolanaSignInOutput } from '@solana/wallet-standard-features';
import { Keypair } from '@solana/web3.js';
import { TorqueAdminClient } from './admin.js';
import { TorqueAudienceClient } from './audience.js';
import { TorqueUserClient } from './user.js';
import { ApiIdentifyPayload, ApiInputLogin, ApiVerifiedUser } from '../types/index.js';
/**
 * Options for the TorqueSDK.
 */
export type TorqueSDKOptions = {
    signer?: Adapter | Keypair;
    apiKey?: string;
    publisherHandle?: string;
    rpc?: string;
};
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
export declare class TorqueSDK {
    user: TorqueUserClient | undefined;
    api: TorqueAdminClient | undefined;
    audience: TorqueAudienceClient | undefined;
    private apiKey;
    private publisherHandle;
    private rpc;
    /**
     * Initializes the TorqueSDK with the provided options.
     *
     * @param {TorqueSDKOptions} options - The options for the TorqueSDK.
     *
     * @throws {Error} Throws an error if the there is no api key or publisher handle provided.
     */
    constructor(options: TorqueSDKOptions);
    initialize(signer: Adapter | Keypair, ApiInputLogin?: ApiInputLogin): Promise<void>;
    /**
     * Static method to verify the login options with the Torque API.
     *
     * @param {ApiInputLogin} loginOptions - The verification object that is required to authenticate a user with Torque.
     *
     * @returns {Promise<ApiVerifiedUser>} A Promise that resolves to an object containing the user information.
     *
     * @throws {Error} Throws an error if there is an error authenticating the user.
     */
    static verifyLogin(loginOptions: ApiInputLogin): Promise<ApiVerifiedUser>;
    /**
     * AUTHENTICATION HELPER METHODS
     */
    /**
     * Retrieves a sample SIWS payload for l ogging into the Torque API.
     *
     * @returns {Promise<ApiIdentifyPayload>} A Promise that resolves to the payload containing the identification statement, issued at time, and expiration time.
     *
     * @throws {Error} Throws an error if the API request is unsuccessful.
     */
    static getLoginPayload(): Promise<ApiIdentifyPayload>;
    /**
     * Constructs the body for the login API request based on the authentication type.
     *
     * @param {ApiInputLogin} params - The parameters for constructing the login body.
     *
     * @returns The constructed body for the verify API request, formatted based on the authentication type.
     */
    static constructLoginBody(params: ApiInputLogin): {
        authType: "siws";
        pubKey: string;
        payload: {
            input: import("@solana/wallet-standard-features").SolanaSignInInput;
            output: SolanaSignInOutput;
        };
    } | {
        authType: "basic";
        pubKey: string;
        payload: {
            input: string;
            output: string;
        };
    };
}
//# sourceMappingURL=sdk.d.ts.map