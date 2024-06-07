import { SignerWalletAdapter } from '@solana/wallet-adapter-base';
import { Keypair } from '@solana/web3.js';

import { TorqueRequestClient } from './request.js';
import { TorqueUserClient } from './user.js';
import { TORQUE_FUNCTIONS_ROUTES } from '../constants.js';
import { Audience, AudienceBuild, AudienceBuildResponse } from '../types/index.js';

type TorqueAudienceClientOptions = {
  signer: SignerWalletAdapter | Keypair;
  apiKey: string;
  userClient: TorqueUserClient;
};

export class TorqueAudienceClient {
  private client: TorqueRequestClient;
  private userClient: TorqueUserClient;

  /**
   * Create a new instance of the TorqueAdminClient class with the provided API key.
   *
   * @param {TorqueAudienceClientOptions} options - The options for the TorqueAudienceClient.
   * @param {string} apiKey - The API key for the admin client.
   */
  constructor({ signer, apiKey, userClient }: TorqueAudienceClientOptions) {
    this.client = new TorqueRequestClient(signer, apiKey);
    this.userClient = userClient;
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
          body: JSON.stringify(options),
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
   * @param {AudienceVerify} options - The options for the audience verification.
   *
   * @returns {Promise<boolean>} True if the user is verified with the audience, false otherwise.
   *
   * @throws {Error} If there is an error verifying the user with the audience.
   */
  public async verifyAudience(audience: Audience) {
    if (!this.client) {
      throw new Error('The client is not initialized.');
    }

    try {
      const options = { audience, publicKey: this.userClient.publicKey };

      const result = await this.client.functionsFetch<boolean>(
        TORQUE_FUNCTIONS_ROUTES.audience.verify,
        {
          method: 'POST',
          body: JSON.stringify(options),
        },
      );

      return result;
    } catch (error) {
      console.error(error);

      throw new Error('There was an error verifying the user with the audience.');
    }
  }
}
