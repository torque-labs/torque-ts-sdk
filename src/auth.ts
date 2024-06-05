import { TORQUE_API_ROUTES } from './constants.js';
import { ApiResponse, ApiInputLogin, ApiVerifiedUser } from './types/index.js';

/**
 * Constructs the body for the verify API request based on the authentication type.
 *
 * This function prepares the request body for the verification process, handling


/**
 * Verifies the provided information by making a POST request to the Torque API's verify endpoint.
 *
 * This function is designed to send a verification request to the Torque API. It includes all necessary
 * information for the verification process, such as the authentication type, public key, and payload
 * within the request body. Upon a successful verification, the function returns the verification result,
 * which includes details like the API token, public key, verification status, and optionally, user information
 * such as username, Twitter handle, profile image, and publisher status. If the verification process fails,
 * the function throws an error with a message detailing the reason for failure.
 *
 * @param {ApiInputLogin} body - The verification request body. This object contains all the necessary
 *                                information required for the verification process, structured according
 *                                to the `ApiInputLogin` type.
 * @returns {Promise<ApiVerifiedUser>} A promise that resolves to an object containing the verification result.
 *                                     This result includes the API token, public key, verification status,
 *                                     and optionally, additional user information. The structure of this
 *                                     result is defined by the `ApiVerifiedUser` type.
 * @throws {Error} Throws an error if the API request is unsuccessful or if the API response status is not "SUCCESS".
 *                 The error message provides details about the reason for the request's failure.
 */
export async function verify(body: ApiInputLogin) {
  const verify = await fetch(TORQUE_API_ROUTES.verify, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });

  const result = (await verify.json()) as unknown as ApiResponse<ApiVerifiedUser>;

  if (result.status === 'SUCCESS') {
    return result.data;
  } else {
    throw new Error(result.message);
  }
}
