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

[src/types/audience.ts:45](https://github.com/torque-labs/torque-ts-sdk/blob/60b058a1261e69e5eb8f4ad7130e050df24bb92d/src/types/audience.ts#L45)
