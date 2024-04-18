import * as anchor from "@coral-xyz/anchor";
import { SignerWalletAdapter } from "@solana/wallet-adapter-base";
import {
  Connection,
  LAMPORTS_PER_SOL,
  PublicKey,
  Transaction,
  clusterApiUrl,
} from "@solana/web3.js";

import {
  createCampaignIx,
  createPublisherIx,
  endCampaignIx,
  executeFrontendTx,
  findCampaignPda,
  findPublisherPda,
  fundCampaignIx,
  payoutIx,
  torqueProgramId,
} from "./torque-program";
import TorqueIdl from "./torque-protocol.json";
import { createCampaign, endCampaign } from "../campaigns";
import { TorqueClient } from "../client";
import { SOLANA_NETWORK } from "../constants";
import { initPublisher } from "../publisher";
import { CreateCampaignInput } from "../types";
import {
  dateToUnixTimestamp,
  getMaxTransferableSol,
  uint8ArrayToBase64,
} from "../utils";

/**
 * Creates a new campaign transaction on the Solana blockchain using the Torque protocol.
 * This function prepares and sends a transaction that includes instructions for creating
 * a new campaign and funding it with tokens. It supports both SOL and custom SPL tokens
 * for payouts to publishers and users. The function also serializes the signed transaction
 * and sends it to a backend server for further processing.
 *
 * @param client - An instance of `TorqueClient` used to communicate with the backend server.
 * @param wallet - A `SignerWalletAdapter` instance representing the user's wallet.
 * @param data - An object containing input data for the campaign creation, including
 *               details like campaign type, name, reward information, and duration.
 * @returns A promise that resolves to the response from the backend server after
 *          the campaign creation transaction has been processed.
 * @throws Will throw an error if the wallet does not have a public key or if any
 *         part of the transaction preparation or sending process fails.
 */
export async function createCampaignTxn(
  client: TorqueClient,
  wallet: SignerWalletAdapter,
  data: CreateCampaignInput
) {
  if (wallet.publicKey) {
    try {
      const connection = new Connection(clusterApiUrl(SOLANA_NETWORK));

      const provider = new anchor.AnchorProvider(
        connection,
        wallet as unknown as anchor.Wallet,
        { preflightCommitment: "recent" }
      );

      const program = new anchor.Program(
        TorqueIdl as anchor.Idl,
        torqueProgramId,
        provider
      );

      const token = data.publisherTokenAddress || PublicKey.default.toString();

      const userToken = data.userTokenAddress || PublicKey.default.toString();

      if (
        data.publisherPayoutPerConversion &&
        data.publisherPayoutPerConversion > 0 &&
        token === PublicKey.default.toString()
      ) {
        data.publisherPayoutPerConversion =
          data.publisherPayoutPerConversion * LAMPORTS_PER_SOL;
      }

      if (
        data.userPayoutPerConversion &&
        data.userPayoutPerConversion > 0 &&
        userToken === PublicKey.default.toString()
      ) {
        data.userPayoutPerConversion =
          data.userPayoutPerConversion * LAMPORTS_PER_SOL;
      }

      // TODO: Support other token types: require decimal spots (eg. LAMPORTS_PER_SOL)

      const reward = {
        publisherToken: token ? new PublicKey(token) : PublicKey.default,
        userToken: userToken ? new PublicKey(userToken) : PublicKey.default,
        publisherAmount:
          data.publisherRewardType.toUpperCase() === "POINTS"
            ? 0
            : data.publisherPayoutPerConversion || 0,
        userAmount:
          data.userRewardType.toUpperCase() === "POINTS"
            ? 0
            : data.userPayoutPerConversion || 0,
        count: data.conversionCount || 0,
      };

      data.campaignType = data.campaignType === "Click" ? "CLICK" : "BOUNTY";

      const createIx = await createCampaignIx(
        program,
        wallet.publicKey,
        data.campaignType,
        data.campaignName,
        reward,
        [], // TODO: Add audience support
        Math.floor(dateToUnixTimestamp(new Date(data.startDate)) / 1000), // todo add startTime
        Math.floor(dateToUnixTimestamp(new Date(data.endDate)) / 1000) // todo add endTime
      );

      const fundIx = await fundCampaignIx(
        program,
        wallet.publicKey,
        findCampaignPda(
          program,
          wallet.publicKey,
          data.campaignType,
          data.campaignName
        ),
        new PublicKey(token),
        new PublicKey(userToken)
      );

      const tx = new Transaction();
      tx.add(createIx);
      tx.add(fundIx);

      const { blockhash } = await connection.getLatestBlockhash();
      tx.recentBlockhash = blockhash;
      tx.feePayer = wallet.publicKey;

      const signedTx = await wallet.signTransaction(tx);

      const base64String = uint8ArrayToBase64(signedTx.serialize());

      return await createCampaign(client, data, base64String);
    } catch (error: any) {
      throw new Error(error.toString());
    }
  } else {
    throw new Error("Wallet does not have a PublicKey.");
  }
}
/**
 * Initiates the process for a wallet to become a publisher on the Solana blockchain using the Torque protocol.
 * This function prepares and sends a transaction that includes an instruction to create a publisher account.
 * After the transaction is signed and serialized, it sends the serialized transaction to a backend server
 * for further processing.
 *
 * @param client - An instance of `TorqueClient` used to communicate with the backend server.
 * @param wallet - A `SignerWalletAdapter` instance representing the user's wallet.
 * @returns A promise that resolves to the response from the backend server after the publisher creation
 *          transaction has been processed.
 * @throws Will throw an error if the wallet does not have a public key or if any part of the transaction
 *         preparation or sending process fails.
 */
