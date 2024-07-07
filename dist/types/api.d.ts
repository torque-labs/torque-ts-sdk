import { SolanaSignInInput, SolanaSignInOutput } from '@solana/wallet-standard-features';
import { NftCollectionTradeAction, SwapAction } from '@torque-labs/torque-utils';
import { Audience } from './audience.js';
/**
 * The API response success type.
 */
export declare enum ApiStatus {
    SUCCESS = "SUCCESS",
    BAD_REQUEST = "BAD_REQUEST",
    NOT_AUTHORIZED = "NOT_AUTHORIZED",
    FORBIDDEN = "FORBIDDEN",
    NOT_FOUND = "NOT_FOUND",
    INTERNAL_ERROR = "INTERNAL_ERROR"
}
/**
 * On-chain event types for the API.
 */
export declare enum ApiEventType {
    CLICK = "CLICK",
    SWAP = "SWAP",
    NFT_COLLECTION_TRADE = "NFT_COLLECTION_TRADE"
}
/**
 * The rewards type of a campaign.
 */
export declare enum ApiRewardType {
    POINTS = "POINTS",
    TOKENS = "TOKENS",
    ASYMMETRIC_REWARDS = "ASYMMETRIC_REWARDS"
}
/**
 * Generic success response for the API.
 */
export type ApiResponseSuccess<T> = {
    status: ApiStatus.SUCCESS;
    data: T;
};
/**
 * Generic error response for the API.
 */
export type ApiResponseError = {
    status: Exclude<ApiStatus, ApiStatus.SUCCESS>;
    message: string;
};
/**
 * Generic response for an API request.
 */
export type ApiResponse<T> = ApiResponseSuccess<T> | ApiResponseError;
/**
 * Input login options for the API.
 */
export type ApiInputLogin = {
    authType: 'siws';
    pubKey: string;
    payload: {
        input: SolanaSignInInput;
        output: SolanaSignInOutput;
    };
} | {
    authType: 'basic';
    pubKey: string;
    payload: {
        input: string;
        output: string;
    };
};
/**
 * Campaign data.
 */
export type ApiCampaign = {
    type: string;
    status: string;
    id: string;
    pubKey: string;
    title: string;
    advertiserPubKey: string;
    startTime: Date;
    endTime: Date;
    totalConversions: number;
    remainingConversions: number;
    imageUrl?: string;
    description?: string;
    targetLink?: string;
    offerLink?: string;
    userRewardToken?: string;
    userRewardAmount?: number;
    publisherRewardToken?: string;
    publisherRewardAmount?: number;
    publisherRewardType?: string;
    asymmetricRewards: {
        tokenAddress: string;
        amount: number;
    }[];
    advertiser?: {
        profileImage?: string | null;
        twitter?: string | null;
        username?: string | null;
    };
    audiences: {
        id: string;
        title: string;
    }[];
};
/**
 * Audience data.
 */
export type ApiAudience = {
    id: string;
    title: string;
    config: object;
    description?: string;
    global: boolean;
};
/**
 * Share link data.
 */
export type ApiShare = {
    campaign: {
        id: string;
        title: string;
        type: string;
        targetLink?: string;
        startTime: Date;
        endTime: Date;
        advertiser: {
            username: string | null;
            twitter?: string | null;
            profileImage?: string | null;
        };
    };
    publisher: {
        username: string | null;
        twitter?: string | null;
        profileImage?: string | null;
    };
};
/**
 * A Torque user.
 */
export type ApiUser = {
    pubKey: string;
    username?: string;
    twitter?: string;
    profileImage?: string;
    isPublisher: boolean;
    publisherPubKey?: string | null;
    token: string;
};
/**
 * A verified Torque user.
 */
export type ApiVerifiedUser = ApiUser & {
    verified: boolean;
};
/**
 * Payload returned from the API as a sample payload for sign in.
 */
export type ApiIdentifyPayload = {
    payload: {
        statement: string;
        issuedAt: string;
        expirationTime: string;
    };
};
/**
 * An array of the user's share links.
 */
export type ApiLinks = {
    links: {
        campaignId: string;
        url: string;
    }[];
};
/**
 * Campaign leaderboard data.
 */
export type ApiCampaignLeaderboard = {
    campaignName: string;
    leaderboard: {
        user: string;
        profileImage?: string | null;
        conversions: number;
    }[];
};
/**
 * A user's journey data.
 */
export type ApiUserJourney = {
    campaignId: string;
    status: string;
};
/**
 * Raffle rewards data.
 */
export type ApiRaffleRewards = {
    winners: {
        userPubKey: string;
        amount: number;
        tokenAddress: string;
    }[];
};
/**
 * User Payout data.
 */
export type ApiUserPayout = {
    payouts: {
        amount: number;
        id: string;
        campaignId: string;
        userPubKey: string;
        tokenAddress: string;
        payoutTx: string | null;
        isRafflePayout: boolean;
        createdAt: Date;
    }[];
};
/**
 * Torque functions that require a wallet signature.
 */
export declare enum ApiTxnTypes {
    CampaignCreate = "CampaignCreate",
    CampaignEnd = "CampaignEnd",
    PublisherPayout = "PublisherPayout",
    PublisherCreate = "PublisherCreate"
}
/**
 * Swap action bounty step requirements.
 */
type OfferSwapAction = {
    type: ApiEventType.SWAP;
    eventConfig: SwapAction;
};
/**
 * NFT collection trade action bounty step requirements.
 */
type OfferNFTTradeAction = {
    type: ApiEventType.NFT_COLLECTION_TRADE;
    eventConfig: NftCollectionTradeAction;
};
/**
 * Full bounty step requirement type.
 */
export type ApiRequirement = OfferSwapAction | OfferNFTTradeAction;
/**
 * Campaign data with bounty steps.
 */
export type ApiBountySteps = {
    campaign: {
        type: string;
        status: string;
        id: string;
        pubKey: string;
        title: string;
        advertiserPubKey: string;
        startTime: Date;
        endTime: Date;
        totalConversions: number;
        remainingConversions: number;
        imageUrl?: string;
        description?: string;
        targetLink?: string;
        userRewardToken?: string;
        userRewardAmount: string;
        userRewardType: ApiRewardType;
        publisherRewardToken?: string;
        publisherRewardAmount?: number;
        publisherRewardType: ApiRewardType;
        asymmetricRewards: {
            tokenAddress: string;
            amount: string;
        }[];
        audiences: {
            id: string;
            title: string;
            config: Audience[];
        }[];
        requirements: ApiRequirement[];
    };
};
export {};
//# sourceMappingURL=api.d.ts.map