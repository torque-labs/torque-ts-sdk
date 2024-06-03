import { TorqueRequestClient } from "@/classes/request";
import { CampaignCreateInput, CampaignEndInput } from "..";
import { TORQUE_API_ROUTES } from "@/constants";

/**
 * The TorqueAdminClient class is used to manage admin actions in the Torque API.
 *
 * @example
 * const client = new TorqueAdminClient(<apiKey>);
 *
 * const result = await client.createCampaign(<campaignData>);
 * const result = await client.endCampaign(<campaignData>);
 */
export class TorqueAdminClient {
  private client: TorqueRequestClient | undefined;

  /**
   * Create a new instance of the TorqueAdminClient class with the provided API key.
   *
   * @param {string} apiKey - The API key for the admin client.
   */
  constructor(apiKey: string) {
    this.client = new TorqueRequestClient({ clientType: "admin", apiKey });
  }

  /**
   * End a campaign using the provided campaign ID.
   *
   * @param {string} campaignId - The ID of the campaign to end.
   *
   * @throws {Error} Throws an error if the client is not initialized or if there is an error ending the campaign.
   */
  public async endCampaign(campaignId: CampaignEndInput["campaignId"]) {
    if (!this.client) {
      throw new Error("The client is not initialized.");
    }

    const result = await this.client.apiFetch<string>(
      TORQUE_API_ROUTES.campaigns,
      {
        method: "DELETE",
        body: JSON.stringify({ endCampaign: campaignId }),
      }
    );
  }

  /**
   * Create a new campaign with the provided data.
   *
   * @param {CampaignCreateInput} campaignData - The data for the campaign to create.
   */
  public async createCampaign(campaignData: CampaignCreateInput) {
    if (!this.client) {
      throw new Error("The client is not initialized.");
    }

    const result = await this.client.apiFetch<string>(
      TORQUE_API_ROUTES.campaigns,
      {
        method: "POST",
        body: JSON.stringify({ createCampaign: campaignData }),
      }
    );
  }
}
