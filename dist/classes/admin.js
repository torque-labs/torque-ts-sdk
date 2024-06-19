import { TorqueRequestClient } from './request.js';
import { TORQUE_API_ROUTES } from '../constants/index.js';
import { ApiTxnTypes, } from '../types/index.js';
/**
 * The TorqueAdminClient class is used to manage admin actions in the Torque API.
 *
 * @example
 * const client = new TorqueAdminClient(TorqueAdminClientOptions);
 *
 * const result = await client.createCampaign(<campaignData>);
 * const result = await client.endCampaign(<campaignData>);
 */
export class TorqueAdminClient {
    client;
    userClient;
    static tokenList;
    /**
     * Create a new instance of the TorqueAdminClient class with the provided API key.
     *
     * @param {TorqueAdminClientOptions} options - The options for the TorqueAdminClient.
     */
    constructor(options) {
        const { signer, apiKey, userClient, apiUrl, appUrl, functionsUrl } = options;
        this.client = new TorqueRequestClient({ signer, apiKey, apiUrl, appUrl, functionsUrl });
        this.userClient = userClient;
    }
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
    async getCampaigns() {
        if (!this.client) {
            throw new Error('The client is not initialized.');
        }
        try {
            const params = new URLSearchParams();
            const result = await this.client.apiFetch(`${TORQUE_API_ROUTES.campaigns}?${params.toString()}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            return result;
        }
        catch (error) {
            console.error(error);
            throw new Error("There was an error getting user's eligible campaigns.");
        }
    }
    /**
     * Create a new campaign with the provided data.
     *
     * @param {CampaignCreateInput} data - The data for the campaign to create.
     *
     * @returns {Promise<WithSignature<T>>} A promise that resolves with the signature of the transaction.
     */
    async createCampaign(data) {
        if (!this.client) {
            throw new Error('The client is not initialized.');
        }
        try {
            const user = await this.userClient.getCurrentUser();
            const input = {
                txnType: ApiTxnTypes.CampaignCreate,
                data,
            };
            const signature = await this.client.transaction(input, user?.token);
            return signature;
        }
        catch (error) {
            console.error(error);
            throw new Error('There was an error creating the campaign.');
        }
    }
    /**
     * End a campaign using the provided campaign ID.
     *
     * @param {CampaignEndInput} data - The ID of the campaign to end.
     *
     * @returns {Promise<WithSignature<any>>} A promise that resolves to the signature of the transaction.
     *
     * @throws {Error} Throws an error if the client is not initialized or if there is an error ending the campaign.
     */
    async endCampaign(data) {
        if (!this.client) {
            throw new Error('The client is not initialized.');
        }
        try {
            const user = await this.userClient.getCurrentUser();
            const input = {
                txnType: ApiTxnTypes.CampaignEnd,
                data,
            };
            const signature = await this.client.transaction(input, user?.token);
            return signature;
        }
        catch (error) {
            console.error(error);
            throw new Error('There was an error ending the campaign.');
        }
    }
    /**
     * Get the leaderboard for a specific campaign.
     *
     * @param {string} campaignId - The ID of the campaign to get the leaderboard for.
     *
     * @returns {Promise<ApiCampaignLeaderboard>} A Promise that resolves to the leaderboard data for the campaign.
     *
     * @throws {Error} Throws an error if the client is not initialized or if there is an error getting the leaderboard.
     */
    async getLeaderboard(campaignId) {
        if (!this.client) {
            throw new Error('The client is not initialized.');
        }
        try {
            const params = new URLSearchParams({ campaignId });
            const result = await this.client.apiFetch(`${TORQUE_API_ROUTES.leaderboards}?${params.toString()}`, {
                method: 'GET',
            });
            return result;
        }
        catch (error) {
            console.error(error);
            throw new Error('There was an error getting the leaderboard.');
        }
    }
    /**
     * Get the raffle rewards for a specific campaign.
     *
     * @param {string} campaignId - The ID of the campaign to get the raffle rewards for.
     *
     * @throws {Error} Throws an error if the client is not initialized or if there is an error getting the raffle rewards.
     */
    async raffleRewards(campaignId) {
        if (!this.client) {
            throw new Error('The client is not initialized.');
        }
        try {
            const params = new URLSearchParams({ campaignId });
            const result = await this.client.apiFetch(`${TORQUE_API_ROUTES.raffle}?${params.toString()}`, {
                method: 'GET',
            });
            return result;
        }
        catch (error) {
            console.error(error);
            throw new Error('There was an error getting the raffle rewards.');
        }
    }
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
    async initPublisher() {
        if (!this.client) {
            throw new Error('The client is not initialized.');
        }
        try {
            const user = await this.userClient.getCurrentUser();
            const { signature } = await this.client.transaction({
                txnType: ApiTxnTypes.PublisherCreate,
                data: true,
            }, user?.token);
            await this.userClient.refreshUser();
            return signature;
        }
        catch (error) {
            console.error(error);
            throw new Error('There was an error creating the publisher.');
        }
    }
    /**
     * Process a publisher payout for the current user, if eligible.
     *
     * @returns {Promise<string>} A promise that resolves to the signature of the transaction.
     *
     * @throws {Error} Throws an error if there was an error paying out the publisher.
     */
    async payoutPublisher(data) {
        if (!this.client) {
            throw new Error('The client is not initialized.');
        }
        try {
            const user = await this.userClient.getCurrentUser();
            const { signature } = await this.client.transaction({
                txnType: ApiTxnTypes.PublisherPayout,
                data,
            }, user?.token);
            return signature;
        }
        catch (error) {
            console.error(error);
            throw new Error('There was an error paying out the publisher.');
        }
    }
    /**
     * ========================================================================
     * DATA
     * ========================================================================
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
    static async getSafeTokenList(filter, apiUrl) {
        if (this.tokenList) {
            return !filter
                ? this.tokenList
                : this.tokenList.filter((token) => token.name.toLowerCase().includes(filter));
        }
        try {
            const fetchUrl = `${apiUrl}${TORQUE_API_ROUTES.tokens}`;
            const response = await TorqueRequestClient.anyFetch(fetchUrl, {
                method: 'GET',
            });
            if (response.status !== 'SUCCESS') {
                throw new Error('There was an error fetching the safe token list.');
            }
            this.tokenList = response.data.tokens;
            return !filter
                ? this.tokenList
                : this.tokenList.filter((token) => token.name.toLowerCase().includes(filter));
        }
        catch (error) {
            console.error(error);
            throw new Error('There was an error fetching the safe token list.');
        }
    }
    /**
     * ========================================================================
     * AUDIENCES
     * ========================================================================
     */
    /**
     * Get a list of the user's saved audiences.
     *
     * @returns {Promise<ApiAudience[]>} A promise that resolves to an array of Audiences.
     *
     * @throws {Error} If the client is not initialized or there was an error getting the audiences.
     */
    async getAudiences() {
        const user = await this.userClient.getCurrentUser();
        if (!this.client || !user) {
            throw new Error('The client is not initialized.');
        }
        try {
            const response = await this.client.apiFetch(`${TORQUE_API_ROUTES.audienceBuilder}`, {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${user.token}`, // TODO: remove if tokens if not api key
                },
            });
            return response;
        }
        catch (error) {
            console.error(error);
            throw new Error('There was an error getting the audience.');
        }
    }
    /**
     * Save an audience to the user's account.
     *
     * @param {Audience} config - The configuration of the audience to save.
     * @param {string} title - The title of the audience.
     * @param {string} [description] - An optional description of the audience.
     *
     * @returns {Promise<{ audienceId: string }>} A promise that resolves to the id of the saved audience.
     *
     * @throws {Error} If the client is not initialized or there was an error saving the audience.
     */
    async saveAudience(config, title, description) {
        const user = await this.userClient.getCurrentUser();
        if (!this.client || !user) {
            throw new Error('The client is not initialized.');
        }
        try {
            const response = await this.client.apiFetch(TORQUE_API_ROUTES.audienceBuilder, {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
                body: JSON.stringify({
                    title,
                    description,
                    config,
                }),
            });
            return response;
        }
        catch (error) {
            console.error(error);
            throw new Error('There was an error saving the audience.');
        }
    }
    async updateAudience(id, config, title, description) {
        const user = await this.userClient.getCurrentUser();
        if (!this.client || !user) {
            throw new Error('The client is not initialized.');
        }
        try {
            const response = await this.client.apiFetch(TORQUE_API_ROUTES.audienceBuilder, {
                method: 'PATCH',
                body: JSON.stringify({
                    title,
                    description,
                    id,
                    config,
                }),
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            });
            return response;
        }
        catch (error) {
            console.error(error);
            throw new Error('There was an error updating the audience.');
        }
    }
    async deleteAudience(id) {
        const user = await this.userClient.getCurrentUser();
        if (!this.client || !user) {
            throw new Error('The client is not initialized.');
        }
        try {
            const response = await this.client.apiFetch(TORQUE_API_ROUTES.audienceBuilder, {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
                body: JSON.stringify({
                    id,
                }),
            });
            return response;
        }
        catch (error) {
            console.error(error);
            throw new Error('There was an error deleting the audience.');
        }
    }
}
//# sourceMappingURL=admin.js.map