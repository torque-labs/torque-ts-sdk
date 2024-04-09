import * as anchor from "@coral-xyz/anchor";
import { Connection, PublicKey } from "@solana/web3.js";

export const getConnection = (rpc: string) => {
  return new Connection(rpc);
};

export const buildTokenAccounts = (
  token: PublicKey,
  senderPubkey: PublicKey,
  recieverPubkey: PublicKey
) => {
  if (token.toString() !== PublicKey.default.toString()) {
    const tokenMint = token;
    const senderTa = anchor.utils.token.associatedAddress({
      mint: token,
      owner: senderPubkey,
    });
    const recieverTa = anchor.utils.token.associatedAddress({
      mint: token,
      owner: recieverPubkey,
    });

    return {
      tokenMint,
      senderTa,
      recieverTa,
    };
  }

  throw new Error("Invalid Token Address.");
};

export function base64ToUint8Array(base64: string) {
  const binaryString = Buffer.from(base64, "base64").toString("binary");
  const len = binaryString.length;
  const bytes = new Uint8Array(len);

  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }

  return bytes;
}
export function uint8ArrayToBase64(bytes: Uint8Array) {
  const binary = bytes.reduce(
    (acc, byte) => acc + String.fromCharCode(byte),
    ""
  );

  return btoa(binary);
}
