import { SignerWalletAdapter } from '@solana/wallet-adapter-base';
import { SolanaSignInOutput } from '@solana/wallet-standard-features';
import { Keypair } from '@solana/web3.js';

import { TorqueRequestClient } from './request.js';
import { TORQUE_API_ROUTES, TORQUE_SHARE_URL } from '../constants.js';
import { ApiCampaign, ApiIdentifyPayload, ApiInputLogin, ApiShare, ApiVerifiedUser } from '../types/index.js';

/**
 * The TorqueUserClient class is used to authenticate a user with the Torque API.
 * The user client allows publishers to fetch campaigns and offers that are savailable for the current user.
 *
 * @example
 * const client = new TorqueUserClient();
 *
 * // Check if the user is already logged in with API
 * const currentUser = await client.getCurrentUser();
 *
 * const user = currentUser
 *   ? currentUser
 *   : await this.initializeUser(ApiInputLogin);
 */
export class TorqueUserClient {
  public publisherHandle: string | undefined;
  public initialized: boolean = false;
  private client: TorqueRequestClient | undefined;
  private user: ApiVerifiedUser | undefined;

  /**
   * Create a new instance of the TorqueUserClient class with the publisher's handle, if provided.
   *
   * @param {SignerWalletAdapter | Keypair} signer - The signer used to sign transactions.
   * @param {string} publisherHandle - The publisher handle as registered with Torque (twitter, publisher pubKey or wallet address used when signing up).
   *
   * @throws {Error} Throws an error if the user's wallet is not provided.
   */
  constructor(signer: SignerWalletAdapter | Keypair, publisherHandle?: string) {
    this.client = new TorqueRequestClient(signer);
    this.publisherHandle = publisherHandle;
  }

  /**
   * ========================================================================
   * AUTHENTICATION
   * ========================================================================
   */

  /**
   * Initializes the TorqueUserClient with the provided options.
   *
   * @param {ApiInputLogin} userAuth - User signature object that is required to authenticate a user with Torque.
   *
   * @returns {Promise<ApiVerifiedUser>} A Promise that resolves when the initialization is complete.
   *
   * @throws {Error} If user was not verified.
   */
  public async initializeUser(userAuth: ApiInputLogin) {
    try {
      const verifiedUser = await this.login(userAuth);

      this.user = verifiedUser;
      this.initialized = true;

      return this.user;
    } catch (error) {
      console.error(error);

      throw new Error('There was an error initializing the user.');
    }
  }

  /**
   * Authenticate the user with the torque API with the provided user signature object.
   *
   * @param {ApiInputLogin} loginOptions - The verification object that is required to authenticate a user with Torque.
   *
   * @returns {Promise<ApiVerifiedUser>} A Promise that resolves to an object containing the user information.
   *
   * @throws {Error} Throws an error if there is an error authenticating the user.
   */
  private async login(loginOptions: ApiInputLogin) {
    if (!this.client) {
      throw new Error('The client is not initialized.');
    }

    try {
      // TODO: Update server with login and verify endpoints
      const result = await this.client.apiFetch<ApiVerifiedUser>(TORQUE_API_ROUTES.login, {
        method: 'POST',
        body: JSON.stringify(loginOptions),
      });

      return result;
    } catch (error) {
      console.error(error);

      throw new Error('There was an error logging in.');
    }
  }

  /**
   * ========================================================================
   * USER
   * ========================================================================
   */

  /**
   * Checks to see if the user is already logged into the Torque API.
   *
   * @returns {Promise<ApiVerifiedUser | false>} A promise that resolves to the user if they are signed in, otherwise false.
   *
   * @throws {Error} Throws an error if checking the user's login status fails.
   */
  public async getCurrentUser() {
    if (!this.client) {
      throw new Error('The client is not initialized.');
    }

    try {
      if (this.user) {
        return this.user;
      }

      // TODO: Update server with login and verify endpoints
      const result = await this.client.apiFetch<ApiVerifiedUser | false>(TORQUE_API_ROUTES.verify, {
        method: 'GET',
      });

      if (result) {
        this.user = result;
        this.initialized = true;

        return result;
      }

      return false;
    } catch (error) {
      console.error(error);

      throw new Error('There was an error checking if the user is logged in.');
    }
  }

  /**
   * Retrieves the user's handle.
   *
   * @returns The user's handle or `undefined` if no handle is available.
   */
  public getUserHandle() {
    if (this.user) {
      const handle = this.user.username || this.user.twitter || this.user.pubKey || this.user.publisherPubKey;

      return handle;
    }

    return undefined;
  }

