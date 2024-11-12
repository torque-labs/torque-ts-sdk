[**@torque-labs/torque-ts-sdk**](../README.md) • **Docs**

***

[@torque-labs/torque-ts-sdk](../globals.md) / CampaignAnalytics

# Type Alias: CampaignAnalytics

> **CampaignAnalytics**: `object`

Campaign analytics type retrieved from the API.

## Type declaration

| Name | Type |
| ------ | ------ |
| `conversions` | `object` |
| `conversions.15min` | [`ConversionTime`](ConversionTime.md)[] |
| `conversions.1d` | [`ConversionTime`](ConversionTime.md)[] |
| `conversions.1hr` | [`ConversionTime`](ConversionTime.md)[] |
| `counts` | `object` |
| `counts.converted` | `number` |
| `counts.started` | `number` |
| `payouts` | `object` |
| `payouts.amount` | `number` |
| `payouts.count` | `number` |
| `starts` | `object` |
| `starts.15min` | [`ConversionTime`](ConversionTime.md)[] |
| `starts.1d` | [`ConversionTime`](ConversionTime.md)[] |
| `starts.1hr` | [`ConversionTime`](ConversionTime.md)[] |
| `volume`? | `number` \| `null` |

## Defined in

[src/types/analytics.ts:12](https://github.com/torque-labs/torque-ts-sdk/blob/e34efdf278512e8a58bacdba966e9cd90b1db20a/src/types/analytics.ts#L12)
