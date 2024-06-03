import {
  SolanaSignInInput,
  SolanaSignInOutput,
} from "@solana/wallet-standard-features";

export enum ApiStatus {
  SUCCESS = "SUCCESS",
  BAD_REQUEST = "BAD_REQUEST",
  NOT_AUTHORIZED = "NOT_AUTHORIZED",
  FORBIDDEN = "FORBIDDEN",
  NOT_FOUND = "NOT_FOUND",
  INTERNAL_ERROR = "INTERNAL_ERROR",
}

export enum ApiEventType {
  CLICK = "CLICK",
  SWAP = "SWAP",
  CAST_VOTE = "CAST_VOTE",
  COMPRESSED_NFT_MINT = "COMPRESSED_NFT_MINT",
  ADD_LIQUIDITY = "ADD_LIQUIDITY",
  INTERACT = "INTERACT",
  SIGN_UP = "SIGN_UP",
}

export enum ApiRewardType {
  POINTS = "POINTS",
  TOKENS = "TOKENS",
}

export type ApiResponseSuccess<T> = {
  status: ApiStatus.SUCCESS;
  data: T;
};

export type ApiResponseError = {
  status: Exclude<ApiStatus, ApiStatus.SUCCESS>;
  message: string;
};

export type ApiResponse<T> = ApiResponseSuccess<T> | ApiResponseError;

export type ApiInputLogin =
  | {
      authType: "siws";
      pubKey: string;
      payload: {
        input: SolanaSignInInput;
        output: SolanaSignInOutput;
      };
    }
  | {
      authType: "basic";
      pubKey: string;
      payload: { input: string; output: string };
    };

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
  userRewardAmount?: any;
  publisherRewardToken?: string;
  publisherRewardAmount?: any;
  publisherRewardType?: string;
  audiences: {
    id: string;
    title: string;
  }[];
};

export type ApiAudience = {
  id: string;
  title: string;
  imageUrl?: string;
  description?: string;
};

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

export type ApiUser = {
  pubKey: string;
  username?: string;
  twitter?: string;
  profileImage?: string;
  isPublisher: boolean;
  publisherPubKey?: string | null;
};

export type ApiVerifiedUser = ApiUser & {
  verified: boolean;
};

export type ApiIdentifyPayload = {
  payload: {
    statement: string;
    issuedAt: string;
    expirationTime: string;
  };
};

export type ApiLinks = {
  links: {
    campaignId: string;
    url: string;
  }[];
};

export enum ApiTxnTypes {
  CampaignCreate = "CampaignCreate",
  CampaignEnd = "CampaignEnd",
  PublisherPayout = "PublisherPayout",
  PublisherCreate = "PublisherCreate",
}

export const UserTransactionTypes = [
  ApiTxnTypes.PublisherCreate,
  ApiTxnTypes.PublisherPayout,
];

export const AdminTransactionTypes = [
  ApiTxnTypes.CampaignCreate,
  ApiTxnTypes.CampaignEnd,
];

export const TransactionType = [
  ...UserTransactionTypes,
  ...AdminTransactionTypes,
];
