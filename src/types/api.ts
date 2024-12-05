import { SolanaSignInInput, SolanaSignInOutput } from '@solana/wallet-standard-features';
import {
  NftCollectionTradeAction,
  SwapAction,
  ClickAction,
  EventType,
  MemoAction,
  AsymmetricReward,
  TensorAction,
  NftBidBuyAction,
  TimeConfig,
  CustomEventConfig,
  RealmsVoteAction,
  MarginfiLendAction,
  KaminoLendAction,
  DriftBetAction,
  DriftDepositAction,
  OfferTheme,
  FormSubmissionAction,
  StakeSolanaAction,
  LootBoxReward,
  PumpFunAction,
  LockTokenAction,
  BurnTokenAction,
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
  ASYMMETRIC_REWARD = 'ASYMMETRIC_REWARD',
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
      authType: 'basic' | 'transaction';
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
  offerBgImage?: string;
  offerTheme: OfferTheme;
  offerLink?: string;
  blinkOnly?: boolean;
  hideRewards: boolean;
  userRewardToken?: string;
  userRewardAmount?: string;
  userRewardType?: ApiRewardType;
  publisherRewardToken?: string;
  publisherRewardAmount?: string;
  publisherRewardType?: ApiRewardType;
  asymmetricRewards: AsymmetricReward[];
  lootBoxRewards?: LootBoxReward & { id: string };
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
  pendingConversions?: number;
};

/**
 *
 */
export enum AudienceType {
  STANDARD = 'STANDARD',
  CAMPAIGN = 'CAMPAIGN',
  UPLOAD = 'UPLOAD',
}

/**
 * Audience data.
 */
export type ApiAudience = {
  id: string;
  title: string;
  type: AudienceType;
  config: object;
  description?: string;
  global: boolean;
  fileKey?: string;
  bucket?: string;
};

/**
 * Audience metadata
 */
export type ApiAudienceMetadata = {
  type: AudienceType;
  title: string;
  description: string;
  fileKey?: string;
  bucket?: string;
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
  verified: boolean;
  telegram?: string;
};

/**
 * Telegram auth response.
 */
