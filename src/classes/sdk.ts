import { SignerWalletAdapter } from '@solana/wallet-adapter-base';
import { Keypair } from '@solana/web3.js';

import { TorqueAdminClient } from './admin.js';
import { TorqueAudienceClient } from './audience.js';
import { TorqueUserClient } from './user.js';
import { TORQUE_API_ROUTES } from '../constants/index.js';
import { ApiInputLogin, ApiResponse, ApiVerifiedUser } from '../types/index.js';

/**
 * Options for the TorqueSDK.
 */
export type TorqueSDKOptions = {
  signer: SignerWalletAdapter | Keypair;
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
export class TorqueSDK {
  public user: TorqueUserClient;
  public api: TorqueAdminClient | undefined;
  public audience: TorqueAudienceClient | undefined;

  /**
   * Initializes the TorqueSDK with the provided options.
   *
   * @param {TorqueSDKOptions} options - The options for the TorqueSDK.
   *
   * @throws {Error} Throws an error if the there is no api key or publisher handle provided.
   */
  constructor(options: TorqueSDKOptions) {
    if (!options.apiKey && !options.publisherHandle) {
      throw new Error('You must provide an API key or a publisher handle.');
    }

    const userClient = new TorqueUserClient({
      signer: options.signer,
      publisherHandle: options.publisherHandle,
      rpc: options.rpc,
    });

    this.user = userClient;

    if (options.apiKey) {
      this.api = new TorqueAdminClient({
        signer: options.signer,
        apiKey: options.apiKey,
        userClient: userClient,
      });

      this.audience = new TorqueAudienceClient({
        signer: options.signer,
        apiKey: options.apiKey,
        userClient: userClient,
      });
    }
  }

  /**
   * Static method to verify the login options with the Torque API.
   *
   * @param {ApiInputLogin} loginOptions - The verification object that is required to authenticate a user with Torque.
   *
   * @returns {Promise<ApiVerifiedUser>} A Promise that resolves to an object containing the user information.
   *
   * @throws {Error} Throws an error if there is an error authenticating the user.
   */
  static async verifyLogin(loginOptions: ApiInputLogin) {
    try {
      // TODO: Setup request caching
      const response = await fetch(TORQUE_API_ROUTES.login, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginOptions),
      });

      const result = (await response.json()) as unknown as ApiResponse<ApiVerifiedUser>;

      if (result.status === 'SUCCESS') {
        return result.data;
      } else {
        throw new Error(result.message);
      }
    } catch (error) {
      console.error(error);

      throw new Error('There was an error verifying the login options.');
    }
  }
}