export async function becomeAPublisherTxn(
  client: TorqueClient,
  wallet: SignerWalletAdapter
) {
  if (wallet.publicKey) {
    try {
      const connection = new Connection(clusterApiUrl(SOLANA_NETWORK));

      const provider = new anchor.AnchorProvider(
        connection,
        wallet as unknown as anchor.Wallet,
        { preflightCommitment: "recent" }
      );

      const program = new anchor.Program(
        TorqueIdl as anchor.Idl,
        torqueProgramId,
        provider
      );

      const createIx = await createPublisherIx(program, wallet.publicKey);
      const tx = new Transaction();
      tx.add(createIx);

      const { blockhash } = await connection.getLatestBlockhash();
      tx.recentBlockhash = blockhash;
      tx.feePayer = wallet.publicKey;

      const signedTx = await wallet.signTransaction(tx);
      const base64String = uint8ArrayToBase64(signedTx.serialize());

      return await initPublisher(client, base64String);
    } catch (error: any) {
      throw new Error(error.toString());
    }
  } else {
    throw new Error("Wallet does not have a PublicKey.");
  }
}

/**
 * Executes a transaction to payout a publisher on the Solana blockchain using the Torque protocol.
 * This function calculates the maximum amount of SOL that can be transferred from the publisher's
 * account and creates a transaction to transfer that amount. The transaction is then signed and
 * executed. This is intended for publishers to withdraw their earnings.
 *
 * @param wallet - A `SignerWalletAdapter` instance representing the publisher's wallet. The wallet
 *                 must have a public key associated with it.
 * @returns A promise that resolves to the result of the transaction execution, indicating the
 *          success or failure of the payout operation.
 * @throws Will throw an error if the wallet does not have a public key or if any part of the
 *         transaction preparation or execution process fails.
 */
export async function payoutPublisherTxn(wallet: SignerWalletAdapter) {
  if (wallet.publicKey) {
    try {
      const connection = new Connection(
        clusterApiUrl(SOLANA_NETWORK),
        "confirmed"
      );

      const provider = new anchor.AnchorProvider(
        connection,
        wallet as unknown as anchor.Wallet,
        { preflightCommitment: "recent" }
      );

      const program = new anchor.Program(
        TorqueIdl as anchor.Idl,
        torqueProgramId,
        provider
      );

      const publisherPda = await findPublisherPda(program, wallet.publicKey);

      const maxLamports = await getMaxTransferableSol(publisherPda);

      const ix = await payoutIx(
        program,
        wallet.publicKey,
        PublicKey.default,
        maxLamports
      );

      return await executeFrontendTx(
        program,
        wallet as unknown as anchor.Wallet,
        new Transaction().add(ix)
      );
    } catch (error: any) {
      throw new Error(error.toString());
    }
  } else {
    throw new Error("Wallet does not have a PublicKey.");
  }
}

/**
 * Finalizes a campaign on the Solana blockchain using the Torque protocol. This function constructs
 * and sends a transaction that includes an instruction to end a specific campaign. The transaction
 * is signed by the campaign owner's wallet and then serialized to a base64 string, which is sent to
 * a backend server for further processing. This is intended for campaign owners to officially close
 * their campaigns and potentially trigger any finalization logic defined in the smart contract.
 *
 * @param client - An instance of `TorqueClient` used to communicate with the backend server.
 * @param wallet - A `SignerWalletAdapter` instance representing the campaign owner's wallet.
 * @param campaignId - A string identifier for the campaign to be ended.
 * @param campaignPubKey - The public key of the campaign as a string, used to identify the campaign on-chain.
 * @returns A promise that resolves to the response from the backend server after the campaign ending
 *          transaction has been processed.
 * @throws Will throw an error if the wallet does not have a public key or if any part of the transaction
 *         preparation or sending process fails.
 */
export async function finishCampaignTxn(
  client: TorqueClient,
  wallet: SignerWalletAdapter,
  campaignId: string,
  campaignPubKey: string
) {
  if (wallet.publicKey) {
    try {
      const connection = new Connection(
        clusterApiUrl(SOLANA_NETWORK),
        "confirmed"
      );

      const provider = new anchor.AnchorProvider(
        connection,
        wallet as unknown as anchor.Wallet,
        { preflightCommitment: "recent" }
      );

      const program = new anchor.Program(
        TorqueIdl as anchor.Idl,
        torqueProgramId,
        provider
      );

      const ix = await endCampaignIx(
        program,
        wallet.publicKey,
        new PublicKey(campaignPubKey)
      );

      const tx = new Transaction();
      tx.add(ix);

      const { blockhash } = await connection.getLatestBlockhash();
      tx.recentBlockhash = blockhash;
      tx.feePayer = wallet.publicKey;

      const signedTx = await wallet.signTransaction(tx);
      const base64String = uint8ArrayToBase64(signedTx.serialize());

      return await endCampaign(client, campaignId, base64String);
    } catch (error: any) {
      throw new Error(error.toString());
    }
  } else {
    throw new Error("Wallet does not have a PublicKey.");
  }
}
