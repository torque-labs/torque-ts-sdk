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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TorqueUserClient = void 0;
var web3_js_1 = require("@solana/web3.js");
var tweetnacl_1 = __importDefault(require("tweetnacl"));
var request_1 = require("./request");
var sdk_1 = require("./sdk");
var constants_1 = require("../constants");
/**
 * The TorqueUserClient class is used to authenticate a user with the Torque API.
 * The user client allows publishers to fetch campaigns and offers that are savailable for the current user.
 *
 * @example
 * const client = new TorqueUserClient(TorqueUserClientOptions);
 *
 * // Check if the user is already logged in with API
 * const currentUser = await client.getCurrentUser();
 *
 * const user = currentUser
 *   ? currentUser
 *   : await this.initializeUser(ApiInputLogin);
 */
var TorqueUserClient = /** @class */ (function () {
    /**
     * Create a new instance of the TorqueUserClient class with the publisher's handle, if provided.
     *
     * @param {TorqueUserClientOptions} options - The options for the TorqueUserClient.
     *
     * @throws {Error} Throws an error if the user's wallet is not provided.
     */
    function TorqueUserClient(options) {
        this.initialized = false;
        var signer = options.signer, publisherHandle = options.publisherHandle, rpc = options.rpc;
        if (!signer.publicKey) {
            throw new Error('The wallet/signer provided does not have a public key.');
        }
        this.client = new request_1.TorqueRequestClient(signer);
        this.publicKey = signer.publicKey.toString();
        this.publisherHandle = publisherHandle;
        this.signer = signer;
        this.connection = new web3_js_1.Connection(rpc !== null && rpc !== void 0 ? rpc : (0, web3_js_1.clusterApiUrl)(constants_1.SOLANA_NETWORK), 'confirmed');
    }
    /**
     * ========================================================================
     * AUTHENTICATION
     * ========================================================================
     */
    /**
     * Initializes the TorqueUserClient with the provided options.
     *
     * @param {ApiInputLogin} userAuth - User signature object that is required to authenticate a user with Torque.
     *
     * @returns {Promise<ApiVerifiedUser>} A Promise that resolves when the initialization is complete.
     *
     * @throws {Error} If user was not verified.
     */
    TorqueUserClient.prototype.initializeUser = function (userAuth) {
        return __awaiter(this, void 0, void 0, function () {
            var currentUser, error_1, loginBody, signPayloadInput, signOutPayload, signOutPayload, signature, verifiedUser, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.getCurrentUser()];
                    case 1:
                        currentUser = _a.sent();
                        if (currentUser) {
                            return [2 /*return*/, currentUser];
                        }
                        return [3 /*break*/, 3];
                    case 2:
                        error_1 = _a.sent();
                        console.error(error_1);
                        return [3 /*break*/, 3];
                    case 3:
                        _a.trys.push([3, 15, , 16]);
                        loginBody = void 0;
                        if (!(!userAuth && this.signer.publicKey)) return [3 /*break*/, 10];
                        return [4 /*yield*/, sdk_1.TorqueSDK.getLoginPayload()];
                    case 4:
                        signPayloadInput = _a.sent();
                        if (!('signIn' in this.signer)) return [3 /*break*/, 6];
                        return [4 /*yield*/, this.signer.signIn(signPayloadInput.payload)];
                    case 5:
                        signOutPayload = _a.sent();
                        loginBody = sdk_1.TorqueSDK.constructLoginBody({
                            authType: 'siws',
                            pubKey: this.signer.publicKey.toString(),
                            payload: { input: signPayloadInput.payload, output: signOutPayload },
                        });
                        return [3 /*break*/, 9];
                    case 6:
                        if (!('signMessage' in this.signer)) return [3 /*break*/, 8];
                        return [4 /*yield*/, this.signer.signMessage(Buffer.from(signPayloadInput.payload.statement, 'utf8'))];
                    case 7:
                        signOutPayload = _a.sent();
                        loginBody = sdk_1.TorqueSDK.constructLoginBody({
                            authType: 'basic',
                            pubKey: this.signer.publicKey.toString(),
                            payload: {
                                input: signPayloadInput.payload.statement,
                                output: Buffer.from(signOutPayload).toString('base64'),
                            },
                        });
                        return [3 /*break*/, 9];
                    case 8:
                        signature = tweetnacl_1.default.sign.detached(Buffer.from(signPayloadInput.payload.statement, 'utf8'), this.signer.secretKey);
                        loginBody = sdk_1.TorqueSDK.constructLoginBody({
                            authType: 'basic',
                            pubKey: this.signer.publicKey.toString(),
                            payload: {
                                input: signPayloadInput.payload.statement,
                                output: Buffer.from(signature).toString('base64'),
                            },
                        });
                        _a.label = 9;
                    case 9: return [3 /*break*/, 11];
                    case 10:
                        if (userAuth) {
                            loginBody = userAuth;
                        }
                        _a.label = 11;
                    case 11:
                        if (!loginBody) return [3 /*break*/, 13];
                        return [4 /*yield*/, this.login(loginBody)];
                    case 12:
                        verifiedUser = _a.sent();
                        this.user = verifiedUser;
                        this.initialized = true;
                        return [2 /*return*/, this.user];
                    case 13: throw new Error('There was an error logging in.');
                    case 14: return [3 /*break*/, 16];
                    case 15:
                        error_2 = _a.sent();
                        // TODO: Unset user if not verified
                        console.error(error_2);
                        throw new Error('There was an error initializing the user.');
                    case 16: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Authenticate the user with the torque API with the provided user signature object.
     *
     * @param {ApiInputLogin} loginOptions - The verification object that is required to authenticate a user with Torque.
     *
     * @returns {Promise<ApiVerifiedUser>} A Promise that resolves to an object containing the user information.
     *
     * @throws {Error} Throws an error if there is an error authenticating the user.
     */
    TorqueUserClient.prototype.login = function (loginOptions) {
        return __awaiter(this, void 0, void 0, function () {
            var result, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.client) {
                            throw new Error('The client is not initialized.');
                        }
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.client.apiFetch(constants_1.TORQUE_API_ROUTES.login, {
                                method: 'POST',
                                body: JSON.stringify(loginOptions),
                            })];
                    case 2:
                        result = _a.sent();
                        return [2 /*return*/, result];
                    case 3:
                        error_3 = _a.sent();
                        console.error(error_3);
                        throw new Error('There was an error logging in.');
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Logout the user from the Torque API.
     *
     * @throws {Error} Throws an error if the client is not initialized or if there is an error logging out the user.
     */
    TorqueUserClient.prototype.logout = function () {
        if (!this.client) {
            throw new Error('The client was not initialized.');
        }
        if (!this.user) {
            throw new Error('There is no user signed in.');
        }
        // TODO: unset client
        // TODO: add logout endpoint to API?
        // TOOD: clear coookies?
        this.publisherHandle = undefined;
        this.initialized = false;
        this.user = undefined;
    };
    /**
     * ========================================================================
     * USER
     * ========================================================================
     */
    /**
     * Rereshes the user's information from the Torque API.
     *
     * @returns {Promise<ApiVerifiedUser | undefined>} A promise that resolves to the user if they are signed in, otherwise undefined.
     */
    TorqueUserClient.prototype.refreshUser = function () {
        return __awaiter(this, void 0, void 0, function () {
            var result, error_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.client) {
                            throw new Error('The client is not initialized.');
                        }
                        if (!(this.user && this.initialized)) return [3 /*break*/, 5];
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.client.apiFetch(constants_1.TORQUE_API_ROUTES.currentUser, {
                                method: 'GET',
                            })];
                    case 2:
                        result = _a.sent();
                        if (result) {
                            this.user = result;
                            return [2 /*return*/, result];
                        }
                        // TODO: Unset user if not verified or no result
                        return [2 /*return*/, undefined];
                    case 3:
                        error_4 = _a.sent();
                        console.error(error_4);
                        throw new Error('There was an error checking refreshing the user.');
                    case 4: return [3 /*break*/, 6];
                    case 5: throw new Error('The user is not signed in.');
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Checks to see if the user is already logged into the Torque API.
     *
     * @returns {Promise<ApiVerifiedUser | undefined>} A promise that resolves to the user if they are signed in, otherwise undefined.
     *
     * @throws {Error} Throws an error if checking the user's login status fails.
     */
    TorqueUserClient.prototype.getCurrentUser = function () {
        return __awaiter(this, void 0, void 0, function () {
            var result, error_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.client) {
                            throw new Error('The client is not initialized.');
                        }
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        if (this.user) {
                            return [2 /*return*/, this.user];
                        }
                        return [4 /*yield*/, this.client.apiFetch(constants_1.TORQUE_API_ROUTES.currentUser, {
                                method: 'GET',
                            })];
                    case 2:
                        result = _a.sent();
                        if (result) {
                            this.user = result;
                            this.initialized = true;
                            return [2 /*return*/, result];
                        }
                        return [2 /*return*/, undefined];
                    case 3:
                        error_5 = _a.sent();
                        console.error(error_5);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/, undefined];
                }
            });
        });
    };
    /**
     * Retrieves the user's handle.
     *
     * @returns The user's handle or `undefined` if no handle is available.
     */
    TorqueUserClient.prototype.getUserHandle = function () {
        if (this.user) {
            var handle = this.user.username || this.user.twitter || this.user.pubKey || this.user.publisherPubKey;
            return handle;
        }
        return undefined;
    };
    /**
     * ========================================================================
     * CAMPAIGNS
     * ========================================================================
     */
    /**
     * Retrieves a list of active campaigns from the Torque API that the user is eligible to participate in.
     *
     * @returns {Promise<ApiCampaign[]>} A Promise resolving to an array of `ApiCampaign` objects representing the active campaigns.
     *
     * @throws {Error} An error if the fetch operation fails, or if the API returns a status other than "SUCCESS".
     */
    TorqueUserClient.prototype.getCampaigns = function () {
        return __awaiter(this, void 0, void 0, function () {
            var params, result, error_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.client) {
                            throw new Error('The client is not initialized.');
                        }
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        params = this.publisherHandle
                            ? new URLSearchParams({ publisher: this.publisherHandle, status: 'ACTIVE' })
                            : new URLSearchParams({ status: 'ACTIVE' });
                        return [4 /*yield*/, this.client.apiFetch("".concat(constants_1.TORQUE_API_ROUTES.userCampaigns, "?").concat(params.toString()), {
                                method: 'GET',
                                headers: {
                                    'Content-Type': 'application/json',
                                },
                            })];
                    case 2:
                        result = _a.sent();
                        return [2 /*return*/, result];
                    case 3:
                        error_6 = _a.sent();
                        console.error(error_6);
                        throw new Error("There was an error getting user's eligible campaigns.");
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Accepts a campaign for the current user.
     *
     * @param {string} campaignId - The ID of the campaign to accept.
     * @param {string} publisherHandle - The handle of the publisher to accept the campaign for.
     *
     * @returns {Promise<ApiUserJourney>} A Promise that resolves to the journey data for the campaign.
     *
     * @throws {Error} Throws an error if the client is not initialized or if there is an error accepting the campaign.
     */
    TorqueUserClient.prototype.acceptCampaign = function (campaignId, publisherHandle) {
        return __awaiter(this, void 0, void 0, function () {
            var result, error_7;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.client) {
                            throw new Error('The client is not initialized.');
                        }
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.client.apiFetch(constants_1.TORQUE_API_ROUTES.journey, {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json',
                                },
                                body: JSON.stringify({ campaignId: campaignId, publisherHandle: publisherHandle }),
                            })];
                    case 2:
                        result = _a.sent();
                        return [2 /*return*/, result];
                    case 3:
                        error_7 = _a.sent();
                        console.error(error_7);
                        throw new Error('There was an error accepting the campaign.');
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
     * Checks to see if the user is a publisher.
     *
     * @returns {boolean} True if the user is a publisher, false otherwise.
     *
     * @throws {Error} Throws an error if the user is not signed in.
     */
    TorqueUserClient.prototype.isPublisher = function () {
        if (!this.user) {
            throw new Error('The user is not signed in.');
        }
        return this.user && this.user.isPublisher ? true : false;
    };
    /**
     * Generates a URL for a user's shared link for a specific campaign.
     *
     * @param {string} campaignId - The unique identifier for the campaign.
     *
     * @returns {string} A promise that resolves to the URL string of the user's shared link for the campaign.
     *
     * @throws {Error} Throws an error if the user is not a publisher or does not have a handle.
     */
    TorqueUserClient.prototype.getUserShareLink = function (campaignId) {
        var handle = this.getUserHandle();
        var isPublisher = this.isPublisher();
        if (handle && isPublisher) {
            return "".concat(constants_1.TORQUE_SHARE_URL, "/").concat(handle, "/").concat(campaignId);
        }
        else {
            throw new Error('The user is not a publisher.');
        }
    };
    /**
     * Get the publisher PDA for the current user.
     *
     * @returns {PublicKey} The publisher PDA for the current user.
     */
    TorqueUserClient.prototype.getPublisherPda = function () {
        var _a, _b;
        if ((_a = this.user) === null || _a === void 0 ? void 0 : _a.publisherPubKey) {
            return new web3_js_1.PublicKey(this.user.publisherPubKey);
        }
        else if (this.user && this.isPublisher()) {
            var seeds = [Buffer.from('publisher'), Buffer.from((_b = this.user) === null || _b === void 0 ? void 0 : _b.pubKey)];
            var publisherPda = web3_js_1.PublicKey.findProgramAddressSync(seeds, constants_1.torquePubkey)[0];
            return publisherPda;
        }
    };
    /**
     * Get the balance of the publisher PDA for the current user.
     *
     * @returns {Promise<number>} The balance of the publisher PDA for the current user in lamports.
     */
    TorqueUserClient.prototype.getPublisherBalance = function () {
        return __awaiter(this, void 0, void 0, function () {
            var pda, balance, rentExemptBalance, maxTransferable;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        pda = this.getPublisherPda();
                        if (!pda) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.connection.getBalance(pda)];
                    case 1:
                        balance = _a.sent();
                        return [4 /*yield*/, this.connection.getMinimumBalanceForRentExemption(constants_1.PUBLISHER_ACCOUNT_SIZE)];
                    case 2:
                        rentExemptBalance = _a.sent();
                        maxTransferable = balance - rentExemptBalance;
                        return [2 /*return*/, maxTransferable];
                    case 3: return [2 /*return*/, 0];
                }
            });
        });
    };
    /**
     * Fetches all of the user's share links that they have previously created.
     *
     * @returns {Promise<ApiLinks>} A Promise resolving to the URLs of the user's share links.
     *
     * @throws {Error} An error if the link fetch fails.
     */
    TorqueUserClient.prototype.getAllUserShareLinks = function () {
        return __awaiter(this, void 0, void 0, function () {
            var result, error_8;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.client) {
                            throw new Error('The client is not initialized.');
                        }
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.client.apiFetch(constants_1.TORQUE_API_ROUTES.links, {
                                method: 'GET',
                            })];
                    case 2:
                        result = _a.sent();
                        return [2 /*return*/, result];
                    case 3:
                        error_8 = _a.sent();
                        console.error(error_8);
                        throw new Error('There was an error getting the shared link data.');
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    // TODO: set user publisher when txn is executed
    TorqueUserClient.prototype.setUserPublisher = function () { };
    /**
     * ========================================================================
     * SHARED LINK
     * ========================================================================
     */
    /**
     * Retrieves the data for an offer link for a specific campaign and handle.
     *
     * @param {string} campaignId - The unique identifier for the campaign.
     * @param {string} handle - The specific handle associated with the shared link.
     *
     * @returns {Promise<ApiShare>} The data associated with the shared link if the request is successful.
     *
     * @throws {Error} Throws an error there was an error getting the shared link data.
     */
    TorqueUserClient.prototype.getSharedLinkData = function (campaignId, handle) {
        return __awaiter(this, void 0, void 0, function () {
            var params, result, error_9;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.client) {
                            throw new Error('The client is not initialized.');
                        }
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        params = new URLSearchParams({ campaignId: campaignId, handle: handle });
                        return [4 /*yield*/, this.client.apiFetch("".concat(constants_1.TORQUE_API_ROUTES.share, "?").concat(params.toString()), {
                                method: 'GET',
                            })];
                    case 2:
                        result = _a.sent();
                        return [2 /*return*/, result];
                    case 3:
                        error_9 = _a.sent();
                        console.error(error_9);
                        throw new Error('There was an error getting the shared link data.');
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    return TorqueUserClient;
}());
exports.TorqueUserClient = TorqueUserClient;
