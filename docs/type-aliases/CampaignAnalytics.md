[**@torque-labs/torque-ts-sdk**](../README.md) • **Docs**

***

[@torque-labs/torque-ts-sdk](../README.md) / CampaignAnalytics

# Type Alias: CampaignAnalytics

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

| Name | Type |
| ------ | ------ |
| `conversions` | \{ `15min`: [`ConversionTime`](ConversionTime.md)[]; `1d`: [`ConversionTime`](ConversionTime.md)[]; `1hr`: [`ConversionTime`](ConversionTime.md)[]; \} |
| `conversions.15min` | [`ConversionTime`](ConversionTime.md)[] |
| `conversions.1d` | [`ConversionTime`](ConversionTime.md)[] |
| `conversions.1hr` | [`ConversionTime`](ConversionTime.md)[] |
| `counts` | \{ `converted`: `number`; `started`: `number`; \} |
| `counts.converted` | `number` |
| `counts.started` | `number` |
| `payouts` | \{ `amount`: `number`; `count`: `number`; \} |
| `payouts.amount` | `number` |
| `payouts.count` | `number` |
| `starts` | \{ `15min`: [`ConversionTime`](ConversionTime.md)[]; `1d`: [`ConversionTime`](ConversionTime.md)[]; `1hr`: [`ConversionTime`](ConversionTime.md)[]; \} |
| `starts.15min` | [`ConversionTime`](ConversionTime.md)[] |
| `starts.1d` | [`ConversionTime`](ConversionTime.md)[] |
| `starts.1hr` | [`ConversionTime`](ConversionTime.md)[] |
| `volume`? | `number` \| `null` |

## Defined in

[src/types/analytics.ts:12](https://github.com/torque-labs/torque-ts-sdk/blob/a30afeab92cb119627ec542f4c8aff2dd9faf383/src/types/analytics.ts#L12)
