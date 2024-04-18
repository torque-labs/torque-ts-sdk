import { getAudiences } from "./audiences";
import { verify } from "./auth";
import { createCampaignLink, getCampaigns, getLinks } from "./campaigns";
import { startCampaign } from "./journey";
import {
  becomeAPublisherTxn,
  createCampaignTxn,
  finishCampaignTxn,
  payoutPublisherTxn,
} from "./protocol/transactions";
import { getSharedLinkData } from "./share";
import { ApiInputVerify } from "./types";
import { getUser } from "./user";

export class TorqueClient {
  public initialized: boolean = false;
  private api_token: string | null = null;

  /**
   * Initializes the TorqueClient with the provided options.
   * @param options - The options required for API verification.
   * @returns A Promise that resolves when the initialization is complete.
   */
  constructor(options: ApiInputVerify) {
    this.initialize(options);
  }

  /**
   * Initializes the TorqueClient with the provided options.
   * @param options - The options required for API verification.
   * @returns A Promise that resolves when the initialization is complete.
   */
  public async initialize(options: ApiInputVerify) {
    const verification = await verify(options);

    this.api_token = verification.token;
    this.initialized = true;
  }

  /**
   * Retrieves the API headers required for making requests.
   * @returns The API headers as an object.
   * @throws Error if no API token is found.
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
   * Audiences
   */
  public getAudiences = getAudiences.bind(this);

  /**
   * Campaign
   */
  public getCampaigns = getCampaigns.bind(this);
  public createCampaign = createCampaignTxn.bind(this);
  public finishCampaign = finishCampaignTxn.bind(this);
  public startCampaign = startCampaign.bind(this);

  /**
   * Publisher
   */
  public becomeAPublisher = becomeAPublisherTxn.bind(this);
  public payoutPublisher = payoutPublisherTxn.bind(this);

  /**
   * Sharing
   */
  public getLinks = getLinks.bind(this);
  public createCampaignLink = createCampaignLink.bind(this);
  public getSharedLinkData = getSharedLinkData.bind(this);

  /**
   * User
   */
  public getUser = getUser.bind(this);
}
