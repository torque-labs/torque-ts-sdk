import { TorqueClient } from "./client";
import { TORQUE_API_ROUTES } from "./constants";
import { ApiCampaign, ApiResponse } from "./types";

/**
 * Retrieves a list of active campaigns from the Torque API.
 *
 * This function sends a GET request to the Torque API to fetch all campaigns that are currently marked as "ACTIVE".
 * It constructs a query with the status parameter set to "ACTIVE" and sends the request. Upon receiving a response,
 * it parses the JSON and checks the status of the response. If the status is "SUCCESS", it returns the list of active
 * campaigns. Otherwise, it throws an error with the message received from the API.
 *
 * @returns A Promise resolving to an array of `ApiCampaign` objects representing the active campaigns.
 * @throws An error if the fetch operation fails, or if the API returns a status other than "SUCCESS".
 */
export async function getCampaigns(this: TorqueClient) {
  if (!this.publisherHandle) {
    throw new Error("No publisher handle provided.");
  }

  const params = new URLSearchParams({ publisher: this.publisherHandle });

  const campaigns = await this.apiFetch(
    `${TORQUE_API_ROUTES.userCampaigns}?${params.toString()}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  const result = (await campaigns.json()) as unknown as ApiResponse<{
    campaigns: ApiCampaign[];
  }>;

  if (result.status === "SUCCESS") {
    return result.data.campaigns;
  } else {
    throw new Error(result.message);
  }
}

/**
 * Fetches all of the user's share links using the Torque API.
 *
 * This function sends a GET request to the Torque API to fetch all share links for a for the
 * current user. Upon success, it returns an array of URLs and campaign IDs of the user's share links.
 * If the operation fails or the API returns a status other than "SUCCESS", it throws an error with a
 * descriptive message.
 *
 * @param this - The TorqueClient instance used to perform the API request.
 * @returns A Promise resolving to the URLs of the user's share links.
 * @throws An error if the link fetch fails or if the API returns a status other than "SUCCESS".
 */
export async function getLinks(this: TorqueClient) {
  const links = await this.apiFetch(TORQUE_API_ROUTES.links, {
    method: "GET",
  });

  const result = (await links.json()) as unknown as ApiResponse<{
    links: {
      campaignId: string;
      url: string;
    }[];
  }>;

  if (result.status === "SUCCESS") {
    return result.data.links;
  } else {
    throw new Error(result.message);
  }
}
