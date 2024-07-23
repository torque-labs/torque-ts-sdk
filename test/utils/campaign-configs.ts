import { LAMPORTS_PER_SOL, PublicKey } from '@solana/web3.js';
import { EventType } from '@torque-labs/torque-utils';

import { TEST_SPL } from './helper';
import { ApiRewardType, CampaignCreateInput } from '../../src/types/index';

export const pointsCampaign: CampaignCreateInput = {
  campaignName: 'pointsCampaign',
  campaignType: 'CLICK',
  landingPage: 'https://www.example.com',
  eventType: EventType.CLICK,
  eventProgramAddress: '',
  eventTokenAddress: '',
  publisherRewardType: ApiRewardType.POINTS,
  publisherTokenAddress: PublicKey.default.toString(),
  publisherPayoutPerConversion: 100,
  userRewardType: ApiRewardType.POINTS,
  userTokenAddress: PublicKey.default.toString(),
  userPayoutPerConversion: 100,
  conversionCount: 10,
  minAmount: 10,
  proposal: '',
  startTime: new Date().getTime(),
  endTime: new Date().getTime() + 60 * 60 * 24 * 1000,
  audience: '',
  asymmetricRewards: [],
};

export const publisherUserSOL: CampaignCreateInput = {
  campaignName: `pubUserSOL_${new Date().getTime()}`,
  campaignType: 'CLICK',
  landingPage: 'https://www.example.com',
  eventType: EventType.CLICK,
  eventProgramAddress: '',
  eventTokenAddress: '',
  publisherRewardType: ApiRewardType.TOKENS,
  publisherTokenAddress: PublicKey.default.toString(),
  publisherPayoutPerConversion: 10,
  userRewardType: ApiRewardType.TOKENS,
  userTokenAddress: PublicKey.default.toString(),
  userPayoutPerConversion: 10,
  conversionCount: 10,
  minAmount: 10,
  proposal: '',
  startTime: new Date().getTime(),
  endTime: new Date().getTime() + 60 * 60 * 24 * 1000,
  audience: '',
  asymmetricRewards: [],
};

export const publisherUserSPL: CampaignCreateInput = {
  campaignName: `pubUserSPL_${new Date().getTime()}`,
  campaignType: 'CLICK',
  landingPage: 'https://www.example.com',
  eventType: EventType.CLICK,
  eventProgramAddress: '',
  eventTokenAddress: '',
  publisherRewardType: ApiRewardType.TOKENS,
  publisherTokenAddress: TEST_SPL.toString(),
  publisherPayoutPerConversion: 10,
  userRewardType: ApiRewardType.TOKENS,
  userTokenAddress: TEST_SPL.toString(),
  userPayoutPerConversion: 10,
  conversionCount: 10,
  minAmount: 10,
  proposal: '',
  startTime: new Date().getTime(),
  endTime: new Date().getTime() + 60 * 60 * 24 * 1000,
  audience: '',
  asymmetricRewards: [],
};

export const raffleSOL: CampaignCreateInput = {
  campaignName: `raffleSOL_${new Date().getTime()}`,
  campaignType: 'CLICK',
  landingPage: 'https://www.example.com',
  eventType: EventType.CLICK,
  eventProgramAddress: '',
  eventTokenAddress: '',
  publisherRewardType: ApiRewardType.TOKENS,
  publisherTokenAddress: PublicKey.default.toString(),
  publisherPayoutPerConversion: 0,
  userRewardType: ApiRewardType.TOKENS,
  userTokenAddress: PublicKey.default.toString(),
  userPayoutPerConversion: 0,
  conversionCount: 10,
  minAmount: 10,
  proposal: '',
  startTime: new Date().getTime(),
  endTime: new Date().getTime() + 60 * 60 * 24 * 1000,
  audience: '',
  asymmetricRewards: [
    {
      tokenAddress: PublicKey.default.toString(),
      amount: 5000,
    },
  ],
};

export const raffleSPL: CampaignCreateInput = {
  campaignName: `raffleSPL_${new Date().getTime()}`,
  campaignType: 'CLICK',
  landingPage: 'https://www.example.com',
  eventType: EventType.CLICK,
  eventProgramAddress: '',
  eventTokenAddress: '',
  publisherRewardType: ApiRewardType.TOKENS,
  publisherTokenAddress: PublicKey.default.toString(),
  publisherPayoutPerConversion: 0,
  userRewardType: ApiRewardType.TOKENS,
  userTokenAddress: PublicKey.default.toString(),
  userPayoutPerConversion: 0,
  conversionCount: 10,
  minAmount: 10,
  proposal: '',
  startTime: new Date().getTime(),
  endTime: new Date().getTime() + 60 * 60 * 24 * 1000,
  audience: '',
  asymmetricRewards: [
    {
      tokenAddress: TEST_SPL.toString(),
      amount: 50,
    },
  ],
};

