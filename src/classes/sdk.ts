import { Keypair } from "@solana/web3.js";
import { TorqueAdminClient } from "./admin";
import { TorqueUserClient } from "./user";
import { SignerWalletAdapter } from "@solana/wallet-adapter-base";

export type TorqueSDKOptions = {
  signer: SignerWalletAdapter | Keypair;
  apiKey?: string;
  publisherHandle?: string;
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
  public user: TorqueUserClient | undefined;
  public api: TorqueAdminClient | undefined;

  /**
   * Initializes the TorqueSDK with the provided options.
   *
   * @param {TorqueSDKOptions} options - The options for the TorqueSDK.
   */
  constructor(options: TorqueSDKOptions) {
    if (!options.apiKey && !options.publisherHandle) {
      throw new Error("You must provide an API key or a publisher handle.");
    }

    if (options.apiKey) {
      this.api = new TorqueAdminClient(options.signer, options.apiKey);
    }

    this.user = new TorqueUserClient(options.signer, options.publisherHandle);
  }
}
