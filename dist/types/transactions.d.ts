import z from 'zod';
import { CampaignCreateInputSchema, CampaignEndInputSchema, PublisherPayoutInputSchema, PublisherCreateInputSchema, TxnInputSchema, TxnExecuteSchema } from '../schemas/index.js';
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
 * On-chain transaction execute input.
 */
export type TxnExecute = z.infer<typeof TxnExecuteSchema>;
/**
 * On-chain transaction execute response.
 */
export type TxnExecuteResponse = {
    signature: string;
};
//# sourceMappingURL=transactions.d.ts.map