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

export type ApiResponseSuccess<T> = {
  status: ApiStatus.SUCCESS;
  data: T;
};

export type ApiResponseError = {
  status: Exclude<ApiStatus, ApiStatus.SUCCESS>;
  message: string;
};

export type ApiResponse<T> = ApiResponseSuccess<T> | ApiResponseError;

export type ApiInputVerify =
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
