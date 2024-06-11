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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TorqueRequestClient = void 0;
var web3_js_1 = require("@solana/web3.js");
var index_1 = require("../constants/index");
var index_2 = require("../types/index");
var utils_1 = require("../utils");
/**
 * The TorqueRequestClient class is used to make requests to the Torque API.
 * It provides methods for performing API requests and handling responses.
 *
 * @example
 * const client = new TorqueRequestClient(signer, apiKey);
 *
 * const response = await client.apiFetch<T>("https://api.torque.so/v1/users");
 */
var TorqueRequestClient = /** @class */ (function () {
    /**
     * Create a new instance of the TorqueRequestClient class.
     *
     * @param {Adapter | Keypair} signer - The signer used to sign transactions.
     * @param {string} apiKey - The API key for the client.
     *
     * @throws {Error} Throws an error if a signer is not provided.
     */
    function TorqueRequestClient(signer, apiKey) {
        if (!signer) {
            throw new Error('You need to provide a SignerWalletAdapter or Keypair in the signer parameter.');
        }
        this.signer = signer;
        this.apiKey = apiKey;
        this.apiAuthHeader = apiKey
            ? {
                'x-torque-api-key': "".concat(this.apiKey),
            }
            : {};
    }
    /**
     * Perform a regular request to any endpoint.
     *
     * @template {object} T - The type of the response data.
     *
     * @param {string} url - The URL of the API endpoint.
     * @param {RequestInit} options - The options for the request.
     *
     * @returns {Promise<T>} The response from the API.
     *
     * @throws {Error} If there is an error performing the request.
     */
    TorqueRequestClient.prototype.anyFetch = function (url, options) {
        return __awaiter(this, void 0, void 0, function () {
            var reqOptions, response, result, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        reqOptions = __assign(__assign({}, options), { mode: 'cors', headers: __assign({ 'Content-Type': 'application/json' }, options === null || options === void 0 ? void 0 : options.headers) });
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 4, , 5]);
                        return [4 /*yield*/, fetch(url, reqOptions)];
                    case 2:
                        response = _a.sent();
                        return [4 /*yield*/, response.json()];
                    case 3:
                        result = (_a.sent());
                        return [2 /*return*/, result];
                    case 4:
                        error_1 = _a.sent();
                        console.error(error_1);
                        throw new Error('There was an error performing the request.');
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Perform a request to the Torque API.
     *
     * @template {object} T - The type of the response data.
     *
     * @param {string} url - The URL of the API endpoint.
     * @param {RequestInit} options - The options for the request.
     *
     * @returns {Promise<T>} The response from the API.
     *
     * @throws {Error} If there is an error performing the request.
     */
    TorqueRequestClient.prototype.apiFetch = function (url, options) {
        return __awaiter(this, void 0, void 0, function () {
            var reqOptions, response, result, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        reqOptions = __assign(__assign({ credentials: 'include' }, options), { headers: __assign(__assign({ 'Content-Type': 'application/json' }, this.apiAuthHeader), options === null || options === void 0 ? void 0 : options.headers) });
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 4, , 5]);
                        return [4 /*yield*/, fetch(url, reqOptions)];
                    case 2:
                        response = _a.sent();
                        return [4 /*yield*/, response.json()];
                    case 3:
                        result = (_a.sent());
                        if (result.status === 'SUCCESS') {
                            return [2 /*return*/, result.data];
                        }
                        else {
                            throw new Error(result.message);
                        }
                        return [3 /*break*/, 5];
                    case 4:
                        error_2 = _a.sent();
                        console.error(error_2);
                        throw new Error('There was an error performing the request.');
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Perform a request to a Torque Function endpoint.
     *
     * @template {object} T - The type of the response data.
     *
     * @param {string} url - The URL of the API endpoint.
     * @param {RequestInit} options - The options for the request.
     *
     * @returns {Promise<AudienceFunctionResponse<T>>} The response from the API.
     *
     * @throws {Error} If there is an error performing the request.
     */
    TorqueRequestClient.prototype.functionsFetch = function (url, options) {
        return __awaiter(this, void 0, void 0, function () {
            var reqOptions, response, result, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        reqOptions = __assign(__assign({ credentials: 'include' }, options), { headers: __assign(__assign({ 'Content-Type': 'application/json' }, this.apiAuthHeader), options === null || options === void 0 ? void 0 : options.headers) });
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 4, , 5]);
                        return [4 /*yield*/, fetch(url, reqOptions)];
                    case 2:
                        response = _a.sent();
                        return [4 /*yield*/, response.json()];
                    case 3:
                        result = (_a.sent());
                        return [2 /*return*/, result];
                    case 4:
                        error_3 = _a.sent();
                        console.error(error_3);
                        throw new Error('There was an error performing the request.');
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Builds and returns a serialized transaction from the API based on the provided transaction input.
     *
     * @template {object} T - The type of the response data.
     *
     * @param {TxnInput} txnInput - The input object of the transaction to build.
     *
     * @returns {Promise<T>} A promise that resolves with the serialized transaction.
     *
     * @throws {Error} Throws an error if the API is not able to build the transaction.
     */
    TorqueRequestClient.prototype.buildTransaction = function (txnInput) {
        return __awaiter(this, void 0, void 0, function () {
            var data, txn, error_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        data = __assign(__assign(__assign(__assign({}, (txnInput.txnType === index_2.ApiTxnTypes.CampaignCreate ? { createCampaign: txnInput.data } : {})), (txnInput.txnType === index_2.ApiTxnTypes.CampaignEnd ? { endCampaign: txnInput.data } : {})), (txnInput.txnType === index_2.ApiTxnTypes.PublisherCreate
                            ? { createPublisher: txnInput.data }
                            : {})), (txnInput.txnType === index_2.ApiTxnTypes.PublisherPayout
                            ? { payoutPublisher: txnInput.data }
                            : {}));
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.apiFetch(index_1.TORQUE_API_ROUTES.transactions.build, {
                                method: 'POST',
                                body: JSON.stringify(__assign({}, data)),
                            })];
                    case 2:
                        txn = _a.sent();
                        return [2 /*return*/, txn];
                    case 3:
                        error_4 = _a.sent();
                        console.error(error_4);
                        throw new Error('Unable to prepare the transaction.');
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Executes the serialized transaction using the API.
     *
     * @param {TxnExecute} txnExecuteInput - The input object of the transaction to execute.
     *
     * @returns {Promise<TxnExecuteResponse>} A promise that resolves with the signature of the transaction.
     *
     * @throws {Error} Throws an error if the API request is unsuccessful or if the transaction fails.
     */
    TorqueRequestClient.prototype.executeTransaction = function (txnExecuteInput) {
        return __awaiter(this, void 0, void 0, function () {
            var data, txn, error_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        data = __assign(__assign(__assign(__assign({}, (txnExecuteInput.txnType === index_2.ApiTxnTypes.CampaignCreate
                            ? { createCampaign: txnExecuteInput.data }
                            : {})), (txnExecuteInput.txnType === index_2.ApiTxnTypes.CampaignEnd
                            ? { endCampaign: txnExecuteInput.data }
                            : {})), (txnExecuteInput.txnType === index_2.ApiTxnTypes.PublisherCreate
                            ? { createPublisher: txnExecuteInput.data }
                            : {})), (txnExecuteInput.txnType === index_2.ApiTxnTypes.PublisherPayout
                            ? { payoutPublisher: txnExecuteInput.data }
                            : {}));
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.apiFetch(index_1.TORQUE_API_ROUTES.transactions.execute, {
                                method: 'POST',
                                body: JSON.stringify(__assign({}, data)),
                            })];
                    case 2:
                        txn = _a.sent();
                        return [2 /*return*/, txn];
                    case 3:
                        error_5 = _a.sent();
                        console.error(error_5);
                        throw new Error('Unable to execute the transaction.');
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Builds and executes the transaction using the Torque API.
     *
     * @template {object} T - The type of the response data.
     *
     * @param {TxnInput} txnInput - The input object of the transaction to process.
     *
     * @returns {Promise<T & { signature: string }>} A promise that resolves with the signature of the transaction.
     */
    TorqueRequestClient.prototype.transaction = function (txnInput) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, serializedTx, rest, txn, signedTx, _b, userSignature, executeInput, signature, error_6;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        if (!this.signer) {
                            throw new Error('The signer is not initialized. You need to provide a SignerWalletAdapter or Keypair.');
                        }
                        _c.label = 1;
                    case 1:
                        _c.trys.push([1, 7, , 8]);
                        return [4 /*yield*/, this.buildTransaction(txnInput)];
                    case 2:
                        _a = _c.sent(), serializedTx = _a.serializedTx, rest = __rest(_a, ["serializedTx"]);
                        txn = web3_js_1.VersionedTransaction.deserialize((0, utils_1.base64ToUint8Array)(serializedTx));
                        if (!('signTransaction' in this.signer)) return [3 /*break*/, 4];
                        return [4 /*yield*/, this.signer.signTransaction(txn)];
                    case 3:
                        _b = _c.sent();
                        return [3 /*break*/, 5];
                    case 4:
                        _b = this.signWithKeypair(txn);
                        _c.label = 5;
                    case 5:
                        signedTx = _b;
                        userSignature = (0, utils_1.uint8ArrayToBase64)(signedTx.signatures[0]);
                        executeInput = {
                            txnType: txnInput.txnType,
                            data: __assign({ userSignature: userSignature, blockhash: txn.message.recentBlockhash }, rest),
                        };
                        return [4 /*yield*/, this.executeTransaction(executeInput)];
                    case 6:
                        signature = (_c.sent()).signature;
                        return [2 /*return*/, __assign({ signature: signature }, rest)];
                    case 7:
                        error_6 = _c.sent();
                        console.error(error_6);
                        throw new Error('The transaction was unable to be processed.');
                    case 8: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Signs a transaction with a Keypair.
     *
     * @param {VersionedTransaction} txn - The transaction to sign.
     *
     * @returns {VersionedTransaction} The signed transaction.
     *
     * @throws {Error} If the signer is not initialized or if the signer is not a Keypair.
     */
    TorqueRequestClient.prototype.signWithKeypair = function (txn) {
        if (!this.signer) {
            throw new Error('The signer is not initialized. You need to provide a SignerWalletAdapter or Keypair.');
        }
        if ('signTransaction' in this.signer) {
            throw new Error('This method is only for signing with a Keypair.');
        }
        var keypair = this.signer;
        txn.sign([keypair]);
        return txn;
    };
    return TorqueRequestClient;
}());
exports.TorqueRequestClient = TorqueRequestClient;
