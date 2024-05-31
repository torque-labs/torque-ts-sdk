import z from "zod";

import {
  CampaignCreateInputSchema,
  CampaignEndInputSchema,
  PublisherPayoutInputSchema,
  PublisherCreateInputSchema,
  TxnInputSchema,
  TxnExecuteSchema,
  TxnBuildResponseSchemas,
} from "../schemas";

export type CampaignCreateInput = z.infer<typeof CampaignCreateInputSchema>;
export type CampaignEndInput = z.infer<typeof CampaignEndInputSchema>;
export type PublisherPayoutInput = z.infer<typeof PublisherPayoutInputSchema>;
export type PublisherCreateInput = z.infer<typeof PublisherCreateInputSchema>;
export type TxnInput = z.infer<typeof TxnInputSchema>;
export type TxnExecute = z.infer<typeof TxnExecuteSchema>;
export type TxnExecuteResponse = { signature: string };
