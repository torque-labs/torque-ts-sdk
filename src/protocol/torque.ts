import * as anchor from "@coral-xyz/anchor";
import { TOKEN_PROGRAM_ID } from "@coral-xyz/anchor/dist/cjs/utils/token";
import { ASSOCIATED_TOKEN_PROGRAM_ID } from "@solana/spl-token";
import { PublicKey, Transaction, Commitment } from "@solana/web3.js";

import { TORQUE_PROGRAM_PUBKEY } from "../constants";

export const torqueProgramId = new PublicKey(TORQUE_PROGRAM_PUBKEY);

/**
 * Executes a transaction on the Solana blockchain from the frontend, using the provided wallet to sign the transaction.
 * This function handles the process of fetching the latest blockhash, setting the transaction's fee payer, signing the transaction,
 * sending it to the network, and confirming its execution based on the specified commitment level.
 *
 * @param program The Anchor program instance used to interact with the Solana blockchain.
 * @param wallet The wallet object that will sign the transaction. Must be compatible with Anchor's Wallet interface.
 * @param tx The Solana transaction to be executed. Must be constructed but not yet signed.
 * @param commitment (Optional) The commitment level for the transaction confirmation. Defaults to "confirmed".
 *                    This determines the level of certainty required for the transaction's confirmation.
 *                    Options are "processed", "confirmed", and "finalized".
 *
 * @returns A promise that resolves to the transaction signature as a string if the transaction is successfully confirmed.
 *          If the transaction fails, the promise rejects with an error containing the failure reason.
 * @throws Error if the transaction confirmation returns an error, indicating the transaction failed to execute as expected.
 */
export async function executeFrontendTx(
  program: anchor.Program,
  wallet: anchor.Wallet,
  tx: Transaction,
  commitment: Commitment = "confirmed"
) {
  const { blockhash, lastValidBlockHeight } =
    await program.provider.connection.getLatestBlockhash();

  tx.recentBlockhash = blockhash;
  tx.feePayer = wallet.publicKey;

  const signedTransaction = await wallet.signTransaction(tx);

  const signature = await program.provider.connection.sendRawTransaction(
    signedTransaction.serialize(),
    { skipPreflight: true }
  );

  const confirmStrategy = {
    blockhash,
    lastValidBlockHeight,
    signature: signature,
  };

  const confirmedSignature =
    await program.provider.connection.confirmTransaction(
      confirmStrategy,
      commitment
    );

  if (confirmedSignature.value.err) {
    throw new Error(confirmedSignature.value.err.toString());
  } else {
    return signature;
  }
}

/**
 * PDAs
 */

/**
 * Finds the Program Derived Address (PDA) for a campaign based on the given parameters.
 * PDAs are deterministic addresses used in Solana programs for various purposes, such as managing accounts in a permissionless way.
 * This function computes the PDA for a campaign by using the authority's public key, the campaign type, and the campaign name.
 *
 * @param program - The Anchor program instance. This is used to access the program ID against which the PDA is derived.
 * @param authority - The public key of the authority or owner of the campaign. This is part of the seed for generating the PDA.
 * @param campaignType - A string representing the type of the campaign. This is used as part of the seed in generating the PDA.
 * @param name - The name of the campaign. This is another component of the seed used in PDA generation.
 *
 * @returns The computed Program Derived Address (PDA) for the campaign as a PublicKey object.
 */
export function findCampaignPda(
  program: anchor.Program,
  authority: PublicKey,
  campaignType: string,
  name: string
) {
  const [campaignPda] = PublicKey.findProgramAddressSync(
    [authority.toBuffer(), Buffer.from(campaignType), Buffer.from(name)],
    program.programId
  );

  return campaignPda;
}

/**
 * Computes the Program Derived Address (PDA) for a publisher using the given authority's public key.
 * PDAs are deterministic addresses generated from a set of seeds and a program ID, allowing for the creation of addresses
 * that can be used for various program-specific purposes without requiring the private key of the address.
 * This function specifically generates a PDA for a publisher, which can be used to manage publisher-specific data or permissions
 * within a Solana program.
 *
 * @param program - The Anchor program instance. This is used to access the program ID against which the PDA is derived.
 * @param authority - The public key of the authority or owner associated with the publisher. This is used as one of the seeds
 *                    for generating the PDA.
 * @returns The computed Program Derived Address (PDA) for the publisher as a PublicKey object. This PDA can be used within
 *          the program for operations related to the publisher.
 */
