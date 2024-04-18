import { TorqueClient } from "./client";
import { TORQUE_API_ROUTES } from "./constants";
import { ApiResponse, ApiStatus } from "./types";
import { base64ToUint8Array } from "./utils";

/**
 * Initializes a publisher by sending a serialized transaction to the Torque API.
 * This function attempts to create a new publisher using the provided serialized transaction.
 * If successful, it returns the data containing the publisher's public key.
 *
 * @param client - An instance of `TorqueClient` used to perform API requests.
 * @param serializedTx - A base64 encoded string representing the serialized transaction.
 * @returns A promise that resolves to an object containing the publisher's public key if the API call is successful.
 * @throws Will throw an error if the API call fails or if the response status is not `SUCCESS`.
 */
export async function initPublisher(
  client: TorqueClient,
  serializedTx: string,
) {
  try {
    const serTx = base64ToUint8Array(serializedTx!);

    const publisher = await client.apiFetch(TORQUE_API_ROUTES.publishers, {
      method: "POST",
      body: JSON.stringify({ serializedTx: serTx }),
    });

    const result = (await publisher.json()) as unknown as ApiResponse<{
      publisherPubKey: string;
    }>;

    if (result.status === ApiStatus.SUCCESS) {
      return result.data;
    } else {
      throw new Error(result.message);
    }
  } catch (error) {
    console.error(error);
    throw new Error("There was an error creating the publisher.");
  }
}
