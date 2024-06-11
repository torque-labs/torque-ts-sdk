"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
exports.TorqueSDK = void 0;
var admin_1 = require("./admin");
var audience_1 = require("./audience");
var user_1 = require("./user");
var constants_1 = require("../constants");
/**
 * The official Torque Typescript SDK.
 *
 * The TorqueSDK class is used to manage the user and api clients for the Torque API.
 *
 * @example
 * const sdk = new TorqueSDK({
 *   signer: <wallet adapter or keypair>,
 *   apiKey: "<your-api-key>",
 *   publisherHandle: "<your-publisher-handle>",
 * });
 *
 * // See if user is already logged in
 * const currentUser = await sdk.user.getCurrentUser();
 *
 * // Authenticate the user if not logged in
 * const user = currentUser
 *   ? currentUser
 *   : await sdk.user.initializeUser(ApiInputLogin);
 */
var TorqueSDK = /** @class */ (function () {
    /**
     * Initializes the TorqueSDK with the provided options.
     *
     * @param {TorqueSDKOptions} options - The options for the TorqueSDK.
     *
     * @throws {Error} Throws an error if the there is no api key or publisher handle provided.
     */
    function TorqueSDK(options) {
        if (!options.apiKey && !options.publisherHandle) {
            throw new Error('You must provide an API key or a publisher handle.');
        }
        this.apiKey = options.apiKey;
        this.publisherHandle = options.publisherHandle;
        this.rpc = options.rpc;
    }
    TorqueSDK.prototype.initialize = function (signer, ApiInputLogin) {
        return __awaiter(this, void 0, void 0, function () {
            var userClient, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        userClient = new user_1.TorqueUserClient({
                            signer: signer,
                            publisherHandle: this.publisherHandle,
                            rpc: this.rpc,
                        });
                        this.user = userClient;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.user.initializeUser(ApiInputLogin)];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        error_1 = _a.sent();
                        console.error(error_1);
                        throw new Error('There was an error initializing the Torque SDK.');
                    case 4:
                        if (this.apiKey) {
                            this.api = new admin_1.TorqueAdminClient({
                                signer: signer,
                                apiKey: this.apiKey,
                                userClient: userClient,
                            });
                            this.audience = new audience_1.TorqueAudienceClient({
                                signer: signer,
                                apiKey: this.apiKey,
                                userClient: userClient,
                            });
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Static method to verify the login options with the Torque API.
     *
     * @param {ApiInputLogin} loginOptions - The verification object that is required to authenticate a user with Torque.
     *
     * @returns {Promise<ApiVerifiedUser>} A Promise that resolves to an object containing the user information.
     *
     * @throws {Error} Throws an error if there is an error authenticating the user.
     */
    TorqueSDK.verifyLogin = function (loginOptions) {
        return __awaiter(this, void 0, void 0, function () {
            var response, result, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, fetch(constants_1.TORQUE_API_ROUTES.login, {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json',
                                },
                                body: JSON.stringify(loginOptions),
                            })];
                    case 1:
                        response = _a.sent();
                        return [4 /*yield*/, response.json()];
                    case 2:
                        result = (_a.sent());
                        if (result.status === 'SUCCESS') {
                            return [2 /*return*/, result.data];
                        }
                        else {
                            throw new Error(result.message);
                        }
                        return [3 /*break*/, 4];
                    case 3:
                        error_2 = _a.sent();
                        console.error(error_2);
                        throw new Error('There was an error verifying the login options.');
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * AUTHENTICATION HELPER METHODS
     */
    /**
     * Retrieves a sample SIWS payload for l ogging into the Torque API.
     *
     * @returns {Promise<ApiIdentifyPayload>} A Promise that resolves to the payload containing the identification statement, issued at time, and expiration time.
     *
     * @throws {Error} Throws an error if the API request is unsuccessful.
     */
    TorqueSDK.getLoginPayload = function () {
        return __awaiter(this, void 0, void 0, function () {
            var response, result, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, fetch(constants_1.TORQUE_API_ROUTES.identify, {
                                method: 'GET',
                                headers: {
                                    'Content-Type': 'application/json',
                                },
                            })];
                    case 1:
                        response = _a.sent();
                        return [4 /*yield*/, response.json()];
                    case 2:
                        result = (_a.sent());
                        if (result.status === 'SUCCESS') {
                            return [2 /*return*/, result.data];
                        }
                        else {
                            throw new Error(result.message);
                        }
                        return [3 /*break*/, 4];
                    case 3:
                        error_3 = _a.sent();
                        console.error(error_3);
                        throw new Error('There was an error getting the login payload.');
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Constructs the body for the login API request based on the authentication type.
     *
     * @param {ApiInputLogin} params - The parameters for constructing the login body.
     *
     * @returns The constructed body for the verify API request, formatted based on the authentication type.
     */
    TorqueSDK.constructLoginBody = function (params) {
        var payload = params.payload, authType = params.authType, pubKey = params.pubKey;
        var body = authType === 'siws'
            ? {
                authType: authType,
                pubKey: pubKey,
                payload: {
                    input: payload.input,
                    output: {
                        account: __assign(__assign({}, payload.output.account), { publicKey: Array.from(new Uint8Array(payload.output.account.publicKey)) }),
                        signature: new Uint8Array(payload.output.signature),
                        signedMessage: new Uint8Array(payload.output.signedMessage),
                    },
                },
            }
            : {
                authType: authType,
                pubKey: pubKey,
                payload: {
                    input: payload.input,
                    output: payload.output,
                },
            };
        return body;
    };
    return TorqueSDK;
}());
exports.TorqueSDK = TorqueSDK;
