import { Adapter } from '@solana/wallet-adapter-base';
import { Keypair } from '@solana/web3.js';
import { TorqueUserClient } from './user';
import { ApiCampaign, ApiCampaignLeaderboard, ApiRaffleRewards, CampaignCreateInput, CampaignEndInput, SafeToken } from '../types';
/**
 * Options for the TorqueAdminClient.
 */
export type TorqueAdminClientOptions = {
    signer: Adapter | Keypair;
    apiKey: string;
    userClient: TorqueUserClient;
};
/**
 * The TorqueAdminClient class is used to manage admin actions in the Torque API.
 *
 * @example
 * const client = new TorqueAdminClient(TorqueAdminClientOptions);
 *
 * const result = await client.createCampaign(<campaignData>);
 * const result = await client.endCampaign(<campaignData>);
 */
export declare class TorqueAdminClient {
    private client;
    private userClient;
    tokenList: SafeToken[] | undefined;
    /**
     * Create a new instance of the TorqueAdminClient class with the provided API key.
     *
     * @param {TorqueAdminClientOptions} options - The options for the TorqueAdminClient.
     */
    constructor(options: TorqueAdminClientOptions);
    /**
     * ========================================================================
     * CAMPAIGNS
     * ========================================================================
     */
    /**
     * Get a list of all currently active campaigns.
     *
     * @returns {Promise<ApiCampaign[]>} A promise that resolves to an array of ApiCampaign objects.
     *
     * @throws {Error} If the client is not initialized or there was an error getting the list of campaigns.
     */
    getCampaigns(): Promise<{
        campaigns: ApiCampaign[];
    }>;
    /**
     * Create a new campaign with the provided data.
     *
     * @param {CampaignCreateInput} data - The data for the campaign to create.
     *
     * @returns {Promise<string>} A promise that resolves to the signature of the transaction.
     */
    createCampaign(data: CampaignCreateInput): Promise<{
        signature: string;
    } & Omit<{
        serializedTx: string;
    }, "serializedTx">>;
    /**
     * End a campaign using the provided campaign ID.
     *
     * @param {CampaignEndInput} data - The ID of the campaign to end.
     *
     * @returns {Promise<string>} A promise that resolves to the signature of the transaction.
     *
     * @throws {Error} Throws an error if the client is not initialized or if there is an error ending the campaign.
     */
    endCampaign(data: CampaignEndInput): Promise<{
        signature: string;
    } & Omit<{
        serializedTx: string;
    }, "serializedTx">>;
    /**
     * Get the leaderboard for a specific campaign.
     *
     * @param {string} campaignId - The ID of the campaign to get the leaderboard for.
     *
     * @returns {Promise<ApiCampaignLeaderboard>} A Promise that resolves to the leaderboard data for the campaign.
     *
     * @throws {Error} Throws an error if the client is not initialized or if there is an error getting the leaderboard.
     */
    getLeaderboard(campaignId: string): Promise<ApiCampaignLeaderboard>;
    /**
     * Get the raffle rewards for a specific campaign.
     *
     * @param {string} campaignId - The ID of the campaign to get the raffle rewards for.
     *
     * @throws {Error} Throws an error if the client is not initialized or if there is an error getting the raffle rewards.
     */
    raffleRewards(campaignId: string): Promise<ApiRaffleRewards>;
    /**
     * ========================================================================
     * PUBLISHER
     * ========================================================================
     */
    /**
     * Initialize a publisher account for the current user.
     *
     * @return {Promise<string>} A promise that resolves to the signature of the transaction.
     *
     * @throws {Error} Throws an error if there was an error creating the publisher.
     */
    initPublisher(): Promise<string>;
    /**
     * Process a publisher payout for the current user, if eligible.
     *
     * @returns {Promise<string>} A promise that resolves to the signature of the transaction.
     *
     * @throws {Error} Throws an error if there was an error paying out the publisher.
     */
    payoutPublisher(data: {
        token: string;
        amount: number;
    }): Promise<string>;
    /**
     * DATA
     */
    /**
     * Retrieves the list of safe tokens from the Jupiter ag.
     *
     * @param {string} filter - An optional filter to filter the tokens by text.
     *
     * @return {Promise<SafeToken[]>} A promise that resolves to an array of SafeToken objects.
     *
     * @throws {Error} If the client is not initialized or there was an error fetching the safe token list.
     */
    getSafeTokenList(filter?: string): Promise<SafeToken[]>;
}
