import { Adapter } from '@solana/wallet-adapter-base';
import { Keypair } from '@solana/web3.js';

import { TorqueRequestClient } from './request.js';
import { TorqueUserClient } from './user.js';
import { TORQUE_API_ROUTES } from '../constants/index.js';
import {
  ApiAudience,
  ApiCampaign,
  ApiCampaignLeaderboard,
  ApiTxnTypes,
  Audience,
  CampaignCreateInput,
  CampaignEndInput,
  SafeToken,
  WithSignature,
  ApiRaffleRewards,
  ApiResponse,
} from '../types/index.js';

/**
 * Options for the TorqueAdminClient.
 */
export type TorqueAdminClientOptions = {
  signer: Adapter | Keypair;
  apiKey: string;
  userClient: TorqueUserClient;
  apiUrl?: string;
  appUrl?: string;
  functionsUrl?: string;
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
  private userClient: TorqueUserClient;
  public static tokenList: SafeToken[] | undefined;

  /**
   * Create a new instance of the TorqueAdminClient class with the provided API key.
   *
   * @param {TorqueAdminClientOptions} options - The options for the TorqueAdminClient.
   */
  constructor(options: TorqueAdminClientOptions) {
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
  public async getCampaigns() {
    if (!this.client) {
      throw new Error('The client is not initialized.');
    }

    try {
      const params = new URLSearchParams({ status: 'ACTIVE' });

      const result = await this.client.apiFetch<{
        campaigns: ApiCampaign[];
      }>(`${TORQUE_API_ROUTES.campaigns}?${params.toString()}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      return result;
    } catch (error) {
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
  public async createCampaign(data: CampaignCreateInput): Promise<WithSignature<unknown>> {
    if (!this.client) {
      throw new Error('The client is not initialized.');
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
      const fetchUrl = `${apiUrl}${TORQUE_API_ROUTES.tokens}`;

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
   * AUDIENCES
   * ========================================================================
   */

  // TODO: Move to Audience class

  public async saveAudience(config: Audience, title: string, description?: string) {
    const user = await this.userClient.getCurrentUser();
    if (!this.client || !user) {
      throw new Error('The client is not initialized.');
    }

    try {
      const response = await this.client.apiFetch<unknown>(`${TORQUE_API_ROUTES.audienceBuilder}`, {
        method: 'POST',
        body: JSON.stringify({
          title,
          description,
          config,
        }),
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user.token}`,
        },
      });

      return response;
    } catch (error) {
      console.error(error);
      throw new Error('There was an error saving the audience.');
    }
  }

  public async getAudience() {
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
            'Content-Type': 'application/json',
            Authorization: `Bearer ${user.token}`,
          },
        },
      );

      return response;
    } catch (error) {
      console.error(error);
      throw new Error('There was an error getting the audience.');
    }
  }

  public async updateAudience(id: string, title: string, description?: string) {
    const user = await this.userClient.getCurrentUser();
    if (!this.client || !user) {
      throw new Error('The client is not initialized.');
    }

    try {
      const response = await this.client.apiFetch<Audience>(
        `${TORQUE_API_ROUTES.audienceBuilder}`,
        {
          method: 'PATCH',
          body: JSON.stringify({
            title,
            description,
            id,
          }),
          headers: {
            'Content-Type': 'application/json',
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

  public async deleteAudience(id: string) {
    const user = await this.userClient.getCurrentUser();
    if (!this.client || !user) {
      throw new Error('The client is not initialized.');
    }

    try {
      const response = await this.client.apiFetch<Audience>(
        `${TORQUE_API_ROUTES.audienceBuilder}`,
        {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
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
