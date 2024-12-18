import { Adapter } from '@solana/wallet-adapter-base';
import { SolanaSignInOutput } from '@solana/wallet-standard-features';
import { Cluster, Keypair } from '@solana/web3.js';

import { TorqueAdminClient } from './admin.js';
import { TorqueAudienceClient } from './audience.js';
import { TorqueUserClient } from './user.js';
import { TORQUE_API_ROUTES } from '../constants/index.js';
import {
  ApiIdentifyPayload,
  ApiInputLogin,
  ApiResponse,
  ApiUser,
  SignTransaction,
} from '../types/index.js';

/**
 * Options for the TorqueSDK.
 */
export type TorqueSDKOptions = {
  /**
   * The API key for the client.
   */
  apiKey?: string;
  /**
   * The publisher handle for the client. Defaults to 'torqueprotocol'.
   */
  publisherHandle?: string;
  /**
   * The RPC URL for the client. Defaults to the Solana mainnet-beta cluster.
   */
  rpc?: string;
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
   * The network for the client. Defaults to 'mainnet-beta'. Only used if the RPC URL is not provided.
   */
  network?: Cluster;
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
 *   rpc: "<RPC URL>",
 * });
 *
 * // See if user is already logged in
 * const currentUser = await sdk.user.getCurrentUser();
 *
 * // Authenticate the user if not logged in
 * const user = currentUser
 *   ? currentUser
 *   : await sdk.user.initializeUser();
 */
export class TorqueSDK {
  public user: TorqueUserClient | undefined;
  public api: TorqueAdminClient | undefined;
  public audience: TorqueAudienceClient | undefined;
  private apiKey: string | undefined;
  private publisherHandle: string | undefined;
  private rpc: string | undefined;
  private apiUrl: string | undefined;
  private appUrl: string | undefined;
  private functionsUrl: string | undefined;
  private initialized: boolean = false;
  private network: Cluster;

  /**
   * Initializes the TorqueSDK with the provided options.
   *
   * @param {TorqueSDKOptions} options - The options for the TorqueSDK.
   *
   * @throws {Error} Throws an error if the there is no api key or publisher handle provided.
   *
   * @remarks
   * If you do not have a publisher account, go to https://app.torque.so to create one and pass it in as the publisherHandle. This will attribute your conversions to your publisher account.
   */
  constructor(options: TorqueSDKOptions) {
    if (!options.publisherHandle) {
      console.warn(
        'You must provide a publisher handle in order to be attributed for conversions. If you do not have a publisher account, go to https://app.torque.so to create one.',
      );
    }

    this.apiKey = options.apiKey;
    this.publisherHandle = options.publisherHandle ?? 'torqueprotocol';
    this.rpc = options.rpc;
    this.apiUrl = options.apiUrl;
    this.appUrl = options.appUrl;
    this.functionsUrl = options.functionsUrl;
    this.network = options.network ?? 'mainnet-beta';
  }

  /**
   * Initializes the TorqueSDK with the provided options.
   *
   * @param {Adapter | Keypair} signer - The signer used to sign transactions.
   * @param {SignTransaction} [signTransaction] - The function used to sign transactions. If provided, it will override the default signing method.
   * @param {apiInputLogin} [ApiInputLogin] - The login options for the user.
   * @param {boolean} [useTransactionForLogin] - Whether to use transaction signing (eg. w/ ledger) instead of basic signing.
   *
   * @throws {Error} Throws an error if the there is no api key or publisher handle provided.
   */
  public async initialize(
    signer: Adapter | Keypair,
    signTransaction?: SignTransaction,
    apiInputLogin?: ApiInputLogin,
    useTransactionForLogin?: boolean,
  ) {
    const userClient = new TorqueUserClient({
      signer: signer,
      publisherHandle: this.publisherHandle,
      rpc: this.rpc,
      apiUrl: this.apiUrl,
      appUrl: this.appUrl,
      functionsUrl: this.functionsUrl,
      network: this.network,
      signTransaction: signTransaction,
    });

    this.user = userClient;

    try {
      await this.user.initializeUser(apiInputLogin, useTransactionForLogin);
    } catch {
      throw new Error('There was an error initializing the Torque SDK.');
    }

    this.api = new TorqueAdminClient({
      signer: signer,
      apiKey: this.apiKey,
      userClient: userClient,
      apiUrl: this.apiUrl,
      appUrl: this.appUrl,
      functionsUrl: this.functionsUrl,
      rpc: this.rpc,
      network: this.network,
      signTransaction: signTransaction,
    });

    if (this.apiKey) {
      this.audience = new TorqueAudienceClient({
        signer: signer,
        apiKey: this.apiKey,
        userClient: userClient,
        apiUrl: this.apiUrl,
        appUrl: this.appUrl,
        functionsUrl: this.functionsUrl,
      });
    }

    this.initialized = true;
  }

