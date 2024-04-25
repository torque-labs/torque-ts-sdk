import { TorqueClient } from "./client";
import { TORQUE_API_ROUTES } from "./constants";
import { ApiResponse, ApiUser } from "./types";

/**
 * Fetches the current user's data from the Torque API.
 *
 * This function asynchronously retrieves the user data by making a call to the Torque API's user endpoint.
 * The function parses the JSON response into an `ApiResponse` object, which includes the user's details
 * such as ID, public key, Twitter handle, profile image URL, username, publisher status, and publisher public key.
 *
 * @param {TorqueClient} this - The TorqueClient instance used to perform the API request.
 * @returns {Promise<ApiResponse<ApiUser>>} A promise that resolves to the user data if the API call is successful.
 * @throws {Error} Throws an error if the API response status is not "SUCCESS".
 */
export async function getUser(this: TorqueClient) {
  const result = await this.apiFetch(TORQUE_API_ROUTES.users);

  const user = (await result.json()) as unknown as ApiResponse<ApiUser>;

  if (user.status === "SUCCESS") {
    return user.data;
  } else {
    throw new Error(user.message);
  }
}
