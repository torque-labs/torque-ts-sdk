/**
 * The operation type of an audience.
 */
export var Operation;
(function (Operation) {
    Operation["AND"] = "AND";
    Operation["OR"] = "OR";
})(Operation || (Operation = {}));
/**
 * The type of action that will be used to filter the addresses for a target.
 */
export var ActionType;
(function (ActionType) {
    ActionType["SWAP"] = "SWAP";
    ActionType["VOTE"] = "VOTE";
    ActionType["PROGRAM_INTERACTION"] = "PROGRAM_INTERACTION";
    ActionType["NFT_MINT"] = "NFT_MINT";
    ActionType["BRIDGE"] = "BRIDGE";
})(ActionType || (ActionType = {}));
/**
 * TARGETS
 */
/**
 * The target type of an audience.
 */
export var TargetType;
(function (TargetType) {
    TargetType["TOKEN_HOLDING"] = "TOKEN_HOLDING";
    TargetType["ACTION"] = "ACTION";
    TargetType["OPEN_POSITION"] = "OPEN_POSITION";
    TargetType["STAKED_SOL"] = "STAKED_SOL";
})(TargetType || (TargetType = {}));
//# sourceMappingURL=audience.js.map