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

[src/types/audience.ts:45](https://github.com/torque-labs/torque-ts-sdk/blob/06c96b69b43209c72870e94ce49516c9ed8e9158/src/types/audience.ts#L45)
