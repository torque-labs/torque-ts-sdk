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

[src/types/audience.ts:41](https://github.com/torque-labs/torque-ts-sdk/blob/e7e20c5519300f3127faf1f4bde402ef91d14a40/src/types/audience.ts#L41)
