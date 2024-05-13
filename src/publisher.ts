import { SignerWalletAdapter } from "@solana/wallet-adapter-base";
import { TorqueClient } from "./client";
import { TORQUE_API_ROUTES } from "./constants";
import {
  becomeAPublisherTxn,
  payoutPublisherTxn,
} from "./protocol/transactions";
import { ApiResponse, ApiStatus } from "./types";

/**
 * Initializes a publisher by sending a serialized transaction to the Torque API.
 * This function attempts to create a new publisher using the provided serialized transaction.
 * If successful, it returns the data containing the publisher's public key.
 *
 * @param {SignerWalletAdapter} wallet - A `SignerWalletAdapter` instance representing the user's wallet.
 * @returns {ApiResponse<{ publisherPubKey: string; }} A promise that resolves to an object containing the publisher's public key if the API call is successful.
 * @throws {Error} Will throw an error if the API call fails or if the response status is not `SUCCESS`.
 */
export async function initPublisher(
  this: TorqueClient,
  wallet: SignerWalletAdapter
) {
  try {
    const serializedTx = await becomeAPublisherTxn(wallet);

    const publisher = await this.apiFetch(TORQUE_API_ROUTES.publishers, {
      method: "POST",
      body: JSON.stringify({ serializedTx }),
    });

    const result = (await publisher.json()) as unknown as ApiResponse<{
      publisherPubKey: string;
    }>;

    if (result.status === ApiStatus.SUCCESS) {
      this.setUserPublisher(result.data.publisherPubKey);

      return result.data;
    } else {
      throw new Error(result.message);
    }
  } catch (error) {
    console.error(error);
    throw new Error("There was an error creating the publisher.");
  }
}

/**
 * Processes a payout to a publisher by sending a serialized transaction.
 * This function attempts to execute a payout transaction for the publisher using the provided wallet.
 * It leverages the `payoutPublisherTxn` function to create and send the transaction.
 *
 * @param {SignerWalletAdapter} wallet - A `SignerWalletAdapter` instance representing the user's wallet.
 * @returns {Promise<string>} A promise that resolves to a signature when the payout transaction has been successfully processed.
 * @throws {Error} Will throw an error if the transaction fails to process or if there's an issue with the transaction creation.
 */
export async function payoutPublisher(
  this: TorqueClient,
  wallet: SignerWalletAdapter
) {
  try {
    return await payoutPublisherTxn(wallet);
  } catch (error) {
    console.error(error);
    throw new Error("There was an error paying out the publisher.");
  }
}
