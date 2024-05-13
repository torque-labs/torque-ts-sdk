import * as anchor from "@coral-xyz/anchor";
import { SignerWalletAdapter } from "@solana/wallet-adapter-base";
import {
  Connection,
  PublicKey,
  Transaction,
  clusterApiUrl,
} from "@solana/web3.js";

import {
  createPublisherIx,
  executeFrontendTx,
  findPublisherPda,
  payoutIx,
  torqueProgramId,
} from "./torque";
import TorqueIdl from "./idl.json";
import { SOLANA_NETWORK } from "../constants";
import { getMaxTransferableSol } from "../utils";

/**
 * Initiates the process for a wallet to become a publisher on the Solana blockchain using the Torque protocol.
 * This function prepares and sends a transaction that includes an instruction to create a publisher account.
 * It leverages the Anchor framework for interacting with the Solana blockchain.
 *
 * @param {SignerWalletAdapter} wallet - A `SignerWalletAdapter` instance representing the user's wallet.
 * @returns {Promise<Uint8Array>} A promise that resolves to a `Uint8Array` representing the serialized signed transaction. This serialized
 *          transaction can then be sent to the Solana blockchain for execution.
 * @throws {Error} An error if the wallet does not have a public key or if any part of the transaction preparation or
 *        sending process fails. The error message provides details about the failure.
 */
export async function becomeAPublisherTxn(wallet: SignerWalletAdapter) {
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

      return signedTx.serialize();
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
 * @returns A promise that resolves to the signature of the transaction execution, indicating the
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
