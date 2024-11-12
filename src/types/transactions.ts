import { Transaction, VersionedTransaction } from '@solana/web3.js';
import z from 'zod';

import {
  CampaignEndInputSchema,
  PublisherPayoutInputSchema,
  PublisherCreateInputSchema,
  TxnInputSchema,
  TxnExecuteSchema,
} from '../schemas/index.js';

/**
 * Campaign end input.
 */
export type CampaignEndInput = z.infer<typeof CampaignEndInputSchema>;

/**
 * Publisher payout input.
 */
export type PublisherPayoutInput = z.infer<typeof PublisherPayoutInputSchema>;

/**
 * Publisher create input.
 */
export type PublisherCreateInput = z.infer<typeof PublisherCreateInputSchema>;

/**
 * On-chain transaction build input
 */
export type TxnInput = z.infer<typeof TxnInputSchema>;

/**
 * On-chain transaction execute input.
 */
export type TxnExecute = z.infer<typeof TxnExecuteSchema>;

/**
 * On-chain transaction execute response.
 */
export type TxnExecuteResponse = { signature: string };

/**
 * Transaction result response
 */
export interface SignatureField {
  signature: string;
}

/**
 * Generic with signture type
 */
export type WithSignature<T> = T & SignatureField;

/**
 * Sign transaction function type
 */
export type SignTransaction = <T extends Transaction | VersionedTransaction>(
  transaction: T,
) => Promise<T>;
