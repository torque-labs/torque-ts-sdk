import { TorqueClient } from "./client";
import { TORQUE_API_ROUTES } from "./constants";
import { ApiResponse, ApiShare, ApiStatus } from "./types";

/**
 * Retrieves shared link data for a specific campaign and handle.
 *
 * This function makes a GET request to the TORQUE_API_ROUTES.share endpoint,
 * passing the campaignId and handle as query parameters. It then processes
 * the response, returning the data if the request was successful, or throwing
 * an error if not.
 *
 * @param this - The TorqueClient instance used to perform the API fetch.
 * @param campaignId - The unique identifier for the campaign.
 * @param handle - The specific handle associated with the shared link.
 * @returns The data associated with the shared link if the request is successful.
 * @throws Error with the message from the API response if the request fails.
 */
export async function getSharedLinkData(
  this: TorqueClient,
  campaignId: string,
  handle: string
) {
  const params = new URLSearchParams({ campaignId, handle });

  const share = await this.apiFetch(
    `${TORQUE_API_ROUTES.share}?${params.toString()}`,
    {
      method: "GET",
    }
  );

  const result = (await share.json()) as unknown as ApiResponse<ApiShare>;

  if (result.status === ApiStatus.SUCCESS) {
    return result.data;
  } else {
    throw new Error(result.message);
  }
}