export const clickRaffleCampaignSol: CampaignCreateInput = {
  campaignName: 'click_raffle_sol',
  campaignType: 'CLICK',
  landingPage: 'app.torque.so',
  eventType: EventType.CLICK,
  eventProgramAddress: '',
  eventTokenAddress: '',
  publisherRewardType: ApiRewardType.TOKENS,
  publisherTokenAddress: PublicKey.default.toString(),
  publisherPayoutPerConversion: 8,
  userRewardType: ApiRewardType.TOKENS,
  userTokenAddress: PublicKey.default.toString(),
  userPayoutPerConversion: 13,
  conversionCount: 10000,
  minAmount: 10,
  proposal: '',
  startTime: new Date().getTime(),
  endTime: new Date().getTime() + 60 * 60 * 24 * 30 * 1000,
  // TODO FIX, should be null
  audience: '',
  asymmetricRewards: [
    {
      tokenAddress: PublicKey.default.toString(),
      amount: LAMPORTS_PER_SOL / 2,
    },
  ],
};

export const clickRaffleCampaignSpl: CampaignCreateInput = {
  campaignName: 'click_raffle_spl',
  campaignType: 'CLICK',
  landingPage: 'app.torque.so',
  eventType: EventType.CLICK,
  eventProgramAddress: '',
  eventTokenAddress: '',
  publisherRewardType: ApiRewardType.TOKENS,
  publisherTokenAddress: TEST_SPL.toString(),
  publisherPayoutPerConversion: 8,
  userRewardType: ApiRewardType.TOKENS,
  userTokenAddress: TEST_SPL.toString(),
  userPayoutPerConversion: 13,
  conversionCount: 100,
  minAmount: 10,
  proposal: '',
  startTime: new Date().getTime(),
  endTime: new Date().getTime() + 60 * 60 * 24 * 30 * 1000,
  // TODO FIX, should be null
  audience: '',
  asymmetricRewards: [
    {
      tokenAddress: TEST_SPL.toString(),
      amount: 250,
    },
  ],
};

export const swapBonkCampaignSpl: CampaignCreateInput = {
  campaignName: `swap_bonk_${new Date().getTime()}.t`,
  campaignType: 'BOUNTY',
  landingPage: 'app.torque.so',
  eventType: EventType.SWAP,
  eventProgramAddress: '',
  eventTokenAddress: 'DezXAZ8z7PnrnRJjz3wXBoRgixCa6xjnB7YaB1pPB263',
  minAmount: 10,
  publisherRewardType: ApiRewardType.TOKENS,
  publisherTokenAddress: TEST_SPL.toString(),
  publisherPayoutPerConversion: 1,
  userRewardType: ApiRewardType.TOKENS,
  userTokenAddress: TEST_SPL.toString(),
  userPayoutPerConversion: 1,
  conversionCount: 3,
  proposal: '',
  startTime: new Date().getTime(),
  endTime: new Date().getTime() + 60 * 60 * 24 * 30 * 1000,
  // TODO FIX, should be null
  audience: '',
  asymmetricRewards: [],
};

export const raffle1Winner: CampaignCreateInput = {
  campaignName: `1_winner${new Date().getTime()}.t`,
  campaignType: 'CLICK',
  landingPage: 'app.torque.so',
  eventType: EventType.CLICK,
  eventProgramAddress: '',
  eventTokenAddress: 'DezXAZ8z7PnrnRJjz3wXBoRgixCa6xjnB7YaB1pPB263',
  minAmount: null,
  publisherRewardType: ApiRewardType.POINTS,
  publisherTokenAddress: PublicKey.default.toString(),
  publisherPayoutPerConversion: 1,
  userRewardType: ApiRewardType.POINTS,
  userTokenAddress: PublicKey.default.toString(),
  userPayoutPerConversion: 0,
  conversionCount: 3,
  proposal: '',
  startTime: new Date().getTime(),
  endTime: new Date().getTime() + 60 * 60 * 24 * 30 * 1000,
  // TODO FIX, should be null
  audience: '',
  asymmetricRewards: [
    {
      tokenAddress: TEST_SPL.toString(),
      amount: 13,
    },
  ],
};
