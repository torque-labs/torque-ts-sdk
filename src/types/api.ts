import { SolanaSignInInput, SolanaSignInOutput } from '@solana/wallet-standard-features';
import {
  NftCollectionTradeAction,
  SwapAction,
  HedgehogPlaceBetAction,
  ClickAction,
  EventType,
  SignUpAction,
  AsymmetricReward,
  TensorAction,
} from '@torque-labs/torque-utils';

import { Audience } from './audience.js';

/**
 * The API response success type.
 */
export enum ApiStatus {
  SUCCESS = 'SUCCESS',
  BAD_REQUEST = 'BAD_REQUEST',
  NOT_AUTHORIZED = 'NOT_AUTHORIZED',
  FORBIDDEN = 'FORBIDDEN',
  NOT_FOUND = 'NOT_FOUND',
  INTERNAL_ERROR = 'INTERNAL_ERROR',
}

/**
 * The rewards type of a campaign.
 */
export enum ApiRewardType {
  POINTS = 'POINTS',
  TOKENS = 'TOKENS',
  ASYMMETRIC_REWARDS = 'ASYMMETRIC_REWARDS',
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
export type ApiInputLogin =
  | {
      authType: 'siws';
      pubKey: string;
      payload: {
        input: SolanaSignInInput;
        output: SolanaSignInOutput;
      };
    }
  | {
      authType: 'basic';
      pubKey: string;
      payload: { input: string; output: string };
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
  advertiser?: {
    profileImage?: string | null;
    twitter?: string | null;
    username?: string | null;
  };
  startTime: Date;
  endTime: Date;
  totalConversions: number;
  remainingConversions: number;
  imageUrl?: string;
  description?: string;
  content?: string;
  targetLink?: string;
  offerLink?: string;
  blinkOnly?: boolean;
  userRewardToken?: string;
  userRewardAmount?: string;
  userRewardType?: ApiRewardType;
  publisherRewardToken?: string;
  publisherRewardAmount?: string;
  publisherRewardType?: ApiRewardType;
  asymmetricRewards: AsymmetricReward[];
  audiences: {
    id: string;
    title: string;
    config: Audience[];
  }[];
  requirements: ApiRequirement[];
  userPayouts?: {
    user: {
      pubkey: string;
      username?: string | null;
      twitter?: string | null;
      profileImage?: string | null;
    };
    payoutTx?: string | null;
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
    imageUrl?: string;
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
 * Campaign journey progress status.
 */
export enum ApiProgressStatus {
  STARTED = 'STARTED',
  DONE = 'DONE',
  EXPIRED = 'EXPIRED',
  INVALID = 'INVALID',
}

/**
 * A user's campaign journey data.
 */
export type ApiCampaignJourney = {
  campaignId: string;
  userPubKey: string;
  totalSteps: number;
  currentStep: number;
  status: ApiProgressStatus;
  transaction?: string;
  publisherPubKey: string;
  campaign: ApiCampaign;
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
    campaign: ApiCampaign;
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
export enum ApiTxnTypes {
  CampaignCreate = 'CampaignCreate',
  CampaignEnd = 'CampaignEnd',
  PublisherPayout = 'PublisherPayout',
  PublisherCreate = 'PublisherCreate',
}

/**
 * Click action bounty step requirements.
 */
type OfferClickAction = {
  type: EventType.CLICK;
  eventConfig: ClickAction;
};

/**
 * Swap action bounty step requirements.
 */
type OfferSwapAction = {
  type: EventType.SWAP;
  eventConfig: SwapAction;
};

/**
 * NFT collection trade action bounty step requirements.
 */
type OfferNFTTradeAction = {
  type: EventType.NFT_COLLECTION_TRADE;
  eventConfig: NftCollectionTradeAction;
};

/**
 * Hedgehog bet action bounty step requirements.
 */
type OfferHedgehogBetAction = {
  type: EventType.HEDGEHOG_PLACE_BET;
  eventConfig: HedgehogPlaceBetAction;
};

/**
 * Sign up action bounty step requirements.
 */
type OfferSignUpAction = {
  type: EventType.SIGN_UP;
  eventConfig: SignUpAction; // TODO: fix sign up action type to use schema with email
};

/**
 * Tensor buy action bounty step requirements.
 */
type OfferTensorBuyAction = {
  type: EventType.TENSOR_BUY;
  eventConfig: TensorAction;
};

/**
 * Tensor bid action bounty step requirements.
 */
type OfferTensorBidAction = {
  type: EventType.TENSOR_BID;
  eventConfig: TensorAction;
};

/**
 * Full bounty step requirement type.
 */
export type ApiRequirement =
  | OfferSwapAction
  | OfferNFTTradeAction
  | OfferHedgehogBetAction
  | OfferClickAction
  | OfferSignUpAction
  | OfferTensorBuyAction
  | OfferTensorBidAction;
