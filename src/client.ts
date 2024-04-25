import { getAudiences } from "./audiences";
import { verify, getIdentifyPayload, getVerifyBody } from "./auth";
import { getCampaigns, getLinks } from "./campaigns";
import { getSharedLinkData, getUserShareLink } from "./share";
import { ApiInputVerify, ApiVerifiedUser } from "./types";
import { getUser } from "./user";
import { initPublisher, payoutPublisher } from "./publisher";

export class TorqueClient {
  public publisherHandle: string | undefined = undefined;
  private initialized: boolean = false;
  private user: ApiVerifiedUser | null = null;

  /**
   * Creates a new Torque client.
   *
   * @param publisherHandle - (Optional) Publisher handle to be used for offer links: pubKey, publisherPubKey, username, twitter
   */
  constructor(publisherHandle?: string) {
    this.publisherHandle = publisherHandle;
  }

  /**
   * Initializes the TorqueClient with the provided options.
   *
   * @param {ApiInputVerify} options - The options required for API verification.
   * @returns {Promise<"SUCCESS">} A Promise that resolves when the initialization is complete.
   * @throws {Error} If user was not verified.
   */
  public async initialize(options: ApiInputVerify) {
    const verifiedUser = await verify(options);

    if (verifiedUser.token) {
      this.user = verifiedUser;
      this.initialized = true;

      return "SUCCESS";
    } else {
      throw new Error("User was not authenticated.");
    }
  }

