import { SolanaSignInOutput } from "@solana/wallet-standard-features";
import { TORQUE_API_ROUTES } from "./constants";
import {
  ApiResponse,
  ApiInputLogin,
  ApiVerifiedUser,
  ApiIdentifyPayload,
} from "./types";

/**
 * Constructs the body for the verify API request based on the authentication type.
 *
 * This function prepares the request body for the verification process, handling
 * different structures based on the authentication type specified. For `siws` authentication,
 * it processes the public key, signature, and signed message to ensure they are in the correct
 * format (Uint8Array) for transmission. For other authentication types, it passes the payload
 * as-is.
 *
 * @param {ApiInputLogin} params - The parameters for constructing the verify body.
 * @param {string} params.authType - The type of authentication being used (e.g., "siws").
 * @param {string} params.pubKey - The public key associated with the authentication request.
 * @param {object} params.payload - The payload containing the input and output data for verification.
 * @returns The constructed body object for the verify API request, formatted based on the authentication type.
 */
export function getVerifyBody({ payload, authType, pubKey }: ApiInputLogin) {
  const body =
    authType === "siws"
      ? {
          authType,
          pubKey,
          payload: {
            input: payload.input,
            output: {
              account: {
                ...payload.output.account,
                publicKey: Array.from(
                  new Uint8Array(payload.output.account.publicKey)
                ),
              },
              signature: new Uint8Array(payload.output.signature),
              signedMessage: new Uint8Array(payload.output.signedMessage),
            } as unknown as SolanaSignInOutput,
          },
        }
      : {
          authType,
          pubKey,
          payload: {
            input: payload.input,
            output: payload.output,
          },
        };

  return body;
}

/**
 * Retrieves the payload for identification from the Torque API.
 *
 * This function makes a GET request to the Torque API's identify endpoint to fetch the identification payload.
 * The payload includes a statement, the time it was issued, and its expiration time. If the request is successful,
 * the function returns the payload. Otherwise, it throws an error with the message received from the API.
 *
 * @returns {Promise<ApiIdentifyPayload>} A Promise that resolves to the payload containing the identification statement, issued at time, and expiration time.
 * @throws {Error} Throws an error if the API request is unsuccessful or if the API response status is not "SUCCESS".
 */
export async function getIdentifyPayload() {
  const identify = await fetch(TORQUE_API_ROUTES.identify, {
    method: "GET",
  });

  const result =
    (await identify.json()) as unknown as ApiResponse<ApiIdentifyPayload>;

  if (result.status === "SUCCESS") {
    return result.data.payload;
  } else {
    throw new Error(result.message);
  }
}

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
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  const result =
    (await verify.json()) as unknown as ApiResponse<ApiVerifiedUser>;

  if (result.status === "SUCCESS") {
    return result.data;
  } else {
    throw new Error(result.message);
  }
}