export type ApiTelegramAuth = {
  pubKey: string;
  telegram?: string;
  publisherPubKey?: string;
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
  PENDING = 'PENDING',
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
  updatedAt: Date;
  userBountySteps?: {
    id?: string;
    bountyStepId: string;
    userJourneyId: string;
    status: ApiProgressStatus;
    transaction?: string;
    startTime?: string;
  }[];
  startTime?: Date;
  startTx?: string;
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
export type OfferClickAction = {
  type: EventType.CLICK;
  eventConfig: ClickAction;
  timeConfig?: TimeConfig;
};

/**
 * Swap action bounty step requirements.
 */
export type OfferSwapAction = {
  type: EventType.SWAP;
  eventConfig: SwapAction;
  timeConfig?: TimeConfig;
  isBonding?: boolean;
  bondingCurveInfo?: {
    bondingCurveAddress: string;
    percentageFilled: number;
    complete: boolean;
  };
};

/**
 * NFT collection trade action bounty step requirements.
 */
export type OfferNFTTradeAction = {
  type: EventType.NFT_COLLECTION_TRADE;
  eventConfig: NftCollectionTradeAction;
  timeConfig?: TimeConfig;
};

/**
 * Sign up action bounty step requirements.
 */
export type OfferMemoAction = {
  type: EventType.MEMO;
  eventConfig: MemoAction; // TODO: fix sign up action type to use schema with email
  timeConfig?: TimeConfig;
};

/**
 * Tensor buy action bounty step requirements.
 */
export type OfferTensorBuyAction = {
  type: EventType.TENSOR_BUY;
  eventConfig: TensorAction;
  timeConfig?: TimeConfig;
};

/**
 * Tensor bid action bounty step requirements.
 */
export type OfferTensorBidAction = {
  type: EventType.TENSOR_BID;
  eventConfig: TensorAction;
  timeConfig?: TimeConfig;
};

/**
 * NFT bid buy action bounty step requirements.
 */
export type OfferNftBidBuyAction = {
  type: EventType.NFT_BUY_BID;
  eventConfig: NftBidBuyAction;
  timeConfig?: TimeConfig;
};

/**
 * Realms DAO vote action bounty step requirements.
 */
export type OfferRealmsVoteAction = {
  type: EventType.REALMS_VOTE;
  eventConfig: RealmsVoteAction;
  timeConfig?: TimeConfig;
};

/**
 * Custom event bounty step requirements.
 */
export type OfferCustomEventAction = {
  type: EventType.CUSTOM_EVENT;
  eventConfig: CustomEventConfig;
  timeConfig?: TimeConfig;
};

/**
 * Marginfi lend action bounty step requirements.
 */
export type OfferMarginfiLendAction = {
  type: EventType.MARGINFI_LEND;
  eventConfig: MarginfiLendAction;
  timeConfig?: TimeConfig;
};

/**
 * Kamino lend action bounty step requirements.
 */
export type OfferKaminoLendAction = {
  type: EventType.KAMINO_LEND;
  eventConfig: KaminoLendAction;
  timeConfig?: TimeConfig;
};

/**
 * Drift bet action bounty step requirements.
 */
export type OfferDriftBetAction = {
  type: EventType.DRIFT_BET;
  eventConfig: DriftBetAction;
  timeConfig?: TimeConfig;
};

/**
 * Drift bet action bounty step requirements.
 */
export type OfferDriftDepositAction = {
  type: EventType.DRIFT_DEPOSIT;
  eventConfig: DriftDepositAction;
  timeConfig?: TimeConfig;
};

/**
 * Form submission action bounty step requirements.
 */
export type OfferFormSubmissionAction = {
  type: EventType.FORM_SUBMISSION;
  eventConfig: FormSubmissionAction;
  timeConfig?: TimeConfig;
};

/**
 * Stake solana action bounty step requirements.
 */
export type OfferStakeSolanaAction = {
  type: EventType.STAKE_SOL;
  eventConfig: StakeSolanaAction;
  timeConfig?: TimeConfig;
};

/**
 * Pump.Fun  requirements.
 */
export type OfferPumpFunAction = {
  type: EventType.PUMP_FUN_BUY;
  eventConfig: PumpFunAction;
  timeConfig?: TimeConfig;
  isBonding?: boolean;
  bondingCurveInfo?: {
    bondingCurveAddress: string;
    percentageFilled: number;
    complete: boolean;
  };
};

/**
 * Lock token requirements.
 */
export type OfferLockTokenAction = {
  type: EventType.LOCK_TOKEN;
  eventConfig: LockTokenAction;
  timeConfig?: TimeConfig;
  isBonding?: boolean;
  bondingCurveInfo?: {
    bondingCurveAddress: string;
    percentageFilled: number;
    complete: boolean;
  };
};

/**
 * Burn token requirements.
 */
export type OfferBurnTokenAction = {
  type: EventType.BURN_TOKEN;
  eventConfig: BurnTokenAction;
  timeConfig?: TimeConfig;
  isBonding?: boolean;
  bondingCurveInfo?: {
    bondingCurveAddress: string;
    percentageFilled: number;
    complete: boolean;
  };
};

/**
 * Full bounty step requirement type.
 */
export type ApiRequirement = (
  | OfferSwapAction
  | OfferNFTTradeAction
  | OfferClickAction
  | OfferMemoAction
  | OfferTensorBuyAction
  | OfferTensorBidAction
  | OfferNftBidBuyAction
  | OfferCustomEventAction
  | OfferRealmsVoteAction
  | OfferMarginfiLendAction
  | OfferKaminoLendAction
  | OfferDriftBetAction
  | OfferDriftDepositAction
  | OfferStakeSolanaAction
  | OfferPumpFunAction
  | OfferLockTokenAction
  | OfferBurnTokenAction
) & {
  id?: string;
};