  /**
   * Retrieves the API headers required for making requests.
   * @returns The API headers as an object.
   * @throws {Error} if no API token is found.
   */
  private _getApiHeaders() {
    if (this.initialized && this.user) {
      return {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.user.token}`,
      };
    } else {
      throw new Error("No API token found.");
    }
  }

  /**
   * Makes a fetch request with the required API headers.
   *
   * @param url - The URL of the API endpoint.
   * @param options - Optional parameters for the fetch request.
   * @returns {Promise<Response>} A Promise that resolves with the response from the API endpoint.
   */
  public apiFetch(url: string, options?: RequestInit) {
    const apiHeaders = this._getApiHeaders();

    const init: RequestInit = {
      ...options,
      headers: {
        ...(options?.headers
          ? { ...apiHeaders, ...options.headers }
          : apiHeaders),
      },
    };

    return fetch(url, init);
  }

  /**
   * CAMPAIGNS
   */

  /**
   * Fetches a list of audiences from the Torque API.
   *
   * If the API call is successful and the status is "SUCCESS", it returns the audiences data.
   * Otherwise, it returns an empty array.
   *
   * @returns {Promise<ApiAudience[]>} A promise that resolves to an array of `ApiAudience` objects.
   */
  public getAudiences = getAudiences.bind(this);

  /**
   * Retrieves a list of active campaigns from the Torque API.
   *
   * This function sends a GET request to the Torque API to fetch all campaigns that are currently marked as "ACTIVE".
   * It constructs a query with the status parameter set to "ACTIVE" and sends the request. Upon receiving a response,
   * it parses the JSON and checks the status of the response. If the status is "SUCCESS", it returns the list of active
   * campaigns. Otherwise, it throws an error with the message received from the API.
   *
   * @returns {Promise<ApiCampaign[]>} A Promise resolving to an array of `ApiCampaign` objects representing the active campaigns.
   * @throws {Error} An error if the fetch operation fails, or if the API returns a status other than "SUCCESS".
   */
  public getCampaigns = getCampaigns.bind(this);

  /**
   * Retrieves shared link data for a specific campaign and handle.
   *
   * This function makes a GET request to the TORQUE_API_ROUTES.share endpoint,
   * passing the campaignId and handle as query parameters. It then processes
   * the response, returning the data if the request was successful, or throwing
   * an error if not.
   *
   * @param campaignId - The unique identifier for the campaign.
   * @param handle - The specific handle associated with the shared link.
   * @returns {Promise<ApiShare>} The data associated with the shared link if the request is successful.
   * @throws {Error} Error with the message from the API response if the request fails.
   */
  public getSharedLinkData = getSharedLinkData.bind(this);

  /**
   * USER
   */

  /**
   * Fetches the current user's data from the Torque API.
   *
   * This function asynchronously retrieves the user data by making a call to the Torque API's user endpoint.
   * The function parses the JSON response into an `ApiResponse` object, which includes the user's details
   * such as ID, public key, Twitter handle, profile image URL, username, publisher status, and publisher public key.
   *
   * @returns {Promise<ApiResponse<ApiUser>>} A promise that resolves to the user data if the API call is successful.
   * @throws {Error} Throws an error if the API response status is not "SUCCESS".
   */
  public getUser = getUser.bind(this);

  /**
   * Retrieves the user's handle.
   *
   * @returns The user's handle or `undefined` if no handle is available.
   */
  public getUserHandle() {
    if (this.user) {
      const handle =
        this.user.username ||
        this.user.twitter ||
        this.user.pubKey ||
        this.user.publisherPubKey;

      return handle;
    }

    return undefined;
  }

  /**
   * Fetches all of the user's share links using the Torque API.
   *
   * This function sends a GET request to the Torque API to fetch all share links for a for the
   * current user. Upon success, it returns an array of URLs and campaign IDs of the user's share links.
   * If the operation fails or the API returns a status other than "SUCCESS", it throws an error with a
   * descriptive message.
   *
   * @returns {Promise<ApiLinks>} A Promise resolving to the URLs of the user's share links.
   * @throws {Error} An error if the link fetch fails or if the API returns a status other than "SUCCESS".
   */
  public getLinks = getLinks.bind(this);

  /**
   * PUBLISHER
   */

  /**
   * Initializes a publisher by sending a serialized transaction to the Torque API.
   * This function attempts to create a new publisher using the provided serialized transaction.
   * If successful, it returns the data containing the publisher's public key.
   *
   * @param {SignerWalletAdapter} wallet - A `SignerWalletAdapter` instance representing the user's wallet.
   * @returns {ApiResponse<{ publisherPubKey: string; }} A promise that resolves to an object containing the publisher's public key if the API call is successful.
   * @throws {Error} Will throw an error if the API call fails or if the response status is not `SUCCESS`.
   */
  public initPublisher = initPublisher.bind(this);

  /**
   * Processes a payout to a publisher by sending a serialized transaction.
   * This function attempts to execute a payout transaction for the publisher using the provided wallet.
   * It leverages the `payoutPublisherTxn` function to create and send the transaction.
   *
   * @param {SignerWalletAdapter} wallet - A `SignerWalletAdapter` instance representing the user's wallet.
   * @returns {Promise<string>} A promise that resolves to a signature when the payout transaction has been successfully processed.
   * @throws {Error} Will throw an error if the transaction fails to process or if there's an issue with the transaction creation.
   */
  public payoutPublisher = payoutPublisher.bind(this);

  /**
   * Sets the publisher public key for the current user.
   *
   * @param publisherPubKey - The public key of the publisher to set.
   */
  public setUserPublisher(publisherPubKey: string) {
    if (this.user) {
      this.user.publisherPubKey = publisherPubKey;
      this.user.isPublisher = true;
    }
  }

  /**
   * Checks if the current user is a publisher.
   *
   * @returns True if the user is marked as a publisher, false otherwise.
   */
  public isUserPublisher() {
    return this.user ? this.user.isPublisher : false;
  }

  /**
   * Generates a URL for a user's shared link for a specific campaign.
   *
   * This function checks if the user is a publisher and has a handle,
   * then constructs and returns a URL using the user's handle and the campaign ID.
   * If the user is not a publisher or does not have a handle, an error is thrown.
   *
   * @param campaignId - The unique identifier for the campaign.
   * @returns {Promise<string>} A promise that resolves to the URL string of the user's shared link for the campaign.
   * @throws {Error} Throws an error if the user is not a publisher or does not have a handle.
   */
  public getUserShareLink = getUserShareLink.bind(this);

  /**
   * UTILITY FUNCTIONS
   */

  /**
   * Retrieves the payload for identification from the Torque API.
   *
   * This function makes a GET request to the Torque API's identify endpoint to fetch the identification payload.
   * The payload includes a statement, the time it was issued, and its expiration time. If the request is successful,
   * the function returns the payload. Otherwise, it throws an error with the message received from the API.
   *
   * @returns {Promise<ApiIdentifyPayload>} A Promise that resolves to the payload containing the identification statement, issued at time, and expiration time.
   * @throws {Error} Throws an error if the API request is unsuccessful or if the API response status is not "SUCCESS".
   */
  public getIdentifyPayload = getIdentifyPayload;

  /**
   * Constructs the body for the verify API request based on the authentication type.
   *
   * This function prepares the request body for the verification process, handling
   * different structures based on the authentication type specified. For `siws` authentication,
   * it processes the public key, signature, and signed message to ensure they are in the correct
   * format (Uint8Array) for transmission. For other authentication types, it passes the payload
   * as-is.
   *
   * @param {ApiInputVerify} params - The parameters for constructing the verify body.
   * @param {string} params.authType - The type of authentication being used (e.g., "siws").
   * @param {string} params.pubKey - The public key associated with the authentication request.
   * @param {object} params.payload - The payload containing the input and output data for verification.
   * @returns The constructed body object for the verify API request, formatted based on the authentication type.
   */
  public getVerifyBody = getVerifyBody;
}
