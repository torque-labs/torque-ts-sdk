import { SignerWalletAdapter } from '@solana/wallet-adapter-base';
import { Keypair } from '@solana/web3.js';

import { TorqueRequestClient } from './request';
import { TorqueUserClient } from './user';
import { JUP_TOKEN_LIST, TORQUE_API_ROUTES } from '../constants';
import {
  ApiCampaign,
  ApiCampaignLeaderboard,
  ApiRaffleRewards,
  ApiTxnTypes,
  CampaignCreateInput,
  CampaignEndInput,
  SafeToken,
} from '../types';

/**
 * Options for the TorqueAdminClient.
 */
export type TorqueAdminClientOptions = {
  signer: SignerWalletAdapter | Keypair;
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
export class TorqueAdminClient {
  private client: TorqueRequestClient;
  private userClient: TorqueUserClient;
  public tokenList: SafeToken[] | undefined;

  /**
   * Create a new instance of the TorqueAdminClient class with the provided API key.
   *
   * @param {TorqueAdminClientOptions} options - The options for the TorqueAdminClient.
   */
  constructor(options: TorqueAdminClientOptions) {
    const { signer, apiKey, userClient } = options;

    this.client = new TorqueRequestClient(signer, apiKey);
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
   * @returns {Promise<string>} A promise that resolves to the signature of the transaction.
   */
  public async createCampaign(data: CampaignCreateInput) {
    if (!this.client) {
      throw new Error('The client is not initialized.');
    }

    try {
      const input = {
        txnType: ApiTxnTypes.CampaignCreate,
        data,
      } as const;

      const signature = await this.client.transaction(input);

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
   * @returns {Promise<string>} A promise that resolves to the signature of the transaction.
   *
   * @throws {Error} Throws an error if the client is not initialized or if there is an error ending the campaign.
   */
  public async endCampaign(data: CampaignEndInput) {
    if (!this.client) {
      throw new Error('The client is not initialized.');
    }

    try {
      const input = {
        txnType: ApiTxnTypes.CampaignEnd,
        data,
      } as const;

      const signature = await this.client.transaction(input);

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
      const { signature } = await this.client.transaction({
        txnType: ApiTxnTypes.PublisherCreate,
        data: true,
      });

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
      const { signature } = await this.client.transaction({
        txnType: ApiTxnTypes.PublisherPayout,
        data,
      });

      return signature;
    } catch (error) {
      console.error(error);

      throw new Error('There was an error paying out the publisher.');
    }
  }

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
  public async getSafeTokenList(filter?: string) {
    if (!this.client) {
      throw new Error('The client is not initialized.');
    }

    if (this.tokenList) {
      return !filter
        ? this.tokenList
        : this.tokenList.filter((token) => token.name.toLowerCase().includes(filter));
    }

    try {
      const response = await this.client.anyFetch<SafeToken[]>(JUP_TOKEN_LIST);

      this.tokenList = response;

      return !filter
        ? this.tokenList
        : this.tokenList.filter((token) => token.name.toLowerCase().includes(filter));
    } catch (error) {
      console.error(error);

      throw new Error('There was an error fetching the safe token list.');
    }
  }
}
