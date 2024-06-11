"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiTxnTypes = exports.ApiRewardType = exports.ApiEventType = exports.ApiStatus = void 0;
/**
 * The API response success type.
 */
var ApiStatus;
(function (ApiStatus) {
    ApiStatus["SUCCESS"] = "SUCCESS";
    ApiStatus["BAD_REQUEST"] = "BAD_REQUEST";
    ApiStatus["NOT_AUTHORIZED"] = "NOT_AUTHORIZED";
    ApiStatus["FORBIDDEN"] = "FORBIDDEN";
    ApiStatus["NOT_FOUND"] = "NOT_FOUND";
    ApiStatus["INTERNAL_ERROR"] = "INTERNAL_ERROR";
})(ApiStatus || (exports.ApiStatus = ApiStatus = {}));
/**
 * On-chain event types for the API.
 */
var ApiEventType;
(function (ApiEventType) {
    ApiEventType["CLICK"] = "CLICK";
    ApiEventType["SWAP"] = "SWAP";
    ApiEventType["CAST_VOTE"] = "CAST_VOTE";
    ApiEventType["COMPRESSED_NFT_MINT"] = "COMPRESSED_NFT_MINT";
    ApiEventType["ADD_LIQUIDITY"] = "ADD_LIQUIDITY";
    ApiEventType["INTERACT"] = "INTERACT";
    ApiEventType["SIGN_UP"] = "SIGN_UP";
})(ApiEventType || (exports.ApiEventType = ApiEventType = {}));
/**
 * The rewards type of a campaign.
 */
var ApiRewardType;
(function (ApiRewardType) {
    ApiRewardType["POINTS"] = "POINTS";
    ApiRewardType["TOKENS"] = "TOKENS";
})(ApiRewardType || (exports.ApiRewardType = ApiRewardType = {}));
/**
 * Torque functions that require a wallet signature.
 */
var ApiTxnTypes;
(function (ApiTxnTypes) {
    ApiTxnTypes["CampaignCreate"] = "CampaignCreate";
    ApiTxnTypes["CampaignEnd"] = "CampaignEnd";
    ApiTxnTypes["PublisherPayout"] = "PublisherPayout";
    ApiTxnTypes["PublisherCreate"] = "PublisherCreate";
})(ApiTxnTypes || (exports.ApiTxnTypes = ApiTxnTypes = {}));
