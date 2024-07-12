import { Adapter } from '@solana/wallet-adapter-base';
import { Keypair } from '@solana/web3.js';

import { TorqueRequestClient } from './request.js';
import { TorqueUserClient } from './user.js';
import { TORQUE_FUNCTIONS_ROUTES } from '../constants/index.js';
import { Audience, AudienceBuild, AudienceBuildResponse } from '../types/index.js';

/**
 * Options for the TorqueAudienceClient.
 */
export type TorqueAudienceClientOptions = {
  /**
   * The signer used to sign transactions.
   */
  signer: Adapter | Keypair;
  /**
   * The API key for the client.
   */
  apiKey: string;
  /**
   * The user client for the user based API requests.
   */
  userClient: TorqueUserClient;
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
};

/**
 * The TorqueAudienceClient class is used to manage and verify audiencess for the Torque API.
 *
 * @example
 * const client = new TorqueAudienceClient(TorqueAudienceClientOptions);
 *
 * const audience = await client.buildAudience(<audienceData>);
 * const verified = await client.verifyAudience(audience);
 */
export class TorqueAudienceClient {
  private client: TorqueRequestClient;
  private userClient: TorqueUserClient | undefined;

  /**
   * Create a new instance of the TorqueAdminClient class with the provided API key.
   *
   * @param {TorqueAudienceClientOptions} options - The options for the TorqueAudienceClient.
   */
  constructor(options: TorqueAudienceClientOptions) {
    const { signer, apiKey, userClient, apiUrl, appUrl, functionsUrl } = options;

    this.client = new TorqueRequestClient({ signer, apiKey, apiUrl, appUrl, functionsUrl });
    this.userClient = userClient;
  }

  public async logout() {
    this.userClient = undefined;
  }

  /**
   * Builds an audience with the provided options.
   *
   * @param {BuildWorkerRequest} options - The options for the audience build.
   *
   * @returns {Promise<AudienceFunctionResponse>} The response from the API.
   *
   * @throws {Error} If there is an error building the audience.
   */
  public async buildAudience(options: AudienceBuild) {
    if (!this.client) {
      throw new Error('The client is not initialized.');
    }

    try {
      const result = await this.client.functionsFetch<AudienceBuildResponse>(
        TORQUE_FUNCTIONS_ROUTES.audience.build,
        {
          method: 'POST',
          body: JSON.stringify({ body: options }),
        },
      );

      return result;
    } catch (error) {
      console.error(error);

      throw new Error('There was an error building the audience.');
    }
  }

  /**
   * Verifies the current user with the provided audience.
   *
   * @param {Audience} audience - The options for the audience verification.
   *
   * @returns {Promise<boolean>} True if the user is verified with the audience, false otherwise.
   *
   * @throws {Error} If there is an error verifying the user with the audience.
   */
  public async verifyAudience(audience: Audience, publicKey?: string) {
    if (!this.client) {
      throw new Error('The client is not initialized.');
    }

    try {
      const result = await this.client.functionsFetch<boolean>(
        TORQUE_FUNCTIONS_ROUTES.audience.verify,
        {
          method: 'POST',
          body: JSON.stringify({
            body: {
              audience,
              publicKey,
            },
          }),
        },
      );

      return result;
    } catch (error) {
      console.error(error);

      throw new Error('There was an error verifying the user with the audience.');
    }
  }
}
