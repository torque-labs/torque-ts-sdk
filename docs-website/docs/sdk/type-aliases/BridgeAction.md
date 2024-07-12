# Type alias: BridgeAction

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

### direction

```ts
direction: "INBOUND" | "OUTBOUND";
```

### maxAmount?

```ts
optional maxAmount: number;
```

### minAmount?

```ts
optional minAmount: number;
```

### mint

```ts
mint: string;
```

### withinDays?

```ts
optional withinDays: number;
```

## Source

[src/types/audience.ts:45](https://github.com/torque-labs/torque-ts-sdk/blob/c95828d99ae8c726ef550803d1dbba9bc4dfc9f3/src/types/audience.ts#L45)
