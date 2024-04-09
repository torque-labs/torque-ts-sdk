import * as anchor from "@coral-xyz/anchor";
import { TOKEN_PROGRAM_ID } from "@coral-xyz/anchor/dist/cjs/utils/token";
import { ASSOCIATED_TOKEN_PROGRAM_ID } from "@solana/spl-token";
import { PublicKey } from "@solana/web3.js";

import { buildTokenAccounts } from "../utils/protocol-utils";

export const torqueProgramId = new PublicKey(
  "DUUkE1kUpewmmVydySEFPMAErtQZLn561msfkYsqwDi2"
);

/**
 * PDAs
 */
export const findCampaignPda = (
  program: anchor.Program,
  authority: PublicKey,
  campaignType: string,
  name: string
) => {
  let [campaignPda] = PublicKey.findProgramAddressSync(
    [authority.toBuffer(), Buffer.from(campaignType), Buffer.from(name)],
    program.programId
  );
  return campaignPda;
};

export const findPublisherPda = (
  program: anchor.Program,
  authority: PublicKey
) => {
  let [publisherPda] = PublicKey.findProgramAddressSync(
    [Buffer.from("publisher"), authority.toBuffer()],
    program.programId
  );
  return publisherPda;
};

/**
 * PUBLISHER IXs
 */
export const fetchPublisher = async (
  program: anchor.Program,
  publisherPda: PublicKey
) => {
  return await program.account.publisher.fetch(publisherPda);
};

export const createPublisherIx = async (
  program: anchor.Program,
  signerPubkey: PublicKey
) => {
  const publisher = findPublisherPda(program, signerPubkey);
  return await program.methods
    .createPublisher()
    .accounts({
      authority: signerPubkey,
      publisher,
      systemProgram: anchor.web3.SystemProgram.programId,
    })
    .instruction();
};

export const payoutIx = async (
  program: anchor.Program,
  signerPubkey: PublicKey,
  token: PublicKey,
  amount: number
) => {
  const publisher = findPublisherPda(program, signerPubkey);

  if (token !== PublicKey.default) {
    const authorityTa = anchor.utils.token.associatedAddress({
      mint: token,
      owner: signerPubkey,
    });
    const publisherTa = anchor.utils.token.associatedAddress({
      mint: token,
      owner: publisher,
    });
    const rewardMint = token;

    return await program.methods
      .payout({
        token,
        amount: new anchor.BN(amount),
      })
      .accounts({
        authority: signerPubkey,
        authorityTa,
        publisher,
        publisherTa,
        rewardMint,
        systemProgram: anchor.web3.SystemProgram.programId,
        tokenProgram: TOKEN_PROGRAM_ID,
        associatedTokenProgram: ASSOCIATED_TOKEN_PROGRAM_ID,
      })
      .instruction();
  }
};

/**
 * CAMPAIGN IXs
 */
export const fetchCampaign = async (
  program: anchor.Program,
  campaignPda: PublicKey
) => {
  return await program.account.campaign.fetch(campaignPda);
};

export const createCampaignIx = async (
  program: anchor.Program,
  signerPubkey: PublicKey,
  campaignType: string,
  name: string,
  reward: {
    publisherToken: PublicKey;
    publisherAmount: number;
    count: number;
  },
  audiances: string[] = [],
  startTime: number,
  endTime: number
) => {
  const campaignPda = findCampaignPda(
    program,
    signerPubkey,
    campaignType,
    name
  );
  reward.publisherAmount = new anchor.BN(reward.publisherAmount);
  reward.count = new anchor.BN(reward.count);
  return await program.methods
    .createCampaign({
      name,
      campaignType,
      audiances,
      reward,
      startTime: new anchor.BN(startTime),
      endTime: new anchor.BN(endTime),
    })
    .accounts({
      authority: signerPubkey,
      campaign: campaignPda,
      systemProgram: anchor.web3.SystemProgram.programId,
    })
    .instruction();
};

export const fundCampaignIx = async (
  program: any,
  signerPubkey: PublicKey,
  campaignPda: PublicKey,
  token: PublicKey
) => {
  const {
    tokenMint: rewardMint,
    senderTa: authorityRewardTa,
    recieverTa: campaignRewardTa,
  } = buildTokenAccounts(token, signerPubkey, campaignPda);
  return await program.methods
    .fund()
    .accounts({
      authority: signerPubkey,
      campaign: campaignPda,
      authorityRewardTa,
      campaignRewardTa,
      rewardMint,
      systemProgram: anchor.web3.SystemProgram.programId,
      tokenProgram: TOKEN_PROGRAM_ID,
      associatedTokenProgram: ASSOCIATED_TOKEN_PROGRAM_ID,
    })
    .instruction();
};

export const endCampaignIx = async (
  program: anchor.Program,
  signerPubkey: PublicKey,
  campaignPda: PublicKey
) => {
  const campaign: any = await fetchCampaign(program, campaignPda);

  const {
    tokenMint: publisherRewardMint,
    senderTa: campaignPublisherRewardTa,
    recieverTa: authorityPublisherRewardTa,
  } = buildTokenAccounts(
    campaign.reward.publisherToken,
    signerPubkey,
    campaignPda
  );

  return await program.methods
    .endCampaign()
    .accounts({
      authority: signerPubkey,
      campaign: campaignPda,
      authorityPublisherRewardTa: authorityPublisherRewardTa ?? undefined,
      campaignPublisherRewardTa: campaignPublisherRewardTa ?? undefined,
      publisherRewardMint: publisherRewardMint!,
      systemProgram: anchor.web3.SystemProgram.programId,
      tokenProgram: TOKEN_PROGRAM_ID,
      associatedTokenProgram: ASSOCIATED_TOKEN_PROGRAM_ID,
    })
    .instruction();
};
