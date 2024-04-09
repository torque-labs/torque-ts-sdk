import * as anchor from "@coral-xyz/anchor";
import {
  Connection,
  LAMPORTS_PER_SOL,
  PublicKey,
  Transaction,
} from "@solana/web3.js";

import {
  createCampaignIx,
  findCampaignPda,
  fundCampaignIx,
  torqueProgramId,
} from "./protocol";
import { createCampaign } from "../campaigns";
import TorqueIdl from "../idl/torque.json";
import { CreateCampaignData } from "../types";
import { dateToUnixTimestamp } from "../utils/api-utils";
import { getConnection, uint8ArrayToBase64 } from "../utils/protocol-utils";

export const buildCampaignTx = async (
  rpc: string,
  wallet: anchor.Wallet,
  formData: CreateCampaignData,
) => {
  const connection = getConnection(rpc);

  const provider = new anchor.AnchorProvider(
    connection as unknown as Connection,
    wallet,
    { preflightCommitment: "recent" },
  );

  const program = new anchor.Program(
    TorqueIdl as anchor.Idl,
    torqueProgramId,
    provider,
  );

  const token = formData.publisherTokenAddress || PublicKey.default.toString();
  if (
    formData.publisherPayoutPerConversion &&
    formData.publisherPayoutPerConversion > 0 &&
    token === PublicKey.default.toString()
  ) {
    formData.publisherPayoutPerConversion =
      formData.publisherPayoutPerConversion * LAMPORTS_PER_SOL;
  }

  const reward = {
    publisherToken: token ? new PublicKey(token) : PublicKey.default,
    publisherAmount:
      formData.publisherRewardType === "Points"
        ? 0
        : formData.publisherPayoutPerConversion || 0,
    count: formData.conversionCount || 0,
  };
  formData.campaignType =
    formData.campaignType === "Click" ? "CLICK" : "BOUNTY";

  const createIx = await createCampaignIx(
    program,
    wallet.publicKey,
    formData.campaignType,
    formData.campaignName!,
    reward,
    formData.audience && formData.audience !== "none"
      ? [formData.audience]
      : [],
    Math.floor(dateToUnixTimestamp(new Date(formData.startDate!)) / 1000), // todo add startTime
    Math.floor(dateToUnixTimestamp(new Date(formData.endDate!)) / 1000), // todo add endTime
  );

  const fundIx = await fundCampaignIx(
    program,
    wallet.publicKey,
    findCampaignPda(
      program,
      wallet.publicKey,
      formData.campaignType,
      formData.campaignName,
    ),
    new PublicKey(token),
  );

  const tx = new Transaction();
  tx.add(createIx);
  tx.add(fundIx);

  const { blockhash } = await connection.getLatestBlockhash();
  tx.recentBlockhash = blockhash;
  tx.feePayer = wallet.publicKey;

  const signedTx = await wallet.signTransaction(tx);

  const base64String = uint8ArrayToBase64(signedTx.serialize());

  const campaign = await createCampaign(
    formData,
    wallet.publicKey.toString(),
    base64String,
  );

  return campaign;
};
