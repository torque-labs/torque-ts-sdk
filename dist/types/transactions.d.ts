import z from 'zod';
import { CampaignCreateInputSchema, CampaignEndInputSchema, PublisherPayoutInputSchema, PublisherCreateInputSchema, TxnInputSchema, TxnSyncSchema } from '../schemas/index.js';
/**
 * Campaign create input.
 */
export type CampaignCreateInput = z.infer<typeof CampaignCreateInputSchema>;
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
 * On-chain transaction sync input.
 */
export type TxnSync = z.infer<typeof TxnSyncSchema>;
/**
 * On-chain transaction sync response.
 */
export type TxnSyncResponse = {
    status: string;
};
/**
 * Transaction result response
 */
interface SignatureField {
    signature: string;
    syncResult?: string;
}
export type WithSignature<T> = T & SignatureField;
export {};
//# sourceMappingURL=transactions.d.ts.map