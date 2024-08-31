import { Adapter } from '@solana/wallet-adapter-base';
import { Cluster, clusterApiUrl, Connection, Keypair } from '@solana/web3.js';
import { CampaignRequestParams, CreateCampaignInput } from '@torque-labs/torque-utils';

import { TorqueRequestClient } from './request.js';
import { TorqueUserClient } from './user.js';
import { TORQUE_API_ROUTES } from '../constants/index.js';
import {
  ApiAudience,
  ApiAudienceMetadata,
  ApiCampaign,
  ApiCampaignLeaderboard,
  ApiRaffleRewards,
  ApiResponse,
  ApiTxnTypes,
  Audience,
  CampaignAnalytics,
  CampaignEndInput,
  SafeToken,
  SignTransaction,
  WithSignature,
} from '../types/index.js';

/**
 * Options for the TorqueAdminClient.
 */
export type TorqueAdminClientOptions = {
  /**
   * The signer used to sign transactions.
   */
  signer?: Adapter | Keypair;
  /**
   * The API key for the client.
   */
  apiKey: string;
  /**
   * The user client for the user based API requests.
   */
  userClient?: TorqueUserClient;
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
   * RPC URL for the client.
   */
  rpc?: string;
  /**
   * The network for the client. Defaults to 'mainnet-beta'.
   */
  network: Cluster;
  /**
   * The function used to sign transactions. If provided, it will override the default signing method.
   */
  signTransaction?: SignTransaction;
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
export class TorqueAdminClient {
  private client: TorqueRequestClient;
  private userClient: TorqueUserClient | undefined;
  public static tokenList: SafeToken[] | undefined;
  private connection: Connection;

  /**
   * Create a new instance of the TorqueAdminClient class with the provided API key.
   *
   * @param {TorqueAdminClientOptions} options - The options for the TorqueAdminClient.
   */
  constructor(options: TorqueAdminClientOptions) {
    const {
      signer,
      apiKey,
      userClient,
      apiUrl,
      appUrl,
      functionsUrl,
      network,
      rpc,
      signTransaction,
    } = options;

    this.connection = new Connection(rpc ?? clusterApiUrl(network), 'confirmed');

    this.client = new TorqueRequestClient({
      signer,
      apiKey,
      apiUrl,
      appUrl,
      functionsUrl,
      connection: this.connection,
      signTransaction,
    });

    this.userClient = userClient;
  }

  public async logout() {
    this.userClient = undefined;
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
  public async getActiveCampaigns(params?: CampaignRequestParams) {
    return this.getCampaigns(params, false);
  }

  /**
   * Get a list of all historic campaigns.
   *
   * @returns {Promise<ApiCampaign[]>} A promise that resolves to an array of ApiCampaign objects.
   *
   * @throws {Error} If the client is not initialized or there was an error getting the list of campaigns.
   */
  public async getHistoricCampaigns(params?: CampaignRequestParams) {
    const historicParams: CampaignRequestParams = {
      ...params,
      status: 'ENDED',
    };
    return this.getCampaigns(historicParams, true);
  }

  private async getCampaigns(params?: CampaignRequestParams, includeHistoric: boolean = false) {
    if (!this.client) {
      throw new Error('The client is not initialized.');
    }

    try {
      const filters: Record<string, string> = {
        ...Object.entries(params || {}).reduce(
          (acc, [key, value]) => {
            if (value !== undefined) {
              acc[key] = value.toString();
            }
            return acc;
          },
          {} as Record<string, string>,
        ),
        includeHistoric: includeHistoric.toString(),
      };

      const querystring = new URLSearchParams(filters).toString();

      const result = await this.client.apiFetch<{
        campaigns: ApiCampaign[];
      }>(`${TORQUE_API_ROUTES.campaigns}${querystring ? `?${querystring}` : ''}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      return result;
    } catch (error) {
      console.error(error);
      throw new Error(
        `There was an error getting ${includeHistoric ? 'historic' : 'active'} campaigns.`,
      );
    }
  }

  /**
   * Get the details of a specific campaign.
   *
   * @param {string} campaignId - The ID of the campaign to retrieve.
   *
   * @returns {Promise<ApiCampaign>} A Promise that resolves to the campaign data.
   *
   * @throws {Error} Throws an error if a fetching a campaign failed.
   */
  public async getCampaign(campaignId: string) {
    if (!this.client) {
      throw new Error('The client is not initialized.');
    }

    try {
      const result = await this.client.apiFetch<ApiCampaign>(
        `${TORQUE_API_ROUTES.campaigns}/${campaignId}`,
        {
          method: 'GET',
        },
      );

      return result;
    } catch (error) {
      console.error(error);

      throw new Error('There was an error getting the campaign.');
    }
  }

  /**
   * Create a new campaign with the provided data.
   *
   * @param {CreateCampaignInput} data - The data for the campaign to create.
   *
   * @returns {Promise<WithSignature<T>>} A promise that resolves with the signature of the transaction.
   */
  public async createCampaign(data: CreateCampaignInput): Promise<WithSignature<unknown>> {
    if (!this.client) {
      throw new Error('The client is not initialized.');
    }

    if (!this.userClient) {
      throw new Error('The user client is not initialized.');
    }

    try {
      const user = await this.userClient.getCurrentUser();
      const input = {
        txnType: ApiTxnTypes.CampaignCreate,
        data,
      } as const;

      const signature = await this.client.transaction(input, user?.token);

      return signature;
    } catch (error) {
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
  public async endCampaign(data: CampaignEndInput): Promise<WithSignature<unknown>> {
    if (!this.client) {
      throw new Error('The client is not initialized.');
    }

    if (!this.userClient) {
      throw new Error('The user client is not initialized.');
    }

    try {
      const user = await this.userClient.getCurrentUser();
      const input = {
        txnType: ApiTxnTypes.CampaignEnd,
        data,
      } as const;

      const signature = await this.client.transaction(input, user?.token);

      return signature;
    } catch (error) {
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
  public async getLeaderboard(campaignId: string) {
    if (!this.client) {
      throw new Error('The client is not initialized.');
    }

    try {
      const params = new URLSearchParams({ campaignId });

      const result = await this.client.apiFetch<ApiCampaignLeaderboard>(
        `${TORQUE_API_ROUTES.leaderboards}?${params.toString()}`,
        {
          method: 'GET',
        },
      );

      return result;
    } catch (error) {
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
  public async raffleRewards(campaignId: string) {
    if (!this.client) {
      throw new Error('The client is not initialized.');
    }

    try {
      const params = new URLSearchParams({ campaignId });

      const result = await this.client.apiFetch<ApiRaffleRewards>(
        `${TORQUE_API_ROUTES.raffle}?${params.toString()}`,
        {
          method: 'GET',
        },
      );

      return result;
    } catch (error) {
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
  public async initPublisher() {
    if (!this.client) {
      throw new Error('The client is not initialized.');
    }

    if (!this.userClient) {
      throw new Error('The user client is not initialized.');
    }

    try {
      const user = await this.userClient.getCurrentUser();
      const { signature } = await this.client.transaction(
        {
          txnType: ApiTxnTypes.PublisherCreate,
          data: true,
        },
        user?.token,
      );

      await this.userClient.refreshUser();

      return signature;
    } catch (error) {
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
  public async payoutPublisher(data: { token: string; amount: number }) {
    if (!this.client) {
      throw new Error('The client is not initialized.');
    }

    if (!this.userClient) {
      throw new Error('The user client is not initialized.');
    }

    try {
      const user = await this.userClient.getCurrentUser();
      const { signature } = await this.client.transaction(
        {
          txnType: ApiTxnTypes.PublisherPayout,
          data,
        },
        user?.token,
      );

      return signature;
    } catch (error) {
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
  public static async getSafeTokenList(filter?: string, apiUrl?: string) {
    if (this.tokenList) {
      return !filter
        ? this.tokenList
        : this.tokenList.filter((token) => token.name.toLowerCase().includes(filter));
    }

    try {
      const fetchUrl = `${apiUrl ?? 'https://api.torque.so'}${TORQUE_API_ROUTES.tokens}`;

      const response = await TorqueRequestClient.anyFetch<ApiResponse<{ tokens: SafeToken[] }>>(
        fetchUrl,
        {
          method: 'GET',
        },
      );

      if (response.status !== 'SUCCESS') {
        throw new Error('There was an error fetching the safe token list.');
      }

      this.tokenList = response.data.tokens;

      return !filter
        ? this.tokenList
        : this.tokenList.filter((token) => token.name.toLowerCase().includes(filter));
    } catch (error) {
      console.error(error);

      throw new Error('There was an error fetching the safe token list.');
    }
  }

  /**
   * ========================================================================
   * ANALYTICS
   * ========================================================================
   */

  /**
   * Get the analytics data for a specific campaign.
   *
   * @param {string} campaignId - The ID of the campaign to retrieve the analytics for.
   *
   * @returns {Promise<CampaignAnalytics>} A Promise that resolves to the analytics data for the campaign.
   *
   * @throws {Error} Throws an error if a fetching a campaign failed.
   */
  public async getCampaignAnalytics(campaignId: string) {
    if (!this.client) {
      throw new Error('The client is not initialized.');
    }

    try {
      const result = await this.client.apiFetch<CampaignAnalytics>(
        `${TORQUE_API_ROUTES.analytics.campaigns}/${campaignId}`,
        {
          method: 'GET',
        },
      );

      return result;
    } catch (error) {
      console.error(error);

      throw new Error(`There was an error getting the analytics for the campaign: ${campaignId}`);
    }
  }

  /**
   * ========================================================================
   * AUDIENCES
   * ========================================================================
   */

  /**
   * Get an audience by ID.
   *
   * @param {string} id - The ID of the audience to fetch.
   *
   * @returns {Promise<ApiAudience[]>} A promise that resolves to an array of Audiences.
   *
   * @throws {Error} If the client is not initialized or there was an error getting the audience.
   */
  public async getAudience(id: string) {
    if (!this.userClient) {
      throw new Error('The user client is not initialized.');
    }

    const user = await this.userClient.getCurrentUser();

    if (!this.client || !user) {
      throw new Error('The client is not initialized.');
    }

    try {
      const response = await this.client.apiFetch<ApiAudience>(
        `${TORQUE_API_ROUTES.audienceBuilder}/${id}`,
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${user.token}`, // TODO: remove if tokens if not api key
          },
        },
      );

      return response;
    } catch (error) {
      console.error(error);
      throw new Error('There was an error getting the audience.');
    }
  }

  /**
   * Get a list of the user's saved audiences.
   *
   * @returns {Promise<ApiAudience[]>} A promise that resolves to an array of Audiences.
   *
   * @throws {Error} If the client is not initialized or there was an error getting the audiences.
   */
  public async getAudiences() {
    if (!this.userClient) {
      throw new Error('The user client is not initialized.');
    }

    const user = await this.userClient.getCurrentUser();

    if (!this.client || !user) {
      throw new Error('The client is not initialized.');
    }

    try {
      const response = await this.client.apiFetch<{ audiences: ApiAudience[] }>(
        `${TORQUE_API_ROUTES.audienceBuilder}`,
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${user.token}`, // TODO: remove if tokens if not api key
          },
        },
      );

      return response;
    } catch (error) {
      console.error(error);
      throw new Error('There was an error getting the audience.');
    }
  }

  /**
   * Save an audience to the user's account.
   *
   * @param {Audience} config - The configuration of the audience to save.
   * @param {ApiAudienceMetadata} metadata - The metadata of the audience.
   *
   * @returns {Promise<{ audienceId: string }>} A promise that resolves to the id of the saved audience.
   *
   * @throws {Error} If the client is not initialized or there was an error saving the audience.
   */
  public async saveAudience(metadata: ApiAudienceMetadata, config?: Audience) {
    if (!this.userClient) {
      throw new Error('The user client is not initialized.');
    }

    const user = await this.userClient.getCurrentUser();
    if (!this.client || !user) {
      throw new Error('The client is not initialized.');
    }

    try {
      const response = await this.client.apiFetch<{ audienceId: string }>(
        TORQUE_API_ROUTES.audienceBuilder,
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
          body: JSON.stringify({
            title: metadata.title,
            description: metadata.description,
            fileKey: metadata.fileKey,
            bucket: metadata.bucket,
            type: metadata.type,
            config,
          }),
        },
      );

      return response;
    } catch (error) {
      console.error(error);
      throw new Error('There was an error saving the audience.');
    }
  }

  /**
   * Update an existing audience with the provided configuration.
   *
   * @param {string} id - The ID of the audience to update.
   * @param {Audience} config - The configuration of the audience to update.
   * @param {ApiAudienceMetadata} [metadata] - The metadata of the audience.
   *
   * @returns {Promise<ApiAudienceResponse>} A promise that resolves to the updated audience.
   *
   * @throws {Error} If the client is not initialized or if there was an error updating the audience.
   */
  public async updateAudience(id: string, metadata: ApiAudienceMetadata, config?: Audience) {
    if (!this.userClient) {
      throw new Error('The user client is not initialized.');
    }

    const user = await this.userClient.getCurrentUser();
    if (!this.client || !user) {
      throw new Error('The client is not initialized.');
    }

    try {
      const response = await this.client.apiFetch<{ audienceId: string }>(
        TORQUE_API_ROUTES.audienceBuilder,
        {
          method: 'PATCH',
          body: JSON.stringify({
            title: metadata.title,
            description: metadata.description,
            fileKey: metadata.fileKey,
            bucket: metadata.bucket,
            type: metadata.type,
            id,
            config,
          }),
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        },
      );

      return response;
    } catch (error) {
      console.error(error);
      throw new Error('There was an error updating the audience.');
    }
  }

  /**
   * Delete an existing audience.
   *
   * @param {string} id - The ID of the audience to delete.
   *
   * @returns {Promise<ApiAudienceResponse>} A promise that resolves to the deleted audience.
   *
   * @throws {Error} If the client is not initialized or if there was an error deleting the audience.
   */
  public async deleteAudience(id: string) {
    if (!this.userClient) {
      throw new Error('The user client is not initialized.');
    }

    const user = await this.userClient.getCurrentUser();

    if (!this.client || !user) {
      throw new Error('The client is not initialized.');
    }

    try {
      const response = await this.client.apiFetch<{ audienceId: string }>(
        TORQUE_API_ROUTES.audienceBuilder,
        {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
          body: JSON.stringify({
            id,
          }),
        },
      );

      return response;
    } catch (error) {
      console.error(error);
      throw new Error('There was an error deleting the audience.');
    }
  }
}
