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

[src/types/audience.ts:41](https://github.com/torque-labs/torque-ts-sdk/blob/35180ea2561c531d50df4b23b7bd32172a5fdc80/src/types/audience.ts#L41)
