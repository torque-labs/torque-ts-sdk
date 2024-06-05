import { SignerWalletAdapter } from '@solana/wallet-adapter-base';
import { Keypair } from '@solana/web3.js';

import { TorqueRequestClient } from './request.js';
import { ApiTxnTypes, CampaignCreateInput, CampaignEndInput } from '../types/index.js';

/**
 * The TorqueAdminClient class is used to manage admin actions in the Torque API.
 *
 * @example
 * const client = new TorqueAdminClient(<apiKey>);
 *
 * const result = await client.createCampaign(<campaignData>);
 * const result = await client.endCampaign(<campaignData>);
 */
export class TorqueAdminClient {
  private client: TorqueRequestClient | undefined;

  /**
   * Create a new instance of the TorqueAdminClient class with the provided API key.
   *
   * @param {SignerWalletAdapter | Keypair} signer - The signer used to sign transactions.
   * @param {string} apiKey - The API key for the admin client.
   */
  constructor(signer: SignerWalletAdapter | Keypair, apiKey: string) {
    this.client = new TorqueRequestClient(signer, apiKey);
  }

  /**
   * ========================================================================
   * CAMPAIGNS
   * ========================================================================
   */

  /**
   * Create a new campaign with the provided data.
   *
   * @param {CampaignCreateInput} campaignData - The data for the campaign to create.
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
   * @param {CampaignEndInput} campaignData - The ID of the campaign to end.
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

      return signature;
    } catch (error) {
      console.error(error);

      throw new Error('There was an error creating the publisher.');
    }
  }

  /**
   * Process a publisher payout fpr the current user, if eligible.
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
}
