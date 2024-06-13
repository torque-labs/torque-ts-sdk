import { Audience, Operation, TargetType } from "../../src/types"

export const smbAndMadLadHolder: Audience = {
    "operation": Operation.AND,
    "targets": [
        {
            "targetType": TargetType.TOKEN_HOLDING,
            "requirement": {
                "collectionAddress": "SMBtHCCC6RYRutFEPb4gZqeBLUZbMNhRKaMKZZLHi7W"
            }
        },
        {
            "targetType": TargetType.TOKEN_HOLDING,
            "requirement": {
                "collectionAddress": "J1S9H3QjnRtBbbuD4HjPV6RpRhwuk4zKbxsnCHuTgh9w"
            }
        }
    ],
    "audiences": []
};

export const smbOrMadLadHolder: Audience = {
    "operation": Operation.OR,
    "targets": [
        {
            "targetType": TargetType.TOKEN_HOLDING,
            "requirement": {
                "collectionAddress": "SMBtHCCC6RYRutFEPb4gZqeBLUZbMNhRKaMKZZLHi7W"
            }
        },
        {
            "targetType": TargetType.TOKEN_HOLDING,
            "requirement": {
                "collectionAddress": "J1S9H3QjnRtBbbuD4HjPV6RpRhwuk4zKbxsnCHuTgh9w"
            }
        }
    ],
    "audiences": []
};