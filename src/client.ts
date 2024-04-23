import { getAudiences } from "./audiences";
import { verify, getIdentifyPayload } from "./auth";
import { getCampaigns, getLinks } from "./campaigns";
import { getSharedLinkData } from "./share";
import { ApiInputVerify } from "./types";
import { getUser } from "./user";

export class TorqueClient {
  public publisherHandle: string | null = null;
  private initialized: boolean = false;
  private api_token: string | null = null;

  /**
   * Initializes the TorqueClient with the provided options.
   * @param publisherHandle - The publisher's handle or publisherPubKey to be used for offer links.
   * @param options - The options required for API verification.
   * @returns A Promise that resolves when the initialization is complete.
   */
  constructor(publisherHandle: string, options: ApiInputVerify) {
    this.publisherHandle = publisherHandle;
    this.initialize(options);
  }

  /**
   * Initializes the TorqueClient with the provided options.
   * @param options - The options required for API verification.
   * @returns A Promise that resolves when the initialization is complete.
   */
  private async initialize(options: ApiInputVerify) {
    const verification = await verify(options);

    if (verification.token) {
      this.api_token = verification.token;
      this.initialized = true;
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
    if (this.initialized && this.api_token) {
      return {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.api_token}`,
      };
    } else {
      throw new Error("No API token found.");
    }
  }

  /**
   * Makes a fetch request with the required API headers.
   * @param url - The URL of the API endpoint.
   * @param options - Optional parameters for the fetch request.
   * @returns A Promise that resolves with the response from the API endpoint.
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
   * This function sends a GET request to the Torque API to fetch all campaigns that are currently avaialable for the user. Upon receiving
   * a response, it parses the JSON and checks the status of the response. If the status is "SUCCESS", it returns the list of active
   * campaigns. Otherwise, it throws an error with the message received from the API.
   *
   * @returns A Promise resolving to an array of `ApiCampaign` objects representing the active campaigns.
   * @throws {Error} if the fetch operation fails, or if the API returns a status other than "SUCCESS".
   */
  public getCampaigns = getCampaigns.bind(this);

  /**
   * Fetches all of the user's share links using the Torque API.
   *
   * This function sends a GET request to the Torque API to fetch all share links for a for the
   * current user. Upon success, it returns an array of URLs and campaign IDs of the user's share links.
   * If the operation fails or the API returns a status other than "SUCCESS", it throws an error with a
   * descriptive message.
   *
   * @returns A Promise resolving to the URLs of the user's share links.
   * @throws {Error} if the link fetch fails or if the API returns a status other than "SUCCESS".
   */
  public getLinks = getLinks.bind(this);

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
   * @returns The data associated with the shared link if the request is successful.
   * @throws {Error} with the message from the API response if the request fails.
   */
  public getSharedLinkData = getSharedLinkData.bind(this);

  /**
   * Fetches the current user's data from the Torque API.
   *
   * This function asynchronously retrieves the user data by making a call to the Torque API's user endpoint.
   * It expects a `TorqueClient` instance as its parameter, which is used to perform the API fetch.
   * The function parses the JSON response into an `ApiResponse` object, which includes the user's details
   * such as ID, public key, Twitter handle, profile image URL, username, publisher status, and publisher public key.
   *
   * @returns {Promise<ApiResponse<{id: string; pubKey: string; twitter?: string; profileImage?: string; username?: string; isPublisher: boolean; publisherPubKey?: string | null;}>>} A promise that resolves to the user data if the API call is successful.
   * @throws {Error} Throws an error if the API response status is not "SUCCESS".
   */
  public getUser = getUser.bind(this);

  /**
   * Retrieves the payload for identification from the Torque API. The paylaod can then be used with the verification function
   *
   * This function makes a GET request to the Torque API's identify endpoint to fetch the identification payload.
   * The payload includes a statement, the time it was issued, and its expiration time. If the request is successful,
   * the function returns the payload. Otherwise, it throws an error with the message received from the API.
   *
   * @returns A Promise that resolves to the payload containing the identification statement, issued at time, and expiration time.
   * @throws {Error} Throws an error if the API request is unsuccessful or if the API response status is not "SUCCESS".
   */
  public getIdentifyPayload = getIdentifyPayload.bind(this);
}
