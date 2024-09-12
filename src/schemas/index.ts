import { CreateCampaignInputSchema, CreateTarpInputSchema } from '@torque-labs/torque-utils';
import z from 'zod';

import { ApiTxnTypes } from '../types/index.js';

export const CampaignEndInputSchema = z.object({
  campaignId: z.string(),
});

export const TarpEndInputSchema = z.object({
  tarpId: z.string(),
});
export type TarpEndInput = z.infer<typeof TarpEndInputSchema>;

export const PublisherPayoutInputSchema = z.object({
  token: z.string(),
  amount: z.number(),
});

export const PublisherCreateInputSchema = z.boolean();

export const TxnInputSchema = z.discriminatedUnion('txnType', [
  z.object({
    txnType: z.literal(ApiTxnTypes.CampaignCreate),
    data: CreateCampaignInputSchema,
  }),
  z.object({
    txnType: z.literal(ApiTxnTypes.CampaignEnd),
    data: CampaignEndInputSchema,
  }),
  z.object({
    txnType: z.literal(ApiTxnTypes.PublisherCreate),
    data: PublisherCreateInputSchema,
  }),
  z.object({
    txnType: z.literal(ApiTxnTypes.PublisherPayout),
    data: PublisherPayoutInputSchema,
  }),
  z.object({
    txnType: z.literal(ApiTxnTypes.TarpCreate),
    data: CreateTarpInputSchema,
  }),
  z.object({
    txnType: z.literal(ApiTxnTypes.TarpEnd),
    data: TarpEndInputSchema,
  }),
]);

const TxnExecuteDefaults = z.object({
  userSignature: z.string(),
  blockhash: z.string(),
});

export const TxnExecuteSchema = z.discriminatedUnion('txnType', [
  z.object({
    txnType: z.enum([ApiTxnTypes.CampaignCreate, ApiTxnTypes.CampaignEnd]),
    data: TxnExecuteDefaults.extend({ campaignId: z.string() }),
  }),
  z.object({
    txnType: z.string(),
    data: TxnExecuteDefaults,
  }),
]);

const TxnBuildResponseDefaults = z.object({
  serializedTx: z.string(),
});

export const TxnBuildResponseSchemas = {
  campaign: TxnBuildResponseDefaults.extend({
    campaignId: z.string(),
  }),
  default: TxnBuildResponseDefaults,
};

/**
 * Audience schemas
 */
export const audienceCreateInputSchema = z.object({
  config: z.any(),
  title: z.string().max(25),
  description: z.string().optional().nullable(),
  global: z.boolean(),
});
