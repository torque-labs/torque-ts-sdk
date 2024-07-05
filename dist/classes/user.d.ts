import { Adapter } from '@solana/wallet-adapter-base';
import { Cluster, Keypair, PublicKey } from '@solana/web3.js';
import { ApiCampaign, ApiInputLogin, ApiShare, ApiUserJourney, ApiUserPayout, ApiVerifiedUser } from '../types/index.js';
/**
 * Options for the TorqueUserClient.
 */
export type TorqueUserClientOptions = {
    signer: Adapter | Keypair;
    publisherHandle?: string;
    rpc?: string;
    apiUrl?: string;
    appUrl?: string;
    functionsUrl?: string;
    network?: Cluster;
};
/**
 * The TorqueUserClient class is used to authenticate a user with the Torque API.
 * The user client allows publishers to fetch campaigns and offers that are savailable for the current user.
 *
 * @example
 * const client = new TorqueUserClient(TorqueUserClientOptions);
 *
 * // Check if the user is already logged in with API
 * const currentUser = await client.getCurrentUser();
 *
 * const user = currentUser
 *   ? currentUser
 *   : await this.initializeUser(ApiInputLogin);
 */
export declare class TorqueUserClient {
    publisherHandle: string;
    initialized: boolean;
    publicKey: string;
    user: ApiVerifiedUser | undefined;
    private client;
    private signer;
    private connection;
    private appUrl;
    private apiUrl;
    /**
     * Create a new instance of the TorqueUserClient class with the publisher's handle, if provided.
     *
     * @param {TorqueUserClientOptions} options - The options for the TorqueUserClient.
     *
     * @throws {Error} Throws an error if the user's wallet is not provided.
     */
    constructor(options: TorqueUserClientOptions);
    /**
     * ========================================================================
     * AUTHENTICATION
     * ========================================================================
     */
    /**
     * Initializes the TorqueUserClient with the provided options.
     *
     * @param {ApiInputLogin} userAuth - User signature object that is required to authenticate a user with Torque.
     *
     * @returns {Promise<ApiVerifiedUser>} A Promise that resolves when the initialization is complete.
     *
     * @throws {Error} If user was not verified.
     */
    initializeUser(userAuth?: ApiInputLogin): Promise<ApiVerifiedUser>;
    /**
     * Authenticate the user with the torque API with the provided user signature object.
     *
     * @param {ApiInputLogin} loginOptions - The verification object that is required to authenticate a user with Torque.
     *
     * @returns {Promise<ApiVerifiedUser>} A Promise that resolves to an object containing the user information.
     *
     * @throws {Error} Throws an error if there is an error authenticating the user.
     */
    private login;
    /**
     * Logout the user from the Torque API.
     *
     * @throws {Error} Throws an error if the client is not initialized or if there is an error logging out the user.
     */
    logout(): Promise<{
        cleared: boolean;
    }>;
    /**
     * ========================================================================
     * USER
     * ========================================================================
     */
    /**
     * Rereshes the user's information from the Torque API.
     *
     * @returns {Promise<ApiVerifiedUser | undefined>} A promise that resolves to the user if they are signed in, otherwise undefined.
     */
    refreshUser(): Promise<ApiVerifiedUser | undefined>;
    /**
     * Checks to see if the user is already logged into the Torque API.
     *
     * @returns {Promise<ApiVerifiedUser | undefined>} A promise that resolves to the user if they are signed in, otherwise undefined.
     *
     * @throws {Error} Throws an error if checking the user's login status fails.
     */
    getCurrentUser(): Promise<ApiVerifiedUser | undefined>;
    /**
     * Retrieves the user's handle.
     *
     * @returns The user's handle or `undefined` if no handle is available.
     */
    getUserHandle(): string | undefined;
    /**
     * ========================================================================
     * CAMPAIGNS
     * ========================================================================
     */
    /**
     * Retrieves a list of active campaigns from the Torque API that the user is eligible to participate in.
     *
     * @returns {Promise<ApiCampaign[]>} A Promise resolving to an array of `ApiCampaign` objects representing the active campaigns.
     *
     * @throws {Error} An error if the fetch operation fails, or if the API returns a status other than "SUCCESS".
     */
    getCampaigns(): Promise<{
        campaigns: ApiCampaign[];
    }>;
    /**
     * Accepts a campaign for the current user.
     *
     * @param {string} campaignId - The ID of the campaign to accept.
     * @param {string} publisherHandle - The handle of the publisher to accept the campaign for.
     *
     * @returns {Promise<ApiUserJourney>} A Promise that resolves to the journey data for the campaign.
     *
     * @throws {Error} Throws an error if the client is not initialized or if there is an error accepting the campaign.
     */
    acceptCampaign(campaignId: string, publisherHandle?: string): Promise<ApiUserJourney>;
    /**
     * ========================================================================
     * PUBLISHER
     * ========================================================================
     */
    /**
     * Checks to see if the user is a publisher.
     *
     * @returns {boolean} True if the user is a publisher, false otherwise.
     *
     * @throws {Error} Throws an error if the user is not signed in.
     */
    isPublisher(): boolean;
    /**
     * Generates a URL for a user's shared link for a specific campaign.
     *
     * @param {string} campaignId - The unique identifier for the campaign.
     *
     * @returns {string} A promise that resolves to the URL string of the user's shared link for the campaign.
     *
     * @throws {Error} Throws an error if the user is not a publisher or does not have a handle.
     */
    getUserShareLink(campaignId: string): string;
    /**
     * Get the publisher PDA for the current user.
     *
     * @returns {PublicKey} The publisher PDA for the current user.
     */
    getPublisherPda(): PublicKey | undefined;
    static PUBLISHER_ACCOUNT_SIZE: number;
    getMaxTransferableSpl(token: PublicKey): Promise<number>;
    /**
     * Get the balance of the publisher PDA for the current user.
     *
     * @returns {Promise<number>} The balance of the publisher PDA for the current user in lamports.
     */
    getPublisherBalance(): Promise<number>;
    /**
     * Fetches all of the user's share links that they have previously created.
     *
     * @returns {Promise<ApiLinks>} A Promise resolving to the URLs of the user's share links.
     *
     * @throws {Error} An error if the link fetch fails.
     */
    getAllUserShareLinks(): Promise<{
        links: {
            campaignId: string;
            url: string;
        }[];
    }>;
    setUserPublisher(): void;
    /**
     * ========================================================================
     * SHARED LINK
     * ========================================================================
     */
    /**
     * Retrieves the data for an offer link for a specific campaign and handle.
     *
     * @param {string} campaignId - The unique identifier for the campaign.
     * @param {string} handle - The specific handle associated with the shared link.
     *
     * @returns {Promise<ApiShare>} The data associated with the shared link if the request is successful.
     *
     * @throws {Error} Throws an error there was an error getting the shared link data.
     */
    getSharedLinkData(campaignId: string, handle: string): Promise<ApiShare>;
    /**
     * ========================================================================
     * USER PAYOUTS
     * ========================================================================
     */
    /**
     * Retrieves user's payout history from conversions.
     *
     * @returns {Promise<ApiShare>} The data associated with the shared link if the request is successful.
     *
     * @throws {Error} Throws an error there was an error getting the shared link data.
     */
    getUserPayout(): Promise<ApiUserPayout>;
}
//# sourceMappingURL=user.d.ts.map