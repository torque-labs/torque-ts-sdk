import {ApiEventType, ApiRewardType, CampaignCreateInput} from "../../src/types/index";

export const pointsCampaign: CampaignCreateInput = {
    campaignName: "pointsCampaign",
    campaignType: "POINTS",
    landingPage: 'https://www.example.com',
    eventType: ApiEventType.CLICK,
    eventProgramAddress: "",
    eventTokenAddress: "",
    publisherRewardType: ApiRewardType.POINTS,
    publisherTokenAddress: "",
    publisherPayoutPerConversion: 10,
    userRewardType: ApiRewardType.POINTS,
    userTokenAddress: "",
    userPayoutPerConversion: 10,
    conversionCount: 10,
    minAmount: 10,
    proposal: "",
    startTime: new Date().getTime() / 1000,
    endTime: new Date().getTime() / 1000 + 60*60*24,
    audience: '',
    asymmetricRewards: [],
}