export function findPublisherPda(
  program: anchor.Program,
  authority: PublicKey
) {
  const [publisherPda] = PublicKey.findProgramAddressSync(
    [Buffer.from("publisher"), authority.toBuffer()],
    program.programId
  );

  return publisherPda;
}

/**
 * FETCH ACCOUNTS
 */

/**
 * Fetches the details of a specific campaign from the Solana blockchain using its Program Derived Address (PDA).
 * This function utilizes the Anchor framework to interact with the blockchain and retrieve the campaign account data.
 *
 * @param program - The Anchor program instance used for blockchain interactions. It provides the necessary context
 *                  and methods to fetch account data.
 * @param campaignPda - The PublicKey representing the Program Derived Address of the campaign to fetch.
 *
 * @returns A promise that resolves to the campaign account data. If the campaign does not exist or the PDA is incorrect, the promise
 *          may reject or resolve to null.
 */
export async function fetchCampaign(
  program: anchor.Program,
  campaignPda: PublicKey
) {
  return await program.account.campaign.fetch(campaignPda);
}

/**
 * Fetches the details of a specific publisher from the Solana blockchain using its Program Derived Address (PDA).
 * This function leverages the Anchor framework to interact with the blockchain and retrieve the publisher account data.
 *
 * @param program - The Anchor program instance used for blockchain interactions. It provides the necessary context
 *                  and methods to fetch account data.
 * @param publisherPda - The PublicKey representing the Program Derived Address of the publisher to fetch.
 *
 * @returns A promise that resolves to the publisher account data. If the publisher does not exist or the PDA is incorrect, the promise
 *          may reject or resolve to null.
 */
export async function fetchPublisher(
  program: anchor.Program,
  publisherPda: PublicKey
) {
  return await program.account.publisher.fetch(publisherPda);
}

/**
 * PUBLISHER IXs
 */

/**
 * Creates an instruction for the `createPublisher` method within the Solana program.
 * This function is designed to generate the necessary instruction to create a new publisher account
 * on the Solana blockchain using the Anchor framework. The publisher account is identified by a
 * Program Derived Address (PDA) which is calculated based on the signer's public key.
 *
 * @param program - The Anchor program instance used to interact with the Solana blockchain.
 *                  This provides the context and methods necessary to construct the instruction.
 * @param signerPubkey - The public key of the signer who will be the authority of the new publisher account.
 *                       This public key is used as part of the seed to generate the PDA for the publisher account.
 *
 * @returns A promise that resolves to the instruction for creating a new publisher account.
 *          This instruction can then be included in a transaction to be signed and sent to the blockchain.
 */
export async function createPublisherIx(
  program: anchor.Program,
  signerPubkey: PublicKey
) {
  const publisher = findPublisherPda(program, signerPubkey);

  return await program.methods
    .createPublisher()
    .accounts({
      authority: signerPubkey,
      publisher,
      systemProgram: anchor.web3.SystemProgram.programId,
    })
    .instruction();
}

/**
 * Generates an instruction for executing a payout operation within the Solana program.
 * This function creates an instruction to distribute tokens from a publisher to another account,
 * utilizing the Anchor framework for interaction with the Solana blockchain. The payout operation
 * requires specifying the token to be distributed, the amount, and the publisher initiating the payout.
 *
 * @param program - The Anchor program instance used to interact with the Solana blockchain.
 *                  This provides the context and methods necessary to construct the instruction.
 * @param signerPubkey - The public key of the signer who is the authority of the publisher account.
 *                       This public key is used to identify the publisher account from which the payout
 *                       will be initiated.
 * @param token - The public key of the token to be distributed in the payout.
 * @param amount - The amount of tokens to be distributed in the payout. This is a numeric value.
 *
 * @returns A promise that resolves to the instruction for executing the payout operation.
 *          This instruction can then be included in a transaction to be signed and sent to the blockchain.
 */
export async function payoutIx(
  program: anchor.Program,
  signerPubkey: PublicKey,
  token: PublicKey,
  amount: number
) {
  const publisher = findPublisherPda(program, signerPubkey);

  return await program.methods
    .payout({
      token,
      amount: new anchor.BN(amount),
    })
    .accounts({
      authority: signerPubkey,
      publisher,
      systemProgram: anchor.web3.SystemProgram.programId,
      tokenProgram: TOKEN_PROGRAM_ID,
      associatedTokenProgram: ASSOCIATED_TOKEN_PROGRAM_ID,
      // @ts-ignore
      authorityTa: null,
      // @ts-ignore
      publisherTa: null,
      // @ts-ignore
      rewardMint: null,
    })
    .instruction();
}
