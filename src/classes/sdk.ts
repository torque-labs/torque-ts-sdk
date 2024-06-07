import { SignerWalletAdapter } from '@solana/wallet-adapter-base';
import { Keypair } from '@solana/web3.js';

import { TorqueAdminClient } from './admin.js';
import { TorqueAudienceClient } from './audience.js';
import { TorqueUserClient } from './user.js';

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
}
