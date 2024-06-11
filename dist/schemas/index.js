"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TxnBuildResponseSchemas = exports.TxnExecuteSchema = exports.TxnInputSchema = exports.PublisherCreateInputSchema = exports.PublisherPayoutInputSchema = exports.CampaignEndInputSchema = exports.CampaignCreateInputSchema = void 0;
const zod_1 = __importDefault(require("zod"));
const index_1 = require("../types/index");
// TODO: Centralize schema definitions
exports.CampaignCreateInputSchema = zod_1.default.object({
    campaignName: zod_1.default.string(),
    campaignType: zod_1.default.string(),
    landingPage: zod_1.default.string(),
    eventType: zod_1.default.nativeEnum(index_1.ApiEventType),
    eventProgramAddress: zod_1.default.string().optional(),
    eventTokenAddress: zod_1.default.string().optional(),
    publisherRewardType: zod_1.default.nativeEnum(index_1.ApiRewardType),
    publisherTokenAddress: zod_1.default.string().optional(),
    publisherPayoutPerConversion: zod_1.default.number(),
    userRewardType: zod_1.default.nativeEnum(index_1.ApiRewardType).optional(),
    userTokenAddress: zod_1.default.string().optional(),
    userPayoutPerConversion: zod_1.default.number().optional(),
    conversionCount: zod_1.default.number().optional().nullable(),
    minAmount: zod_1.default.number().optional().nullable(),
    proposal: zod_1.default.string().optional().nullable(),
    startTime: zod_1.default.number(),
    endTime: zod_1.default.number(),
    audience: zod_1.default.string().optional().nullable(),
});
exports.CampaignEndInputSchema = zod_1.default.object({
    campaignId: zod_1.default.string(),
});
exports.PublisherPayoutInputSchema = zod_1.default.object({
    token: zod_1.default.string(),
    amount: zod_1.default.number(),
});
exports.PublisherCreateInputSchema = zod_1.default.boolean();
exports.TxnInputSchema = zod_1.default.discriminatedUnion('txnType', [
    zod_1.default.object({
        txnType: zod_1.default.literal(index_1.ApiTxnTypes.CampaignCreate),
        data: exports.CampaignCreateInputSchema,
    }),
    zod_1.default.object({
        txnType: zod_1.default.literal(index_1.ApiTxnTypes.CampaignEnd),
        data: exports.CampaignEndInputSchema,
    }),
    zod_1.default.object({
        txnType: zod_1.default.literal(index_1.ApiTxnTypes.PublisherCreate),
        data: exports.PublisherCreateInputSchema,
    }),
    zod_1.default.object({
        txnType: zod_1.default.literal(index_1.ApiTxnTypes.PublisherPayout),
        data: exports.PublisherPayoutInputSchema,
    }),
]);
const TxnExecuteDefaults = zod_1.default.object({
    userSignature: zod_1.default.string(),
    blockhash: zod_1.default.string(),
});
exports.TxnExecuteSchema = zod_1.default.discriminatedUnion('txnType', [
    zod_1.default.object({
        txnType: zod_1.default.enum([index_1.ApiTxnTypes.CampaignCreate, index_1.ApiTxnTypes.CampaignEnd]),
        data: TxnExecuteDefaults.extend({ campaignId: zod_1.default.string() }),
    }),
    zod_1.default.object({
        txnType: zod_1.default.string(),
        data: TxnExecuteDefaults,
    }),
]);
const TxnBuildResponseDefaults = zod_1.default.object({
    serializedTx: zod_1.default.string(),
});
exports.TxnBuildResponseSchemas = {
    campaign: TxnBuildResponseDefaults.extend({
        campaignId: zod_1.default.string(),
    }),
    default: TxnBuildResponseDefaults,
};
