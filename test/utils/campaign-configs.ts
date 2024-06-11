import { LAMPORTS_PER_SOL, PublicKey } from "@solana/web3.js";
import {ApiEventType, ApiRewardType, CampaignCreateInput} from "../../src/types/index";
import { TEST_USER_PATHS, loadCliWallet } from "./helper";

export const pointsCampaign: CampaignCreateInput = {
    campaignName: "pointsCampaign",
    campaignType: "CLICK",
    landingPage: 'https://www.example.com',
    eventType: ApiEventType.CLICK,
    eventProgramAddress: "",
    eventTokenAddress: "",
    publisherRewardType: ApiRewardType.POINTS,
    publisherTokenAddress: PublicKey.default.toString(),
    publisherPayoutPerConversion: 10,
    userRewardType: ApiRewardType.POINTS,
    userTokenAddress: PublicKey.default.toString(),
    userPayoutPerConversion: 10,
    conversionCount: 10,
    minAmount: 10,
    proposal: "",
    startTime: new Date().getTime(),
    endTime: new Date().getTime() + 60*60*24 * 1000,
    audience: '',
    asymmetricRewards: [],
}


export const clickRaffleCampaign: CampaignCreateInput = {
    campaignName: "click_raffle_sol",
    campaignType: "CLICK",
    landingPage: 'app.torque.so',
    eventType: ApiEventType.CLICK,
    eventProgramAddress: "",
    eventTokenAddress: "",
    publisherRewardType: ApiRewardType.TOKENS,
    publisherTokenAddress: loadCliWallet(TEST_USER_PATHS.publisher1).publicKey.toString(),
    publisherPayoutPerConversion: 8,
    userRewardType: ApiRewardType.POINTS,
    userTokenAddress: PublicKey.default.toString(),
    userPayoutPerConversion: 13,
    conversionCount: 10000,
    minAmount: 10,
    proposal: "",
    startTime: new Date().getTime(),
    endTime: new Date().getTime() + 60*60*24 * 30 * 1000,
    // TODO FIX, should be null
    audience: '',
    asymmetricRewards: [{
        token: PublicKey.default.toString(),
        amount: LAMPORTS_PER_SOL / 2,
    }],
}