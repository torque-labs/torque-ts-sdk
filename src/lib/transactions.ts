import { TORQUE_API_ROUTES } from "@/constants";
import { TorqueClient } from "@/client";
import {
  TxnInput,
  ApiTxnTypes,
  ApiResponse,
  TxnExecute,
  TxnExecuteResponse,
} from "@/types";
import { VersionedTransaction } from "@solana/web3.js";
import { base64ToUint8Array, uint8ArrayToBase64 } from "@/utils";
import { SignerWalletAdapter } from "@solana/wallet-adapter-base";
import { TorqueRequestClient } from "@/classes/request";

/**
 * Builds and returns a serialized transaction from the API based on the provided transaction input.
 *
 * @param {TorqueRequestClient} client - Instance of the Torque client.
 * @param {TxnInput} txnInput - The input object of the transaction to build.
 * @returns {Promise<T>} A promise that resolves with the serialized transaction and optinal extra data
 * @throws {Error} Throws an error if the API request is unsuccessful or if the API response status is not "SUCCESS".
 *                 The error message provides details about the reason for the request's failure.
 */
async function buildTransaction<T>(
  client: TorqueRequestClient,
  txnInput: TxnInput
) {
  const data = {
    ...(txnInput.txnType === ApiTxnTypes.CampaignCreate
      ? { createCampaign: txnInput.data }
      : {}),

    ...(txnInput.txnType === ApiTxnTypes.CampaignEnd
      ? { endCampaign: txnInput.data }
      : {}),

    ...(txnInput.txnType === ApiTxnTypes.PublisherCreate
      ? { createPublisher: txnInput.data }
      : {}),

    ...(txnInput.txnType === ApiTxnTypes.PublisherPayout
      ? { payoutPublisher: txnInput.data }
      : {}),
  };

  try {
    const txn = await client.apiFetch(TORQUE_API_ROUTES.transactions.build, {
      method: "POST",
      body: JSON.stringify({ ...data }),
    });

    return txn as T & { serializedTx: string };
  } catch (error) {
    console.error(error);

    throw new Error("Unable to prepare the transaction.");
  }
}

/**
 * Executes the serialized transaction using the API.
 *
 * @param {TorqueRequestClient} client - Instance of the Torque client.
 * @param {TxnExecute} txnExecuteInput - The input object of the transaction to execute.
 * @returns {Promise<TxnExecuteResponse>} A promise that resolves with the signature of the transaction.
 * @throws {Error} Throws an error if the API request is unsuccessful or if the API response status is not "SUCCESS".
 *                 The error message provides details about the reason for the request's failure.
 */
async function executeTransaction(
  client: TorqueRequestClient,
  txnExecuteInput: TxnExecute
) {
  const data = {
    ...(txnExecuteInput.txnType === ApiTxnTypes.CampaignCreate
      ? { createCampaign: txnExecuteInput.data }
      : {}),

    ...(txnExecuteInput.txnType === ApiTxnTypes.CampaignEnd
      ? { endCampaign: txnExecuteInput.data }
      : {}),

    ...(txnExecuteInput.txnType === ApiTxnTypes.PublisherCreate
      ? { createPublisher: txnExecuteInput.data }
      : {}),

    ...(txnExecuteInput.txnType === ApiTxnTypes.PublisherPayout
      ? { payoutPublisher: txnExecuteInput.data }
      : {}),
  };

  try {
    const txn = await client.apiFetch<TxnExecuteResponse>(
      TORQUE_API_ROUTES.transactions.execute,
      {
        method: "POST",
        body: JSON.stringify({ ...data }),
      }
    );

    return txn;
  } catch (error) {
    console.error(error);

    throw new Error("Unable to execute the transaction.");
  }
}

/**
 * Builds and executes the transaction using the Torque API.
 *
 * @param {TorqueRequestClient} client - Instance of the Torque client.
 * @param {SignerWalletAdapter} wallet - A `SignerWalletAdapter` instance representing the wallet that will be used to sign the transaction.
 * @param {TxnInput} txnInput - The input object of the transaction to process.
 *
 * @returns {Promise<string>} A promise that resolves with the signature of the transaction.
 */
export async function transaction<T>(
  client: TorqueRequestClient,
  wallet: SignerWalletAdapter,
  txnInput: TxnInput
) {
  try {
    const { serializedTx, ...rest } = await buildTransaction<T>(
      client,
      txnInput
    );

    const tx = VersionedTransaction.deserialize(
      base64ToUint8Array(serializedTx)
    );

    const signedTx = await wallet.signTransaction(tx);

    const userSignature = uint8ArrayToBase64(signedTx.signatures[0]);

    const executeInput = {
      txnType: txnInput.txnType,
      data: {
        userSignature,
        blockhash: tx.message.recentBlockhash,
        ...rest,
      },
    };

    const { signature } = await executeTransaction(client, executeInput);

    return { signature, ...rest };
  } catch (error) {
    console.error(error);

    throw new Error("The transaction was unable to be processed.");
  }
}
