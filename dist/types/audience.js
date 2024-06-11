"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TargetType = exports.ActionType = exports.Operation = void 0;
/**
 * The operation type of an audience.
 */
var Operation;
(function (Operation) {
    Operation["AND"] = "AND";
    Operation["OR"] = "OR";
})(Operation || (exports.Operation = Operation = {}));
/**
 * The type of action that will be used to filter the addresses for a target.
 */
var ActionType;
(function (ActionType) {
    ActionType["SWAP"] = "SWAP";
    ActionType["VOTE"] = "VOTE";
    ActionType["PROGRAM_INTERACTION"] = "PROGRAM_INTERACTION";
    ActionType["NFT_MINT"] = "NFT_MINT";
    ActionType["BRIDGE"] = "BRIDGE";
})(ActionType || (exports.ActionType = ActionType = {}));
/**
 * TARGETS
 */
/**
 * The target type of an audience.
 */
var TargetType;
(function (TargetType) {
    TargetType["TOKEN_HOLDING"] = "TOKEN_HOLDING";
    TargetType["ACTION"] = "ACTION";
    TargetType["OPEN_POSITION"] = "OPEN_POSITION";
    TargetType["STAKED_SOL"] = "STAKED_SOL";
})(TargetType || (exports.TargetType = TargetType = {}));
