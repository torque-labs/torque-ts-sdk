[**@torque-labs/torque-ts-sdk**](../README.md) • **Docs**

***

[@torque-labs/torque-ts-sdk](../README.md) / BridgeAction

# Type Alias: BridgeAction

```ts
type BridgeAction: {
  direction: "INBOUND" | "OUTBOUND";
  maxAmount: number;
  minAmount: number;
  mint: string;
  withinDays: number;
};
```

Parameters for a bridge action.

## Type declaration

| Name | Type |
| ------ | ------ |
| `direction` | `"INBOUND"` \| `"OUTBOUND"` |
| `maxAmount`? | `number` |
| `minAmount`? | `number` |
| `mint` | `string` |
| `withinDays`? | `number` |

## Defined in

[src/types/audience.ts:45](https://github.com/torque-labs/torque-ts-sdk/blob/a30afeab92cb119627ec542f4c8aff2dd9faf383/src/types/audience.ts#L45)
