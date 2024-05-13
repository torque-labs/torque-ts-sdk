import { TorqueClient } from "./client";
import { TORQUE_API_ROUTES, TORQUE_SHARE_URL } from "./constants";
import { ApiResponse, ApiShare, ApiStatus } from "./types";

/**
 * Retrieves shared link data for a specific campaign and handle.
 *
 * @param campaignId - The unique identifier for the campaign.
 * @param handle - The specific handle associated with the shared link.
 * @returns {Promise<ApiShare>} The data associated with the shared link if the request is successful.
 * @throws {Error} Error with the message from the API response if the request fails.
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
export async function getUserShareLink(this: TorqueClient, campaignId: string) {
  const handle = this.getUserHandle();
  const isPublisher = this.isUserPublisher();

  if (handle && isPublisher) {
    return `${TORQUE_SHARE_URL}/${handle}/${campaignId}`;
  } else {
    throw new Error("User is not a publisher.");
  }
}
