import { Adapter } from '@solana/wallet-adapter-base';
import { Connection, Keypair, PublicKey, clusterApiUrl } from '@solana/web3.js';
import nacl from 'tweetnacl';
import { TorqueRequestClient } from './request';
import { TorqueSDK } from './sdk';
import {
  TORQUE_API_ROUTES,
  torquePubkey,
  TORQUE_SHARE_URL,
  SOLANA_NETWORK,
  PUBLISHER_ACCOUNT_SIZE,
} from '../constants';
import { ApiCampaign, ApiInputLogin, ApiShare, ApiUserJourney, ApiVerifiedUser } from '../types';

/**
 * Options for the TorqueUserClient.
 */
export type TorqueUserClientOptions = {
  signer: Adapter | Keypair;
  publisherHandle?: string;
  rpc?: string;
};

/**
 * The TorqueUserClient class is used to authenticate a user with the Torque API.
 * The user client allows publishers to fetch campaigns and offers that are savailable for the current user.
 *
 * @example
 * const client = new TorqueUserClient(TorqueUserClientOptions);
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
  public publicKey: string;
  private client: TorqueRequestClient;
  private user: ApiVerifiedUser | undefined;
  private signer: Adapter | Keypair;
  private connection: Connection;

  /**
   * Create a new instance of the TorqueUserClient class with the publisher's handle, if provided.
   *
   * @param {TorqueUserClientOptions} options - The options for the TorqueUserClient.
   *
   * @throws {Error} Throws an error if the user's wallet is not provided.
   */
  constructor(options: TorqueUserClientOptions) {
    const { signer, publisherHandle, rpc } = options;

    if (!signer.publicKey) {
      throw new Error('The wallet/signer provided does not have a public key.');
    }

    this.client = new TorqueRequestClient(signer);
    this.publicKey = signer.publicKey.toString();
    this.publisherHandle = publisherHandle;
    this.signer = signer;
    this.connection = new Connection(rpc ?? clusterApiUrl(SOLANA_NETWORK), 'confirmed');
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
  public async initializeUser(userAuth?: ApiInputLogin) {
    // Check if user is already logged in with API
    try {
      const currentUser = await this.getCurrentUser();

      if (currentUser) {
        return currentUser;
      }
    } catch (error) {
      console.error(error);
    }

    try {
      let loginBody: ApiInputLogin | undefined;

      if (!userAuth && this.signer.publicKey) {
        const signPayloadInput = await TorqueSDK.getLoginPayload();

        if ('signIn' in this.signer) {
          // Login with SIWS
          const signOutPayload = await this.signer.signIn(signPayloadInput.payload);

          loginBody = TorqueSDK.constructLoginBody({
            authType: 'siws',
            pubKey: this.signer.publicKey.toString(),
            payload: { input: signPayloadInput.payload, output: signOutPayload },
          });
        } else if ('signMessage' in this.signer) {
          // Login with basic signed message
          const signOutPayload = await this.signer.signMessage(
            Buffer.from(signPayloadInput.payload.statement, 'utf8'),
          );

          loginBody = TorqueSDK.constructLoginBody({
            authType: 'basic',
            pubKey: this.signer.publicKey.toString(),
            payload: {
              input: signPayloadInput.payload.statement,
              output: Buffer.from(signOutPayload).toString('base64'),
            },
          });
        } else {
          // Login with back-end wallet signature
          const signature = nacl.sign.detached(
            Buffer.from(signPayloadInput.payload.statement, 'utf8'),
            (this.signer as Keypair).secretKey,
          );

          loginBody = TorqueSDK.constructLoginBody({
            authType: 'basic',
            pubKey: this.signer.publicKey.toString(),
            payload: {
              input: signPayloadInput.payload.statement,
              output: Buffer.from(signature).toString('base64'),
            },
          });
        }
      } else if (userAuth) {
        loginBody = userAuth;
      }

      if (loginBody) {
        const verifiedUser = await this.login(loginBody);

        this.user = verifiedUser;
        this.initialized = true;

        return this.user;
      } else {
        throw new Error('There was an error logging in.');
      }
    } catch (error) {
      // TODO: Unset user if not verified
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
   * Logout the user from the Torque API.
   *
   * @throws {Error} Throws an error if the client is not initialized or if there is an error logging out the user.
   */
  private logout() {
    if (!this.client) {
      throw new Error('The client was not initialized.');
    }

    if (!this.user) {
      throw new Error('There is no user signed in.');
    }

    // TODO: unset client
    // TODO: add logout endpoint to API?
    // TOOD: clear coookies?
    this.publisherHandle = undefined;
    this.initialized = false;
    this.user = undefined;
  }

  /**
   * ========================================================================
   * USER
   * ========================================================================
   */

  /**
   * Rereshes the user's information from the Torque API.
   *
   * @returns {Promise<ApiVerifiedUser | undefined>} A promise that resolves to the user if they are signed in, otherwise undefined.
   */
  public async refreshUser() {
    if (!this.client) {
      throw new Error('The client is not initialized.');
    }

    if (this.user && this.initialized) {
      try {
        const result = await this.client.apiFetch<ApiVerifiedUser | false>(
          TORQUE_API_ROUTES.currentUser,
          {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${this.user.token}`,
            }
          },
        );

        if (result) {
          this.user = result;

          return result;
        }

        // TODO: Unset user if not verified or no result
        return undefined;
      } catch (error) {
        console.error(error);

        throw new Error('There was an error checking refreshing the user.');
      }
    } else {
      throw new Error('The user is not signed in.');
    }
  }

  /**
   * Checks to see if the user is already logged into the Torque API.
   *
   * @returns {Promise<ApiVerifiedUser | undefined>} A promise that resolves to the user if they are signed in, otherwise undefined.
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
      const result = await this.client.apiFetch<ApiVerifiedUser | false>(
        TORQUE_API_ROUTES.currentUser,
        {
          method: 'GET',
        },
      );

      if (result) {
        this.user = result;
        this.initialized = true;

        return result;
      }

      return undefined;
    } catch (error) {
      console.error(error);
    }

    return undefined;
  }

  /**
   * Retrieves the user's handle.
   *
   * @returns The user's handle or `undefined` if no handle is available.
   */
  public getUserHandle() {
    if (this.user) {
      const handle =
        this.user.username || this.user.twitter || this.user.pubKey || this.user.publisherPubKey;

      return handle;
    }

    return undefined;
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
      // TODO: Verify what publisher handle does for this endpoint
      const params = this.publisherHandle
        ? new URLSearchParams({ publisher: this.publisherHandle, status: 'ACTIVE' })
        : new URLSearchParams({ status: 'ACTIVE' });

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
   * Accepts a campaign for the current user.
   *
   * @param {string} campaignId - The ID of the campaign to accept.
   * @param {string} publisherHandle - The handle of the publisher to accept the campaign for.
   *
   * @returns {Promise<ApiUserJourney>} A Promise that resolves to the journey data for the campaign.
   *
   * @throws {Error} Throws an error if the client is not initialized or if there is an error accepting the campaign.
   */
  public async acceptCampaign(campaignId: string, publisherHandle?: string) {
    if (!this.client) {
      throw new Error('The client is not initialized.');
    }

    try {
      const result = await this.client.apiFetch<ApiUserJourney>(TORQUE_API_ROUTES.journey, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ campaignId, publisherHandle }),
      });

      return result;
    } catch (error) {
      console.error(error);

      throw new Error('There was an error accepting the campaign.');
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
   * Get the publisher PDA for the current user.
   *
   * @returns {PublicKey} The publisher PDA for the current user.
   */
  public getPublisherPda() {
    if (this.user?.publisherPubKey) {
      return new PublicKey(this.user.publisherPubKey);
    } else if (this.user && this.isPublisher()) {
      const seeds = [Buffer.from('publisher'), Buffer.from(this.user?.pubKey)];
      const [publisherPda] = PublicKey.findProgramAddressSync(seeds, torquePubkey);

      return publisherPda;
    }
  }

  /**
   * Get the balance of the publisher PDA for the current user.
   *
   * @returns {Promise<number>} The balance of the publisher PDA for the current user in lamports.
   */
  public async getPublisherBalance() {
    const pda = this.getPublisherPda();

    if (pda) {
      const balance = await this.connection.getBalance(pda);
      const rentExemptBalance =
        await this.connection.getMinimumBalanceForRentExemption(PUBLISHER_ACCOUNT_SIZE);

      const maxTransferable = balance - rentExemptBalance;

      return maxTransferable;
    } else {
      return 0;
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

      const result = await this.client.apiFetch<ApiShare>(
        `${TORQUE_API_ROUTES.share}?${params.toString()}`,
        {
          method: 'GET',
        },
      );

      return result;
    } catch (error) {
      console.error(error);

      throw new Error('There was an error getting the shared link data.');
    }
  }
}
