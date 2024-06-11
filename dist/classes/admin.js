"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TorqueAdminClient = void 0;
var request_1 = require("./request");
var constants_1 = require("../constants");
var types_1 = require("../types");
/**
 * The TorqueAdminClient class is used to manage admin actions in the Torque API.
 *
 * @example
 * const client = new TorqueAdminClient(TorqueAdminClientOptions);
 *
 * const result = await client.createCampaign(<campaignData>);
 * const result = await client.endCampaign(<campaignData>);
 */
var TorqueAdminClient = /** @class */ (function () {
    /**
     * Create a new instance of the TorqueAdminClient class with the provided API key.
     *
     * @param {TorqueAdminClientOptions} options - The options for the TorqueAdminClient.
     */
    function TorqueAdminClient(options) {
        var signer = options.signer, apiKey = options.apiKey, userClient = options.userClient;
        this.client = new request_1.TorqueRequestClient(signer, apiKey);
        this.userClient = userClient;
    }
    /**
     * ========================================================================
     * CAMPAIGNS
     * ========================================================================
     */
    /**
     * Get a list of all currently active campaigns.
     *
     * @returns {Promise<ApiCampaign[]>} A promise that resolves to an array of ApiCampaign objects.
     *
     * @throws {Error} If the client is not initialized or there was an error getting the list of campaigns.
     */
    TorqueAdminClient.prototype.getCampaigns = function () {
        return __awaiter(this, void 0, void 0, function () {
            var params, result, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.client) {
                            throw new Error('The client is not initialized.');
                        }
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        params = new URLSearchParams({ status: 'ACTIVE' });
                        return [4 /*yield*/, this.client.apiFetch("".concat(constants_1.TORQUE_API_ROUTES.campaigns, "?").concat(params.toString()), {
                                method: 'GET',
                                headers: {
                                    'Content-Type': 'application/json',
                                },
                            })];
                    case 2:
                        result = _a.sent();
                        return [2 /*return*/, result];
                    case 3:
                        error_1 = _a.sent();
                        console.error(error_1);
                        throw new Error("There was an error getting user's eligible campaigns.");
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Create a new campaign with the provided data.
     *
     * @param {CampaignCreateInput} data - The data for the campaign to create.
     *
     * @returns {Promise<string>} A promise that resolves to the signature of the transaction.
     */
    TorqueAdminClient.prototype.createCampaign = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            var input, signature, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.client) {
                            throw new Error('The client is not initialized.');
                        }
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        input = {
                            txnType: types_1.ApiTxnTypes.CampaignCreate,
                            data: data,
                        };
                        return [4 /*yield*/, this.client.transaction(input)];
                    case 2:
                        signature = _a.sent();
                        return [2 /*return*/, signature];
                    case 3:
                        error_2 = _a.sent();
                        console.error(error_2);
                        throw new Error('There was an error creating the campaign.');
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * End a campaign using the provided campaign ID.
     *
     * @param {CampaignEndInput} data - The ID of the campaign to end.
     *
     * @returns {Promise<string>} A promise that resolves to the signature of the transaction.
     *
     * @throws {Error} Throws an error if the client is not initialized or if there is an error ending the campaign.
     */
    TorqueAdminClient.prototype.endCampaign = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            var input, signature, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.client) {
                            throw new Error('The client is not initialized.');
                        }
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        input = {
                            txnType: types_1.ApiTxnTypes.CampaignEnd,
                            data: data,
                        };
                        return [4 /*yield*/, this.client.transaction(input)];
                    case 2:
                        signature = _a.sent();
                        return [2 /*return*/, signature];
                    case 3:
                        error_3 = _a.sent();
                        console.error(error_3);
                        throw new Error('There was an error ending the campaign.');
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Get the leaderboard for a specific campaign.
     *
     * @param {string} campaignId - The ID of the campaign to get the leaderboard for.
     *
     * @returns {Promise<ApiCampaignLeaderboard>} A Promise that resolves to the leaderboard data for the campaign.
     *
     * @throws {Error} Throws an error if the client is not initialized or if there is an error getting the leaderboard.
     */
    TorqueAdminClient.prototype.getLeaderboard = function (campaignId) {
        return __awaiter(this, void 0, void 0, function () {
            var params, result, error_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.client) {
                            throw new Error('The client is not initialized.');
                        }
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        params = new URLSearchParams({ campaignId: campaignId });
                        return [4 /*yield*/, this.client.apiFetch("".concat(constants_1.TORQUE_API_ROUTES.leaderboards, "?").concat(params.toString()), {
                                method: 'GET',
                            })];
                    case 2:
                        result = _a.sent();
                        return [2 /*return*/, result];
                    case 3:
                        error_4 = _a.sent();
                        console.error(error_4);
                        throw new Error('There was an error getting the leaderboard.');
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Get the raffle rewards for a specific campaign.
     *
     * @param {string} campaignId - The ID of the campaign to get the raffle rewards for.
     *
     * @throws {Error} Throws an error if the client is not initialized or if there is an error getting the raffle rewards.
     */
    TorqueAdminClient.prototype.raffleRewards = function (campaignId) {
        return __awaiter(this, void 0, void 0, function () {
            var params, result, error_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.client) {
                            throw new Error('The client is not initialized.');
                        }
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        params = new URLSearchParams({ campaignId: campaignId });
                        return [4 /*yield*/, this.client.apiFetch("".concat(constants_1.TORQUE_API_ROUTES.raffle, "?").concat(params.toString()), {
                                method: 'GET',
                            })];
                    case 2:
                        result = _a.sent();
                        return [2 /*return*/, result];
                    case 3:
                        error_5 = _a.sent();
                        console.error(error_5);
                        throw new Error('There was an error getting the raffle rewards.');
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * ========================================================================
     * PUBLISHER
     * ========================================================================
     */
    /**
     * Initialize a publisher account for the current user.
     *
     * @return {Promise<string>} A promise that resolves to the signature of the transaction.
     *
     * @throws {Error} Throws an error if there was an error creating the publisher.
     */
    TorqueAdminClient.prototype.initPublisher = function () {
        return __awaiter(this, void 0, void 0, function () {
            var signature, error_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.client) {
                            throw new Error('The client is not initialized.');
                        }
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 4, , 5]);
                        return [4 /*yield*/, this.client.transaction({
                                txnType: types_1.ApiTxnTypes.PublisherCreate,
                                data: true,
                            })];
                    case 2:
                        signature = (_a.sent()).signature;
                        return [4 /*yield*/, this.userClient.refreshUser()];
                    case 3:
                        _a.sent();
                        return [2 /*return*/, signature];
                    case 4:
                        error_6 = _a.sent();
                        console.error(error_6);
                        throw new Error('There was an error creating the publisher.');
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Process a publisher payout for the current user, if eligible.
     *
     * @returns {Promise<string>} A promise that resolves to the signature of the transaction.
     *
     * @throws {Error} Throws an error if there was an error paying out the publisher.
     */
    TorqueAdminClient.prototype.payoutPublisher = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            var signature, error_7;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.client) {
                            throw new Error('The client is not initialized.');
                        }
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.client.transaction({
                                txnType: types_1.ApiTxnTypes.PublisherPayout,
                                data: data,
                            })];
                    case 2:
                        signature = (_a.sent()).signature;
                        return [2 /*return*/, signature];
                    case 3:
                        error_7 = _a.sent();
                        console.error(error_7);
                        throw new Error('There was an error paying out the publisher.');
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * DATA
     */
    /**
     * Retrieves the list of safe tokens from the Jupiter ag.
     *
     * @param {string} filter - An optional filter to filter the tokens by text.
     *
     * @return {Promise<SafeToken[]>} A promise that resolves to an array of SafeToken objects.
     *
     * @throws {Error} If the client is not initialized or there was an error fetching the safe token list.
     */
    TorqueAdminClient.prototype.getSafeTokenList = function (filter) {
        return __awaiter(this, void 0, void 0, function () {
            var response, error_8;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.client) {
                            throw new Error('The client is not initialized.');
                        }
                        if (this.tokenList) {
                            return [2 /*return*/, !filter
                                    ? this.tokenList
                                    : this.tokenList.filter(function (token) { return token.name.toLowerCase().includes(filter); })];
                        }
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.client.anyFetch(constants_1.JUP_TOKEN_LIST)];
                    case 2:
                        response = _a.sent();
                        this.tokenList = response;
                        return [2 /*return*/, !filter
                                ? this.tokenList
                                : this.tokenList.filter(function (token) { return token.name.toLowerCase().includes(filter); })];
                    case 3:
                        error_8 = _a.sent();
                        console.error(error_8);
                        throw new Error('There was an error fetching the safe token list.');
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    return TorqueAdminClient;
}());
exports.TorqueAdminClient = TorqueAdminClient;
