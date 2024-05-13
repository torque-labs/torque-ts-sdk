import * as anchor from "@coral-xyz/anchor";
import { Connection, PublicKey, clusterApiUrl } from "@solana/web3.js";

import { PUBLISHER_ACCOUNT_SIZE, SOLANA_NETWORK } from "./constants";

/**
 * Calculates the maximum amount of SOL that can be transferred from a given Program Derived Address (PDA),
 * taking into account the need to leave enough SOL in the account to cover rent exemption.
 *
 * @param {PublicKey} pda - The public key of the Program Derived Address from which SOL will be transferred.
 * @returns {Promise<number>} The maximum amount of SOL (in lamports) that can be transferred from the PDA.
 */
export async function getMaxTransferableSol(pda: PublicKey) {
  const connection = new Connection(clusterApiUrl(SOLANA_NETWORK));

  const balance = await connection.getBalance(pda);
  const rentExemptBalance = await connection.getMinimumBalanceForRentExemption(
    PUBLISHER_ACCOUNT_SIZE
  );

  const maxTransferable = balance - rentExemptBalance;
  return maxTransferable;
}

/**
 * Constructs the token accounts for a given token and sender/receiver public keys.
 * This function is useful for determining the associated token accounts that will be used
 * in token transfer operations. It checks if the provided token is not the default (null) token,
 * and if so, calculates the associated token accounts for both sender and receiver.
 *
 * @param {PublicKey} token - The public key of the token for which to build the accounts.
 * @param {PublicKey} senderPubkey - The public key of the sender's account.
 * @param {PublicKey} recieverPubkey - The public key of the receiver's account.
 * @returns An object containing the tokenMint, senderTa (sender's token account), and recieverTa (receiver's token account).
 *          If the token is the default token, all returned values will be null.
 */
export function buildTokenAccounts(
  token: PublicKey,
  senderPubkey: PublicKey,
  recieverPubkey: PublicKey
) {
  let tokenMint = null,
    senderTa = null,
    recieverTa = null;
  if (token.toString() !== PublicKey.default.toString()) {
    tokenMint = token;
    senderTa = anchor.utils.token.associatedAddress({
      mint: token,
      owner: senderPubkey,
    });
    recieverTa = anchor.utils.token.associatedAddress({
      mint: token,
      owner: recieverPubkey,
    });
  }

  return {
    tokenMint,
    senderTa,
    recieverTa,
  };
}

/**
 * Converts a JavaScript Date object to a Unix timestamp (number of seconds since 1970-01-01T00:00:00Z).
 *
 * @param {Date} date - The JavaScript Date object to be converted to a Unix timestamp.
 * @returns {number} The Unix timestamp as a number of seconds since 1970-01-01T00:00:00Z.
 */
export function dateToUnixTimestamp(date: Date) {
  return Math.floor(date.getTime());
}

/**
 * Converts a Base64-encoded string to a Uint8Array.
 *
 * @param {string} base64 - The Base64-encoded string to be converted to a Uint8Array.
 * @returns {Uint8Array} The Uint8Array representation of the input Base64 string.
 */
export function base64ToUint8Array(base64: string) {
  const binaryString = Buffer.from(base64, "base64").toString("binary");
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes;
}

/**
 * Converts a Uint8Array to a Base64-encoded string.
 *
 * @param {Uint8Array} bytes - The Uint8Array to be converted to a Base64-encoded string.
 * @returns {string} The Base64-encoded string representation of the input Uint8Array.
 */
export function uint8ArrayToBase64(bytes: Uint8Array) {
  const binary = bytes.reduce(
    (acc, byte) => acc + String.fromCharCode(byte),
    ""
  );
  return btoa(binary);
}
