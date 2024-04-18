import { TorqueClient } from "./client";
import { TORQUE_API_ROUTES } from "./constants";
import { ApiResponse, ApiStatus } from "./types";

/**
 * Initiates a campaign start process by sending a request to the API.
 *
 * This function sends a POST request to the API's journey endpoint, attempting to start a campaign
 * with the provided `campaignId` and `publisherHandle`. If the API responds with a success status,
 * the function returns the data part of the response. In case of failure, it throws an error with
 * the API's returned message.
 *
 * @param client - An instance of `TorqueClient` used to perform the API request.
 * @param campaignId - The unique identifier of the campaign to be started.
 * @param publisherHandle - The handle (identifier) of the publisher starting the campaign.
 * @returns A Promise resolving to the data part of the API response if successful.
 * @throws An error with the message from the API response if the request fails.
 */
export async function startCampaign(
  client: TorqueClient,
  campaignId: string,
  publisherHandle: string,
) {
  const journey = await client.apiFetch(TORQUE_API_ROUTES.journey, {
    method: "POST",
    body: JSON.stringify({ campaignId, publisherHandle }),
  });

  const result = (await journey.json()) as unknown as ApiResponse<{
    campaignId: string;
    status: string;
  }>;

  if (result.status === ApiStatus.SUCCESS) {
    return result.data;
  } else {
    throw new Error(result.message);
  }
}
