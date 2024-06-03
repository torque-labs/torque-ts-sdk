import { TORQUE_API_ROUTES } from "@/constants";
import { ApiInputVerify, ApiTxnTypes, ApiVerifiedUser } from "@/types";
import { TorqueRequestClient } from "@/classes/request";
import { SignerWalletAdapter } from "@solana/wallet-adapter-base";

/**
 * The TorqueUserClient class is used to authenticate and manage user accounts in the Torque API.
 *
 * @example
 * const client = new TorqueUserClient();
 *
 * // Check if the user is already logged in with API
 * const currentUser = await client.currentUser();
 *
 * const user = currentUser
 *   ? currentUser
 *   : await this.initializeUser(apiAuthInput);
 */
export class TorqueUserClient {
  public publisherHandle: string | undefined;
  public initialized: boolean = false;
  private client: TorqueRequestClient | undefined;
  private user: ApiVerifiedUser | undefined;
  private wallet: SignerWalletAdapter | undefined;

  /**
   * Create a new instance of the TorqueUserClient class with the publisher's handle, if provided.
   *
   * @param {string} publisherHandle - The publisher handle as registered with Torque (twitter, publisher pubKey or wallet address used when signing up).
   *
   * @throws {Error} Throws an error if the user's wallet is not provided.
   */
  constructor(wallet: SignerWalletAdapter, publisherHandle?: string) {
    if (wallet) {
      throw new Error("The user's wallet was not provided.");
    }

    this.client = new TorqueRequestClient({ clientType: "user" });
    this.publisherHandle = publisherHandle;
    this.wallet = wallet;
  }

  /**
   * ========================================================================
   * AUTHENTICATION
   * ========================================================================
   */

  /**
   * Initializes the TorqueUserClient with the provided options.
   *
   * @param {ApiInputVerify} userAuth - User signature object that is required to authenticate a user with Torque.
   *
   * @returns {Promise<ApiVerifiedUser>} A Promise that resolves when the initialization is complete.
   *
   * @throws {Error} If user was not verified.
   */
  public async initializeUser(userAuth: ApiInputVerify) {
    try {
      const verifiedUser = await this.login(userAuth);

      this.user = verifiedUser;
      this.initialized = true;

      return this.user;
    } catch (error) {
      console.error(error);

      throw new Error("There was an error initializing the user.");
    }
  }

  /**
   * Authenticate the user with the torque API with the provided user signature object.
   *
   * @param {ApiInputVerify} loginOptions - The verification object that is required to authenticate a user with Torque.
   *
   * @returns {Promise<ApiVerifiedUser>} A Promise that resolves to an object containing the user information.
   *
   * @throws {Error} Throws an error if there is an error authenticating the user.
   */
  private async login(loginOptions: ApiInputVerify) {
    try {
      if (!this.client) {
        throw new Error("The client is not initialized.");
      }

      // TODO: Update server with login and verify endpoints
      const result = await this.client.apiFetch<ApiVerifiedUser>(
        TORQUE_API_ROUTES.login,
        {
          method: "POST",
          body: JSON.stringify(loginOptions),
        }
      );

      return result;
    } catch (error) {
      console.error(error);

      throw new Error("There was an error logging in.");
    }
  }

  /**
   * Checks to see if the user is already logged into the Torque API.
   *
   * @returns {Promise<ApiVerifiedUser | false>} A promise that resolves to the user if they are signed in, otherwise false.
   *
   * @throws {Error} Throws an error if checking the user's login status fails.
   */
  public async currentUser() {
    if (!this.client) {
      throw new Error("The client is not initialized.");
    }

    try {
      if (this.user) {
        return this.user;
      }

      const result = await this.client.apiFetch<ApiVerifiedUser | false>(
        TORQUE_API_ROUTES.verify,
        {
          method: "GET",
        }
      );

      if (result) {
        this.user = result;
        this.initialized = true;

        return result;
      }

      return false;
    } catch (error) {
      console.error(error);

      throw new Error("There was an error checking if the user is logged in.");
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
   */
  public isPublisher() {
    return this.user && this.user.isPublisher ? true : false;
  }

  /**
   * Initialize a publisher account for the current user.
   *
   * @return {Promise<string>} A promise that resolves to the signature of the transaction.
   *
   * @throws {Error} Throws an error if there was an error creating the publisher.
   */
  public async initPublisher() {
    if (!this.client) {
      throw new Error("The client is not initialized.");
    }

    if (!this.user) {
      throw new Error("The user is not signed in.");
    }

    if (!this.wallet) {
      throw new Error("The wallet is not initialized.");
    }

    if (this.isPublisher()) {
      throw new Error("The user is already a publisher.");
    }

    try {
      const { signature } = await this.client.transaction(this.wallet, {
        txnType: ApiTxnTypes.PublisherCreate,
        data: true,
      });

      return signature;
    } catch (error) {
      console.error(error);

      throw new Error("There was an error creating the publisher.");
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
      throw new Error("The client is not initialized.");
    }

    if (!this.user) {
      throw new Error("The user is not signed in.");
    }

    if (!this.wallet) {
      throw new Error("The wallet is not initialized.");
    }

    try {
      const { signature } = await this.client.transaction(this.wallet, {
        txnType: ApiTxnTypes.PublisherPayout,
        data,
      });

      return signature;
    } catch (error) {
      console.error(error);

      throw new Error("There was an error paying out the publisher.");
    }
  }
}
