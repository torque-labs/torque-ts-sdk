import { TorqueClient } from "./client";
import { TORQUE_API_ROUTES } from "./constants";
import { ApiResponse, ApiInputVerify } from "./types";

/**
 * Constructs the body for the verify API request based on the authentication type.
 *
 * This function prepares the request body for the verification process, handling
 * different structures based on the authentication type specified. For `siws` authentication,
 * it processes the public key, signature, and signed message to ensure they are in the correct
 * format (Uint8Array) for transmission. For other authentication types, it passes the payload
 * as-is.
 *
 * @param {ApiInputVerify} params - The parameters for constructing the verify body.
 * @param {string} params.authType - The type of authentication being used (e.g., "siws").
 * @param {string} params.pubKey - The public key associated with the authentication request.
 * @param {object} params.payload - The payload containing the input and output data for verification.
 * @returns The constructed body object for the verify API request, formatted based on the authentication type.
 */
export function getVerifyBody({ payload, authType, pubKey }: ApiInputVerify) {
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
                  new Uint8Array(payload.output.account.publicKey),
                ),
              },
              signature: new Uint8Array(payload.output.signature),
              signedMessage: new Uint8Array(payload.output.signedMessage),
            },
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
 * @param {TorqueClient} client - An instance of `TorqueClient` used to make the API request.
 * @returns A Promise that resolves to the payload containing the identification statement, issued at time, and expiration time.
 * @throws {Error} Throws an error if the API request is unsuccessful or if the API response status is not "SUCCESS".
 */
export async function getIdentifyPayload(client: TorqueClient) {
  const identify = await client.apiFetch(TORQUE_API_ROUTES.identify, {
    method: "GET",
  });

  const result = (await identify.json()) as unknown as ApiResponse<{
    payload: {
      statement: string;
      issuedAt: string;
      expirationTime: string;
    };
  }>;

  if (result.status === "SUCCESS") {
    return result.data.payload;
  } else {
    throw new Error(result.message);
  }
}

/**
 * Verifies the provided information by making a POST request to the Torque API's verify endpoint.
 *
 * This function sends a verification request to the server with the provided body, which includes
 * the necessary information for verification such as authentication type, public key, and payload.
 * Upon successful verification, it returns the verification result including the API token, public key,
 * verification status, and optional user information such as username, Twitter handle, profile image,
 * and publisher status. If the verification fails, it throws an error with the failure message.
 *
 * @param {ApiInputVerify} body - The verification request body containing the necessary information for verification.
 * @returns A Promise that resolves to an object containing the verification result, including the token,
 *          public key, verification status, and optional user information.
 * @throws {Error} Throws an error if the API request is unsuccessful or if the API response status is not "SUCCESS".
 */
export async function verify(body: ApiInputVerify) {
  const verify = await fetch(TORQUE_API_ROUTES.verify, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  const result = (await verify.json()) as unknown as ApiResponse<{
    token: string;
    pubKey: string;
    verified: boolean;
    username?: string;
    twitter?: string;
    profileImage?: string;
    isPublisher: boolean;
    publisherPubKey?: string | null;
  }>;

  if (result.status === "SUCCESS") {
    return result.data;
  } else {
    throw new Error(result.message);
  }
}
