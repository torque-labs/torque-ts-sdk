import { EventType } from '@torque-labs/torque-utils';
import z from 'zod';

import { ApiRewardType, ApiTxnTypes } from '../types/index.js';

export const AssymetricRewardInputSchema = z.object({
  tokenAddress: z.string(),
  amount: z.number(),
});

// TODO: Centralize schema definitions
export const CampaignCreateInputSchema = z.object({
  campaignName: z.string(),
  campaignType: z.string(),
  landingPage: z.string(),
  eventType: z.nativeEnum(EventType),
  eventProgramAddress: z.string().optional(),
  eventTokenAddress: z.string().optional(),
  publisherRewardType: z.nativeEnum(ApiRewardType),
  publisherTokenAddress: z.string().optional(),
  publisherPayoutPerConversion: z.number(),
  userRewardType: z.nativeEnum(ApiRewardType).optional(),
  userTokenAddress: z.string().optional(),
  userPayoutPerConversion: z.number().optional(),
  conversionCount: z.number().optional().nullable(),
  minAmount: z.number().optional().nullable(),
  proposal: z.string().optional().nullable(),
  startTime: z.number(),
  endTime: z.number(),
  audience: z.string().optional().nullable(),
  asymmetricRewards: z.array(AssymetricRewardInputSchema).optional().nullable(),
});

export const CampaignEndInputSchema = z.object({
  campaignId: z.string(),
});

export const PublisherPayoutInputSchema = z.object({
  token: z.string(),
  amount: z.number(),
});

export const PublisherCreateInputSchema = z.boolean();

export const TxnInputSchema = z.discriminatedUnion('txnType', [
  z.object({
    txnType: z.literal(ApiTxnTypes.CampaignCreate),
    data: CampaignCreateInputSchema,
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
