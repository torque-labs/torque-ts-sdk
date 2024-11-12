[**@torque-labs/torque-ts-sdk**](../README.md) • **Docs**

***

[@torque-labs/torque-ts-sdk](../globals.md) / ApiCampaignJourney

# Type Alias: ApiCampaignJourney

> **ApiCampaignJourney**: `object`

A user's campaign journey data.

## Type declaration

| Name | Type |
| ------ | ------ |
| `campaign` | [`ApiCampaign`](ApiCampaign.md) |
| `campaignId` | `string` |
| `currentStep` | `number` |
| `publisherPubKey` | `string` |
| `startTime`? | `Date` |
| `startTx`? | `string` |
| `status` | [`ApiProgressStatus`](../enumerations/ApiProgressStatus.md) |
| `totalSteps` | `number` |
| `transaction`? | `string` |
| `updatedAt` | `Date` |
| `userBountySteps`? | `object`[] |
| `userPubKey` | `string` |

## Defined in

[src/types/api.ts:278](https://github.com/torque-labs/torque-ts-sdk/blob/e34efdf278512e8a58bacdba966e9cd90b1db20a/src/types/api.ts#L278)
