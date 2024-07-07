/**
 * The API response success type.
 */
export var ApiStatus;
(function (ApiStatus) {
    ApiStatus["SUCCESS"] = "SUCCESS";
    ApiStatus["BAD_REQUEST"] = "BAD_REQUEST";
    ApiStatus["NOT_AUTHORIZED"] = "NOT_AUTHORIZED";
    ApiStatus["FORBIDDEN"] = "FORBIDDEN";
    ApiStatus["NOT_FOUND"] = "NOT_FOUND";
    ApiStatus["INTERNAL_ERROR"] = "INTERNAL_ERROR";
})(ApiStatus || (ApiStatus = {}));
/**
 * On-chain event types for the API.
 */
export var ApiEventType;
(function (ApiEventType) {
    ApiEventType["CLICK"] = "CLICK";
    ApiEventType["SWAP"] = "SWAP";
    ApiEventType["NFT_COLLECTION_TRADE"] = "NFT_COLLECTION_TRADE";
})(ApiEventType || (ApiEventType = {}));
/**
 * The rewards type of a campaign.
 */
export var ApiRewardType;
(function (ApiRewardType) {
    ApiRewardType["POINTS"] = "POINTS";
    ApiRewardType["TOKENS"] = "TOKENS";
    ApiRewardType["ASYMMETRIC_REWARDS"] = "ASYMMETRIC_REWARDS";
})(ApiRewardType || (ApiRewardType = {}));
/**
 * Torque functions that require a wallet signature.
 */
export var ApiTxnTypes;
(function (ApiTxnTypes) {
    ApiTxnTypes["CampaignCreate"] = "CampaignCreate";
    ApiTxnTypes["CampaignEnd"] = "CampaignEnd";
    ApiTxnTypes["PublisherPayout"] = "PublisherPayout";
    ApiTxnTypes["PublisherCreate"] = "PublisherCreate";
})(ApiTxnTypes || (ApiTxnTypes = {}));
//# sourceMappingURL=api.js.map