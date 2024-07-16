import { getAssociatedTokenAddress } from '@solana/spl-token';
import { Adapter } from '@solana/wallet-adapter-base';
import { Cluster, Connection, Keypair, PublicKey, clusterApiUrl } from '@solana/web3.js';
import nacl from 'tweetnacl';

import { TorqueRequestClient } from './request.js';
import { TorqueSDK } from './sdk.js';
import { TORQUE_API_ROUTES, torquePubkey, PUBLISHER_ACCOUNT_SIZE } from '../constants/index.js';
import {
  ApiCampaign,
  ApiCampaignJourney,
  ApiInputLogin,
  ApiShare,
  ApiUserJourney,
  ApiUserPayout,
  ApiVerifiedUser,
  SignTransaction,
} from '../types/index.js';

/**
 * Options for the TorqueUserClient.
 */
export type TorqueUserClientOptions = {
  /**
   * The signer used to sign transactions.
   */
  signer: Adapter | Keypair;
  /**
   * The publisher handle for the client. Defaults to 'torqueprotocol'.
   */
  publisherHandle?: string;
  /**
   * RPC URL for the client.
   */
  rpc?: string;
  /**
   * API URL for the client.
   */
  apiUrl?: string;
  /**
   * App URL for the client.
   */
  appUrl?: string;
  /**
   * Functions URL for the client.
   */
  functionsUrl?: string;
  /**
   * The network for the client. Defaults to 'mainnet-beta'.
   */
  network: Cluster;
  /**
   * The function used to sign transactions. If provided, it will override the default signing method.
   */
  signTransaction?: SignTransaction;
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
  public publisherHandle: string;
  public initialized: boolean = false;
  public publicKey: string;
  public user: ApiVerifiedUser | undefined;
  private client: TorqueRequestClient;
  private signer: Adapter | Keypair;
  private connection: Connection;
  private appUrl: string;
  private apiUrl: string;

  /**
   * Create a new instance of the TorqueUserClient class with the publisher's handle, if provided.
   *
   * @param {TorqueUserClientOptions} options - The options for the TorqueUserClient.
   *
   * @throws {Error} Throws an error if the user's wallet is not provided.
   */
  constructor(options: TorqueUserClientOptions) {
    const { signer, publisherHandle, rpc, apiUrl, appUrl, functionsUrl, network, signTransaction } =
      options;

    if (!signer.publicKey) {
      throw new Error('The wallet/signer provided does not have a public key.');
    }

    this.publicKey = signer.publicKey.toString();
    this.publisherHandle = publisherHandle ?? 'torqueprotocol';
    this.signer = signer;
    this.connection = new Connection(rpc ?? clusterApiUrl(network), 'confirmed');
    this.appUrl = appUrl ?? 'https://app.torque.so';
    this.apiUrl = apiUrl ?? 'https://api.torque.so';

    this.client = new TorqueRequestClient({
      signer,
      apiUrl,
      appUrl,
      functionsUrl,
      connection: this.connection,
      signTransaction,
    });
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
      // console.error(error);
      console.log('-- initializeUser -- User is not logged in, attempting to login');
    }

    try {
      let loginBody: ApiInputLogin | undefined;

      if (!userAuth && this.signer.publicKey) {
        const signPayloadInput = await TorqueSDK.getLoginPayload(this.apiUrl);

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
  public async logout() {
    if (!this.client) {
      throw new Error('The client was not initialized.');
    }

    if (!this.user) {
      throw new Error('There is no user signed in.');
    }

    try {
      const result = await this.client.apiFetch<{ cleared: boolean }>(TORQUE_API_ROUTES.logout, {
        method: 'GET',
      });

      this.initialized = false;
      this.user = undefined;

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
              Authorization: `Bearer ${this.user.token}`,
            },
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
        true,
      );

      if (result) {
        this.user = result;
        this.initialized = true;

        return result;
      }

      return undefined;
    } catch (error) {
      console.log('-- User is not logged in, will attempt to login');
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
        this.user.username || this.user.twitter || this.user.publisherPubKey || this.user.pubKey;

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
      // TODO: Add publisher handle to offer urls
      const result = await this.client.apiFetch<{
        campaigns: ApiCampaign[];
      }>(`${TORQUE_API_ROUTES.usersOffers}/${this.publicKey}}`, {
        method: 'GET',
      });

      return result;
    } catch (error) {
      console.error(error);

      throw new Error("There was an error getting user's eligible campaigns.");
    }
  }

  /**
   * Initiate a user journey to accept a campaign for the current user.
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
      const result = await this.client.apiFetch<ApiUserJourney>(TORQUE_API_ROUTES.journeyStart, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${this.user?.token}`,
        },
        body: JSON.stringify({
          campaignId,
          publisherHandle: publisherHandle ?? this.publisherHandle,
        }),
      });

      return result;
    } catch (error) {
      console.error(error);

      throw new Error('There was an error accepting the campaign.');
    }
  }

  /**
   * Retrieves the user's campaign journey for the specified campaign.
   *
   * @param {string} campaignId - The ID of the campaign to retrieve the journey for.
   *
   * @returns {Promise<ApiCampaignJourney>} A Promise that resolves to the user's campaign journey.
   *
   * @throws {Error} Throws an error if the client is not initialized or if there is an error getting the journey.
   */
  public async getCampaignJourney(campaignId: string) {
    if (!this.client) {
      throw new Error('The client is not initialized.');
    }

    try {
      const result = await this.client.apiFetch<{
        journeys: ApiCampaignJourney[];
      }>(`${TORQUE_API_ROUTES.userJourney}/?campaignId=${campaignId}`, {
        headers: {
          Authorization: `Bearer ${this.user?.token}`,
        },
      });

      // Extract the user's journey for the specified campaign from array
      if (result.journeys.length > 0) {
        return result.journeys[0];
      } else {
        return undefined;
      }
    } catch (error) {
      console.error(error);

      throw new Error('There was an error getting the campaign journey.');
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

    const shareUrl = `${this.appUrl}/share`;

    if (handle && isPublisher) {
      return `${shareUrl}/${handle}/${campaignId}`;
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

  static PUBLISHER_ACCOUNT_SIZE = 41;

  public async getMaxTransferableSpl(token: PublicKey) {
    try {
      const associatedTokenAddress = await getAssociatedTokenAddress(
        token,
        new PublicKey(this.getPublisherPda()!),
        true,
      );
      const tokenAccountInfo = await this.connection.getTokenAccountBalance(
        associatedTokenAddress,
        'processed',
      );
      return tokenAccountInfo.value.uiAmount ?? 0;
    } catch (e) {
      console.log('-!!! max spl failed to fetch', e);
      return 0;
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
      const balance = await this.connection.getBalance(pda, 'processed');
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

  /**
   * ========================================================================
   * USER PAYOUTS
   * ========================================================================
   */

  /**
   * Retrieves user's payout history from conversions.
   *
   * @returns {Promise<ApiShare>} The data associated with the shared link if the request is successful.
   *
   * @throws {Error} Throws an error there was an error getting the shared link data.
   */
  public async getUserPayout() {
    if (!this.client) {
      throw new Error('The client is not initialized.');
    }

    try {
      const result = await this.client.apiFetch<ApiUserPayout>(
        `${TORQUE_API_ROUTES.userPayout}/${this.publicKey}`,
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
