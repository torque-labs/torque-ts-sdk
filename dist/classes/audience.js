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
exports.TorqueAudienceClient = void 0;
var request_1 = require("./request");
var index_1 = require("../constants/index");
/**
 * The TorqueAudienceClient class is used to manage and verify audiencess for the Torque API.
 *
 * @example
 * const client = new TorqueAudienceClient(TorqueAudienceClientOptions);
 *
 * const audience = await client.buildAudience(<audienceData>);
 * const verified = await client.verifyAudience(audience);
 */
var TorqueAudienceClient = /** @class */ (function () {
    /**
     * Create a new instance of the TorqueAdminClient class with the provided API key.
     *
     * @param {TorqueAudienceClientOptions} options - The options for the TorqueAudienceClient.
     */
    function TorqueAudienceClient(options) {
        var signer = options.signer, apiKey = options.apiKey, userClient = options.userClient;
        this.client = new request_1.TorqueRequestClient(signer, apiKey);
        this.userClient = userClient;
    }
    /**
     * Builds an audience with the provided options.
     *
     * @param {BuildWorkerRequest} options - The options for the audience build.
     *
     * @returns {Promise<AudienceFunctionResponse>} The response from the API.
     *
     * @throws {Error} If there is an error building the audience.
     */
    TorqueAudienceClient.prototype.buildAudience = function (options) {
        return __awaiter(this, void 0, void 0, function () {
            var result, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.client) {
                            throw new Error('The client is not initialized.');
                        }
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.client.functionsFetch(index_1.TORQUE_FUNCTIONS_ROUTES.audience.build, {
                                method: 'POST',
                                body: JSON.stringify(options),
                            })];
                    case 2:
                        result = _a.sent();
                        return [2 /*return*/, result];
                    case 3:
                        error_1 = _a.sent();
                        console.error(error_1);
                        throw new Error('There was an error building the audience.');
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Verifies the current user with the provided audience.
     *
     * @param {Audience} audience - The options for the audience verification.
     *
     * @returns {Promise<boolean>} True if the user is verified with the audience, false otherwise.
     *
     * @throws {Error} If there is an error verifying the user with the audience.
     */
    TorqueAudienceClient.prototype.verifyAudience = function (audience) {
        return __awaiter(this, void 0, void 0, function () {
            var options, result, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.client) {
                            throw new Error('The client is not initialized.');
                        }
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        options = { audience: audience, publicKey: this.userClient.publicKey };
                        return [4 /*yield*/, this.client.functionsFetch(index_1.TORQUE_FUNCTIONS_ROUTES.audience.verify, {
                                method: 'POST',
                                body: JSON.stringify(options),
                            })];
                    case 2:
                        result = _a.sent();
                        return [2 /*return*/, result];
                    case 3:
                        error_2 = _a.sent();
                        console.error(error_2);
                        throw new Error('There was an error verifying the user with the audience.');
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    return TorqueAudienceClient;
}());
exports.TorqueAudienceClient = TorqueAudienceClient;
