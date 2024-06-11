"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransactionType = exports.AdminTransactionTypes = exports.UserTransactionTypes = void 0;
var api_1 = require("../types/api");
var UserTransactionTypes = [api_1.ApiTxnTypes.PublisherCreate, api_1.ApiTxnTypes.PublisherPayout];
exports.UserTransactionTypes = UserTransactionTypes;
var AdminTransactionTypes = [api_1.ApiTxnTypes.CampaignCreate, api_1.ApiTxnTypes.CampaignEnd];
exports.AdminTransactionTypes = AdminTransactionTypes;
var TransactionType = __spreadArray(__spreadArray([], UserTransactionTypes, true), AdminTransactionTypes, true);
exports.TransactionType = TransactionType;
