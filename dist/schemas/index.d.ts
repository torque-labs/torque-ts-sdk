import z from 'zod';
import { ApiEventType, ApiRewardType, ApiTxnTypes } from '../types/index.js';
export declare const CampaignCreateInputSchema: z.ZodObject<{
    campaignName: z.ZodString;
    campaignType: z.ZodString;
    landingPage: z.ZodString;
    eventType: z.ZodNativeEnum<typeof ApiEventType>;
    eventProgramAddress: z.ZodOptional<z.ZodString>;
    eventTokenAddress: z.ZodOptional<z.ZodString>;
    publisherRewardType: z.ZodNativeEnum<typeof ApiRewardType>;
    publisherTokenAddress: z.ZodOptional<z.ZodString>;
    publisherPayoutPerConversion: z.ZodNumber;
    userRewardType: z.ZodOptional<z.ZodNativeEnum<typeof ApiRewardType>>;
    userTokenAddress: z.ZodOptional<z.ZodString>;
    userPayoutPerConversion: z.ZodOptional<z.ZodNumber>;
    conversionCount: z.ZodNullable<z.ZodOptional<z.ZodNumber>>;
    minAmount: z.ZodNullable<z.ZodOptional<z.ZodNumber>>;
    proposal: z.ZodNullable<z.ZodOptional<z.ZodString>>;
    startTime: z.ZodNumber;
    endTime: z.ZodNumber;
    audience: z.ZodNullable<z.ZodOptional<z.ZodString>>;
}, "strip", z.ZodTypeAny, {
    campaignName: string;
    campaignType: string;
    landingPage: string;
    eventType: ApiEventType;
    publisherRewardType: ApiRewardType;
    publisherPayoutPerConversion: number;
    startTime: number;
    endTime: number;
    eventProgramAddress?: string | undefined;
    eventTokenAddress?: string | undefined;
    publisherTokenAddress?: string | undefined;
    userRewardType?: ApiRewardType | undefined;
    userTokenAddress?: string | undefined;
    userPayoutPerConversion?: number | undefined;
    conversionCount?: number | null | undefined;
    minAmount?: number | null | undefined;
    proposal?: string | null | undefined;
    audience?: string | null | undefined;
}, {
    campaignName: string;
    campaignType: string;
    landingPage: string;
    eventType: ApiEventType;
    publisherRewardType: ApiRewardType;
    publisherPayoutPerConversion: number;
    startTime: number;
    endTime: number;
    eventProgramAddress?: string | undefined;
    eventTokenAddress?: string | undefined;
    publisherTokenAddress?: string | undefined;
    userRewardType?: ApiRewardType | undefined;
    userTokenAddress?: string | undefined;
    userPayoutPerConversion?: number | undefined;
    conversionCount?: number | null | undefined;
    minAmount?: number | null | undefined;
    proposal?: string | null | undefined;
    audience?: string | null | undefined;
}>;
export declare const CampaignEndInputSchema: z.ZodObject<{
    campaignId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    campaignId: string;
}, {
    campaignId: string;
}>;
export declare const PublisherPayoutInputSchema: z.ZodObject<{
    token: z.ZodString;
    amount: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    token: string;
    amount: number;
}, {
    token: string;
    amount: number;
}>;
export declare const PublisherCreateInputSchema: z.ZodBoolean;
export declare const TxnInputSchema: z.ZodDiscriminatedUnion<"txnType", [z.ZodObject<{
    txnType: z.ZodLiteral<ApiTxnTypes.CampaignCreate>;
    data: z.ZodObject<{
        campaignName: z.ZodString;
        campaignType: z.ZodString;
        landingPage: z.ZodString;
        eventType: z.ZodNativeEnum<typeof ApiEventType>;
        eventProgramAddress: z.ZodOptional<z.ZodString>;
        eventTokenAddress: z.ZodOptional<z.ZodString>;
        publisherRewardType: z.ZodNativeEnum<typeof ApiRewardType>;
        publisherTokenAddress: z.ZodOptional<z.ZodString>;
        publisherPayoutPerConversion: z.ZodNumber;
        userRewardType: z.ZodOptional<z.ZodNativeEnum<typeof ApiRewardType>>;
        userTokenAddress: z.ZodOptional<z.ZodString>;
        userPayoutPerConversion: z.ZodOptional<z.ZodNumber>;
        conversionCount: z.ZodNullable<z.ZodOptional<z.ZodNumber>>;
        minAmount: z.ZodNullable<z.ZodOptional<z.ZodNumber>>;
        proposal: z.ZodNullable<z.ZodOptional<z.ZodString>>;
        startTime: z.ZodNumber;
        endTime: z.ZodNumber;
        audience: z.ZodNullable<z.ZodOptional<z.ZodString>>;
    }, "strip", z.ZodTypeAny, {
        campaignName: string;
        campaignType: string;
        landingPage: string;
        eventType: ApiEventType;
        publisherRewardType: ApiRewardType;
        publisherPayoutPerConversion: number;
        startTime: number;
        endTime: number;
        eventProgramAddress?: string | undefined;
        eventTokenAddress?: string | undefined;
        publisherTokenAddress?: string | undefined;
        userRewardType?: ApiRewardType | undefined;
        userTokenAddress?: string | undefined;
        userPayoutPerConversion?: number | undefined;
        conversionCount?: number | null | undefined;
        minAmount?: number | null | undefined;
        proposal?: string | null | undefined;
        audience?: string | null | undefined;
    }, {
        campaignName: string;
        campaignType: string;
        landingPage: string;
        eventType: ApiEventType;
        publisherRewardType: ApiRewardType;
        publisherPayoutPerConversion: number;
        startTime: number;
        endTime: number;
        eventProgramAddress?: string | undefined;
        eventTokenAddress?: string | undefined;
        publisherTokenAddress?: string | undefined;
        userRewardType?: ApiRewardType | undefined;
        userTokenAddress?: string | undefined;
        userPayoutPerConversion?: number | undefined;
        conversionCount?: number | null | undefined;
        minAmount?: number | null | undefined;
        proposal?: string | null | undefined;
        audience?: string | null | undefined;
    }>;
}, "strip", z.ZodTypeAny, {
    txnType: ApiTxnTypes.CampaignCreate;
    data: {
        campaignName: string;
        campaignType: string;
        landingPage: string;
        eventType: ApiEventType;
        publisherRewardType: ApiRewardType;
        publisherPayoutPerConversion: number;
        startTime: number;
        endTime: number;
        eventProgramAddress?: string | undefined;
        eventTokenAddress?: string | undefined;
        publisherTokenAddress?: string | undefined;
        userRewardType?: ApiRewardType | undefined;
        userTokenAddress?: string | undefined;
        userPayoutPerConversion?: number | undefined;
        conversionCount?: number | null | undefined;
        minAmount?: number | null | undefined;
        proposal?: string | null | undefined;
        audience?: string | null | undefined;
    };
}, {
    txnType: ApiTxnTypes.CampaignCreate;
    data: {
        campaignName: string;
        campaignType: string;
        landingPage: string;
        eventType: ApiEventType;
        publisherRewardType: ApiRewardType;
        publisherPayoutPerConversion: number;
        startTime: number;
        endTime: number;
        eventProgramAddress?: string | undefined;
        eventTokenAddress?: string | undefined;
        publisherTokenAddress?: string | undefined;
        userRewardType?: ApiRewardType | undefined;
        userTokenAddress?: string | undefined;
        userPayoutPerConversion?: number | undefined;
        conversionCount?: number | null | undefined;
        minAmount?: number | null | undefined;
        proposal?: string | null | undefined;
        audience?: string | null | undefined;
    };
}>, z.ZodObject<{
    txnType: z.ZodLiteral<ApiTxnTypes.CampaignEnd>;
    data: z.ZodObject<{
        campaignId: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        campaignId: string;
    }, {
        campaignId: string;
    }>;
}, "strip", z.ZodTypeAny, {
    txnType: ApiTxnTypes.CampaignEnd;
    data: {
        campaignId: string;
    };
}, {
    txnType: ApiTxnTypes.CampaignEnd;
    data: {
        campaignId: string;
    };
}>, z.ZodObject<{
    txnType: z.ZodLiteral<ApiTxnTypes.PublisherCreate>;
    data: z.ZodBoolean;
}, "strip", z.ZodTypeAny, {
    txnType: ApiTxnTypes.PublisherCreate;
    data: boolean;
}, {
    txnType: ApiTxnTypes.PublisherCreate;
    data: boolean;
}>, z.ZodObject<{
    txnType: z.ZodLiteral<ApiTxnTypes.PublisherPayout>;
    data: z.ZodObject<{
        token: z.ZodString;
        amount: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        token: string;
        amount: number;
    }, {
        token: string;
        amount: number;
    }>;
}, "strip", z.ZodTypeAny, {
    txnType: ApiTxnTypes.PublisherPayout;
    data: {
        token: string;
        amount: number;
    };
}, {
    txnType: ApiTxnTypes.PublisherPayout;
    data: {
        token: string;
        amount: number;
    };
}>]>;
export declare const TxnExecuteSchema: z.ZodDiscriminatedUnion<"txnType", [z.ZodObject<{
    txnType: z.ZodEnum<[ApiTxnTypes.CampaignCreate, ApiTxnTypes.CampaignEnd]>;
    data: z.ZodObject<z.objectUtil.extendShape<{
        userSignature: z.ZodString;
        blockhash: z.ZodString;
    }, {
        campaignId: z.ZodString;
    }>, "strip", z.ZodTypeAny, {
        campaignId: string;
        userSignature: string;
        blockhash: string;
    }, {
        campaignId: string;
        userSignature: string;
        blockhash: string;
    }>;
}, "strip", z.ZodTypeAny, {
    txnType: ApiTxnTypes.CampaignCreate | ApiTxnTypes.CampaignEnd;
    data: {
        campaignId: string;
        userSignature: string;
        blockhash: string;
    };
}, {
    txnType: ApiTxnTypes.CampaignCreate | ApiTxnTypes.CampaignEnd;
    data: {
        campaignId: string;
        userSignature: string;
        blockhash: string;
    };
}>, z.ZodObject<{
    txnType: z.ZodString;
    data: z.ZodObject<{
        userSignature: z.ZodString;
        blockhash: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        userSignature: string;
        blockhash: string;
    }, {
        userSignature: string;
        blockhash: string;
    }>;
}, "strip", z.ZodTypeAny, {
    txnType: string;
    data: {
        userSignature: string;
        blockhash: string;
    };
}, {
    txnType: string;
    data: {
        userSignature: string;
        blockhash: string;
    };
}>]>;
export declare const TxnBuildResponseSchemas: {
    campaign: z.ZodObject<z.objectUtil.extendShape<{
        serializedTx: z.ZodString;
    }, {
        campaignId: z.ZodString;
    }>, "strip", z.ZodTypeAny, {
        campaignId: string;
        serializedTx: string;
    }, {
        campaignId: string;
        serializedTx: string;
    }>;
    default: z.ZodObject<{
        serializedTx: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        serializedTx: string;
    }, {
        serializedTx: string;
    }>;
};
/**
 * Audience schemas
 */
export declare const audienceCreateInputSchema: z.ZodObject<{
    config: z.ZodAny;
    title: z.ZodString;
    description: z.ZodNullable<z.ZodOptional<z.ZodString>>;
    global: z.ZodBoolean;
}, "strip", z.ZodTypeAny, {
    title: string;
    global: boolean;
    config?: any;
    description?: string | null | undefined;
}, {
    title: string;
    global: boolean;
    config?: any;
    description?: string | null | undefined;
}>;
//# sourceMappingURL=index.d.ts.map