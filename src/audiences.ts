import { TorqueClient } from "./client";
import { TORQUE_API_ROUTES } from "./constants";
import { ApiAudience, ApiResponse } from "./types";

/**
 * Fetches a list of audiences from the Torque API.
 *
 * If the API call is successful and the status is "SUCCESS", it returns the audiences data.
 * Otherwise, it returns an empty array.
 *
 * @returns {Promise<ApiAudience[]>} A promise that resolves to an array of `ApiAudience` objects.
 */
export async function getAudiences(this: TorqueClient) {
  const params = new URLSearchParams({
    pubKey: "all",
  });

  const audiences = await this.apiFetch(
    `${TORQUE_API_ROUTES.audiences}?${params.toString()}`
  );

  const result = (await audiences.json()) as unknown as ApiResponse<{
    audiences: ApiAudience[];
  }>;

  if (result.status === "SUCCESS") {
    return result.data.audiences;
  } else {
    return [];
  }
}
