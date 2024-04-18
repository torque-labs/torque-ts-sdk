import { TorqueClient } from "./client";
import { TORQUE_API_ROUTES } from "./constants";
import { ApiAudience, ApiResponse } from "./types";

/**
 * Fetches a list of audiences from the Torque API.
 *
 * This function sends a request to the Torque API to retrieve a list of audiences.
 * It constructs a query parameter to specify that all public keys (`pubKey`) should be considered
 * in the request. The response is expected to be in a predefined format, encapsulated by `ApiResponse`.
 *
 * @param {TorqueClient} client - The TorqueClient instance used to perform the API fetch.
 * @returns {Promise<ApiAudience[]>} A promise that resolves to an array of `ApiAudience` objects.
 * If the API call is successful and the status is "SUCCESS", it returns the audiences data.
 * Otherwise, it returns an empty array.
 */
export async function getAudiences(client: TorqueClient) {
  const params = new URLSearchParams({
    pubKey: "all",
  });

  const audiences = await client.apiFetch(
    `${TORQUE_API_ROUTES.audiences}?${params.toString()}`,
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
