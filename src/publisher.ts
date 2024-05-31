import { SignerWalletAdapter } from "@solana/wallet-adapter-base";

import { TorqueClient } from "./client";
import { ApiTxnTypes } from "./types";
import { transaction } from "./transactions";

/**
 * Initialize a publisher account for the wallet passed.
 * If successful, it returns the signature of the transaction.
 *
 * @param {SignerWalletAdapter} wallet - A `SignerWalletAdapter` instance representing the user's wallet.
 * @returns {Promise<string>} A promise that resolves to the signature of the transaction.
 * @throws {Error} Will throw an error if the API call fails.
 */
export async function initPublisher(
  client: TorqueClient,
  wallet: SignerWalletAdapter
) {
  try {
    const signature = await transaction(client, wallet, {
      txnType: ApiTxnTypes.PublisherCreate,
      data: true,
    });

    const user = await client.getUser();

    if (user.isPublisher && user.publisherPubKey) {
      client.setUserPublisher(user.publisherPubKey);
    }

    return signature;
  } catch (error) {
    console.error(error);
    throw new Error("There was an error creating the publisher.");
  }
}

/**
 * Processes a payout to a publisher.
 * If successful, it returns the signature of the transaction.
 *
 * @param {SignerWalletAdapter} wallet - A `SignerWalletAdapter` instance representing the user's wallet.
 * @returns {Promise<string>} A promise that resolves to a signature when the payout transaction has been successfully processed.
 * @throws {Error} Will throw an error if the transaction fails.
 */
export async function payoutPublisher(
  this: TorqueClient,
  wallet: SignerWalletAdapter,
  data: { token: string; amount: number }
) {
  try {
    const signature = await transaction(this, wallet, {
      txnType: ApiTxnTypes.PublisherPayout,
      data,
    });

    return signature;
  } catch (error) {
    console.error(error);
    throw new Error("There was an error paying out the publisher.");
  }
}