  /**
   * Logout the user from the Torque API.
   *
   * @throws {Error} Throws an error if the client is not initialized or if there is an error logging out the user.
   */
  public async logout() {
    if (this.initialized) {
      if (this.user) {
        await this.user?.logout();
      }

      if (this.api) {
        await this.api.logout();
      }

      if (this.audience) {
        await this.audience.logout();
      }

      this.user = undefined;
      this.api = undefined;
      this.audience = undefined;
      this.initialized = false;
    }
  }

  /**
   * Static method to verify the login options with the Torque API.
   *
   * @param {ApiInputLogin} loginOptions - The verification object that is required to authenticate a user with Torque.
   * @param {string} apiUrl - The API URL to use for the verification. Defaults to the Torque API URL.
   *
   * @returns {Promise<ApiUser>} A Promise that resolves to an object containing the user information.
   *
   * @throws {Error} Throws an error if there is an error authenticating the user.
   */
  public static async verifyLogin(
    loginOptions: ApiInputLogin,
    apiUrl: string = 'https://api.torque.so',
  ) {
    try {
      const url = `${apiUrl}${TORQUE_API_ROUTES.login}`;

      // TODO: Setup request caching
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginOptions),
      });

      const result = (await response.json()) as unknown as ApiResponse<ApiUser>;

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

  /**
   * AUTHENTICATION HELPER METHODS
   */

  /**
   * Retrieves a sample SIWS payload for logging into the Torque API.
   *
   * @param {string} apiUrl - The API URL to use for the payload. Defaults to the Torque API URL.
   *
   * @returns {Promise<ApiIdentifyPayload>} A Promise that resolves to the payload containing the identification statement, issued at time, and expiration time.
   *
   * @throws {Error} Throws an error if the API request is unsuccessful.
   */
  public static async getLoginPayload(apiUrl: string = 'https://api.torque.so') {
    try {
      const url = `${apiUrl}${TORQUE_API_ROUTES.identify}`;

      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const result = (await response.json()) as unknown as ApiResponse<ApiIdentifyPayload>;

      if (result.status === 'SUCCESS') {
        return result.data;
      } else {
        throw new Error(result.message);
      }
    } catch (error) {
      console.error(error);

      throw new Error('There was an error getting the login payload.');
    }
  }

  /**
   * Constructs the body for the login API request based on the authentication type.
   *
   * @param {ApiInputLogin} params - The parameters for constructing the login body.
   *
   * @returns The constructed body for the verify API request, formatted based on the authentication type.
   */
  public static constructLoginBody(params: ApiInputLogin) {
    const { payload, authType, pubKey } = params;
    const body =
      authType === 'siws'
        ? {
            authType,
            pubKey,
            payload: {
              input: payload.input,
              output: {
                account: {
                  ...payload.output.account,
                  publicKey: Array.from(new Uint8Array(payload.output.account.publicKey)),
                },
                signature: new Uint8Array(payload.output.signature),
                signedMessage: new Uint8Array(payload.output.signedMessage),
              } as unknown as SolanaSignInOutput,
            },
          }
        : {
            authType,
            pubKey,
            payload: {
              input: payload.input,
              output: payload.output,
            },
          };

    return body;
  }
}