  /**
   * Retrieves a sample SIWS payload for l ogging into the Torque API.
   *
   * @returns {Promise<ApiIdentifyPayload>} A Promise that resolves to the payload containing the identification statement, issued at time, and expiration time.
   *
   * @throws {Error} Throws an error if the API request is unsuccessful.
   */
  public async getLoginPayload() {
    if (!this.client) {
      throw new Error('The client is not initialized.');
    }
    try {
      const result = await this.client.apiFetch<ApiIdentifyPayload>(TORQUE_API_ROUTES.identify, {
        method: 'GET',
      });

      return result;
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
  public constructLoginBody(params: ApiInputLogin) {
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

  /**
   * ========================================================================
   * CAMPAIGNS
   * ========================================================================
   */

  /**
   * Retrieves a list of active campaigns from the Torque API that the user is eligible to participate in.
   *
   * @returns {Promise<ApiCampaign[]>} A Promise resolving to an array of `ApiCampaign` objects representing the active campaigns.
   *
   * @throws {Error} An error if the fetch operation fails, or if the API returns a status other than "SUCCESS".
   */
  public async getCampaigns() {
    if (!this.client) {
      throw new Error('The client is not initialized.');
    }

    try {
      const params = this.publisherHandle ? new URLSearchParams({ publisher: this.publisherHandle }) : {};

      const result = await this.client.apiFetch<{
        campaigns: ApiCampaign[];
      }>(`${TORQUE_API_ROUTES.userCampaigns}?${params.toString()}`, {
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
   * ========================================================================
   * PUBLISHER
   * ========================================================================
   */

  /**
   * Checks to see if the user is a publisher.
   *
   * @returns {boolean} True if the user is a publisher, false otherwise.
   *
   * @throws {Error} Throws an error if the user is not signed in.
   */
  public isPublisher() {
    if (!this.user) {
      throw new Error('The user is not signed in.');
    }

    return this.user && this.user.isPublisher ? true : false;
  }

  /**
   * Generates a URL for a user's shared link for a specific campaign.
   *
   * @param {string} campaignId - The unique identifier for the campaign.
   *
   * @returns {string} A promise that resolves to the URL string of the user's shared link for the campaign.
   *
   * @throws {Error} Throws an error if the user is not a publisher or does not have a handle.
   */
  public getUserShareLink(campaignId: string) {
    const handle = this.getUserHandle();
    const isPublisher = this.isPublisher();

    if (handle && isPublisher) {
      return `${TORQUE_SHARE_URL}/${handle}/${campaignId}`;
    } else {
      throw new Error('The user is not a publisher.');
    }
  }

  /**
   * Fetches all of the user's share links that they have previously created.
   *
   * @returns {Promise<ApiLinks>} A Promise resolving to the URLs of the user's share links.
   *
   * @throws {Error} An error if the link fetch fails.
   */
  public async getAllUserShareLinks() {
    if (!this.client) {
      throw new Error('The client is not initialized.');
    }

    try {
      const result = await this.client.apiFetch<{
        links: {
          campaignId: string;
          url: string;
        }[];
      }>(TORQUE_API_ROUTES.links, {
        method: 'GET',
      });

      return result;
    } catch (error) {
      console.error(error);

      throw new Error('There was an error getting the shared link data.');
    }
  }

  // TODO: set user publisher when txn is executed
  public setUserPublisher() {}

  /**
   * ========================================================================
   * SHARED LINK
   * ========================================================================
   */

  /**
   * Retrieves the data for an offer link for a specific campaign and handle.
   *
   * @param {string} campaignId - The unique identifier for the campaign.
   * @param {string} handle - The specific handle associated with the shared link.
   *
   * @returns {Promise<ApiShare>} The data associated with the shared link if the request is successful.
   *
   * @throws {Error} Throws an error there was an error getting the shared link data.
   */
  public async getSharedLinkData(campaignId: string, handle: string) {
    if (!this.client) {
      throw new Error('The client is not initialized.');
    }

    try {
      const params = new URLSearchParams({ campaignId, handle });

      const result = await this.client.apiFetch<ApiShare>(`${TORQUE_API_ROUTES.share}?${params.toString()}`, {
        method: 'GET',
      });

      return result;
    } catch (error) {
      console.error(error);

      throw new Error('There was an error getting the shared link data.');
    }
  }
}
