# Type alias: CampaignAnalytics

```ts
type CampaignAnalytics: {
  conversions: {
     15min: ConversionTime[];
     1d: ConversionTime[];
     1hr: ConversionTime[];
    };
  counts: {
     converted: number;
     started: number;
    };
  payouts: {
     amount: number;
     count: number;
    };
  starts: {
     15min: ConversionTime[];
     1d: ConversionTime[];
     1hr: ConversionTime[];
    };
  volume: number | null;
};
```

Campaign analytics type retrieved from the API.

## Type declaration

### conversions

```ts
conversions: {
  15min: ConversionTime[];
  1d: ConversionTime[];
  1hr: ConversionTime[];
};
```

### conversions.15min

```ts
15min: ConversionTime[];
```

### conversions.1d

```ts
1d: ConversionTime[];
```

### conversions.1hr

```ts
1hr: ConversionTime[];
```

### counts

```ts
counts: {
  converted: number;
  started: number;
};
```

### counts.converted

```ts
converted: number;
```

### counts.started

```ts
started: number;
```

### payouts

```ts
payouts: {
  amount: number;
  count: number;
};
```

### payouts.amount

```ts
amount: number;
```

### payouts.count

```ts
count: number;
```

### starts

```ts
starts: {
  15min: ConversionTime[];
  1d: ConversionTime[];
  1hr: ConversionTime[];
};
```

### starts.15min

```ts
15min: ConversionTime[];
```

### starts.1d

```ts
1d: ConversionTime[];
```

### starts.1hr

```ts
1hr: ConversionTime[];
```

### volume?

```ts
optional volume: number | null;
```

## Source

[src/types/analytics.ts:12](https://github.com/torque-labs/torque-ts-sdk/blob/4377d91cff1aa0b27936cb53a23174cb35cc6c04/src/types/analytics.ts#L12)
