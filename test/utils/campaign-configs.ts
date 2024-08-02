import { LAMPORTS_PER_SOL, PublicKey } from '@solana/web3.js';
import { EventType, CreateCampaignInput, RewardType } from '@torque-labs/torque-utils';

import { TEST_SPL } from './helper';

export const pointsCampaign: CreateCampaignInput = {
  campaignName: 'pointsCampaign',
  campaignType: 'CLICK',
  landingPage: 'https://www.example.com',
  eventType: EventType.CLICK,
  publisherRewardType: RewardType.POINTS,
  publisherTokenAddress: PublicKey.default.toString(),
  publisherPayoutPerConversion: 100,
  userRewardType: RewardType.POINTS,
  userTokenAddress: PublicKey.default.toString(),
  userPayoutPerConversion: 100,
  conversionCount: 10,
  startTime: new Date().getTime(),
  endTime: new Date().getTime() + 60 * 60 * 24 * 1000,
  audience: '',
  asymmetricRewards: [],
};

export const publisherUserSOL: CreateCampaignInput = {
  campaignName: `pubUserSOL_${new Date().getTime()}`,
  campaignType: 'CLICK',
  landingPage: 'https://www.example.com',
  eventType: EventType.CLICK,
  publisherRewardType: RewardType.TOKENS,
  publisherTokenAddress: PublicKey.default.toString(),
  publisherPayoutPerConversion: 10,
  userRewardType: RewardType.TOKENS,
  userTokenAddress: PublicKey.default.toString(),
  userPayoutPerConversion: 10,
  conversionCount: 10,
  startTime: new Date().getTime(),
  endTime: new Date().getTime() + 60 * 60 * 24 * 1000,
  audience: '',
  asymmetricRewards: [],
};

export const publisherUserSPL: CreateCampaignInput = {
  campaignName: `pubUserSPL_${new Date().getTime()}`,
  campaignType: 'CLICK',
  landingPage: 'https://www.example.com',
  eventType: EventType.CLICK,
  publisherRewardType: RewardType.TOKENS,
  publisherTokenAddress: TEST_SPL.toString(),
  publisherPayoutPerConversion: 10,
  userRewardType: RewardType.TOKENS,
  userTokenAddress: TEST_SPL.toString(),
  userPayoutPerConversion: 10,
  conversionCount: 10,
  startTime: new Date().getTime(),
  endTime: new Date().getTime() + 60 * 60 * 24 * 1000,
  audience: '',
  asymmetricRewards: [],
};

export const raffleSOL: CreateCampaignInput = {
  campaignName: `raffleSOL_${new Date().getTime()}`,
  campaignType: 'CLICK',
  landingPage: 'https://www.example.com',
  eventType: EventType.CLICK,
  publisherRewardType: RewardType.TOKENS,
  publisherTokenAddress: PublicKey.default.toString(),
  publisherPayoutPerConversion: 0,
  userRewardType: RewardType.TOKENS,
  userTokenAddress: PublicKey.default.toString(),
  userPayoutPerConversion: 0,
  conversionCount: 10,
  startTime: new Date().getTime(),
  endTime: new Date().getTime() + 60 * 60 * 24 * 1000,
  audience: '',
  asymmetricRewards: [
    {
      tokenAddress: PublicKey.default.toString(),
      amount: '5000',
    },
  ],
};

export const raffleSPL: CreateCampaignInput = {
  campaignName: `raffleSPL_${new Date().getTime()}`,
  campaignType: 'CLICK',
  landingPage: 'https://www.example.com',
  eventType: EventType.CLICK,
  publisherRewardType: RewardType.TOKENS,
  publisherTokenAddress: PublicKey.default.toString(),
  publisherPayoutPerConversion: 0,
  userRewardType: RewardType.TOKENS,
  userTokenAddress: PublicKey.default.toString(),
  userPayoutPerConversion: 0,
  conversionCount: 10,
  startTime: new Date().getTime(),
  endTime: new Date().getTime() + 60 * 60 * 24 * 1000,
  audience: '',
  asymmetricRewards: [
    {
      tokenAddress: TEST_SPL.toString(),
      amount: '50',
    },
  ],
};

export const clickRaffleCampaignSol: CreateCampaignInput = {
  campaignName: 'click_raffle_sol',
  campaignType: 'CLICK',
  landingPage: 'app.torque.so',
  eventType: EventType.CLICK,
  publisherRewardType: RewardType.TOKENS,
  publisherTokenAddress: PublicKey.default.toString(),
  publisherPayoutPerConversion: 8,
  userRewardType: RewardType.TOKENS,
  userTokenAddress: PublicKey.default.toString(),
  userPayoutPerConversion: 13,
  conversionCount: 10000,
  startTime: new Date().getTime(),
  endTime: new Date().getTime() + 60 * 60 * 24 * 30 * 1000,
  // TODO FIX, should be null
  audience: '',
  asymmetricRewards: [
    {
      tokenAddress: PublicKey.default.toString(),
      amount: `${LAMPORTS_PER_SOL / 2}`,
    },
  ],
};

export const clickRaffleCampaignSpl: CreateCampaignInput = {
  campaignName: 'click_raffle_spl',
  campaignType: 'CLICK',
  landingPage: 'app.torque.so',
  eventType: EventType.CLICK,
  publisherRewardType: RewardType.TOKENS,
  publisherTokenAddress: TEST_SPL.toString(),
  publisherPayoutPerConversion: 8,
  userRewardType: RewardType.TOKENS,
  userTokenAddress: TEST_SPL.toString(),
  userPayoutPerConversion: 13,
  conversionCount: 100,
  startTime: new Date().getTime(),
  endTime: new Date().getTime() + 60 * 60 * 24 * 30 * 1000,
  // TODO FIX, should be null
  audience: '',
  asymmetricRewards: [
    {
      tokenAddress: TEST_SPL.toString(),
      amount: '250',
    },
  ],
};

export const swapBonkCampaignSpl: CreateCampaignInput = {
  campaignName: `swap_bonk_${new Date().getTime()}.t`,
  campaignType: 'BOUNTY',
  landingPage: 'app.torque.so',
  eventType: EventType.SWAP,
  publisherRewardType: RewardType.TOKENS,
  publisherTokenAddress: TEST_SPL.toString(),
  publisherPayoutPerConversion: 1,
  userRewardType: RewardType.TOKENS,
  userTokenAddress: TEST_SPL.toString(),
  userPayoutPerConversion: 1,
  conversionCount: 3,
  startTime: new Date().getTime(),
  endTime: new Date().getTime() + 60 * 60 * 24 * 30 * 1000,
  // TODO FIX, should be null
  audience: '',
  asymmetricRewards: [],
};

export const raffle1Winner: CreateCampaignInput = {
  campaignName: `1_winner${new Date().getTime()}.t`,
  campaignType: 'CLICK',
  landingPage: 'app.torque.so',
  eventType: EventType.CLICK,
  publisherRewardType: RewardType.POINTS,
  publisherTokenAddress: PublicKey.default.toString(),
  publisherPayoutPerConversion: 1,
  userRewardType: RewardType.POINTS,
  userTokenAddress: PublicKey.default.toString(),
  userPayoutPerConversion: 0,
  conversionCount: 3,
  startTime: new Date().getTime(),
  endTime: new Date().getTime() + 60 * 60 * 24 * 30 * 1000,
  // TODO FIX, should be null
  audience: '',
  asymmetricRewards: [
    {
      tokenAddress: TEST_SPL.toString(),
      amount: '13',
    },
  ],
};
