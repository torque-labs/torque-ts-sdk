[**@torque-labs/torque-ts-sdk**](../README.md) • **Docs**

***

[@torque-labs/torque-ts-sdk](../globals.md) / ApiCampaign

# Type Alias: ApiCampaign

> **ApiCampaign**: `object`

Campaign data.

## Type declaration

| Name | Type |
| ------ | ------ |
| `advertiser`? | `object` |
| `advertiser.profileImage`? | `string` \| `null` |
| `advertiser.twitter`? | `string` \| `null` |
| `advertiser.username`? | `string` \| `null` |
| `advertiserPubKey` | `string` |
| `asymmetricRewards` | `AsymmetricReward`[] |
| `audiences` | `object`[] |
| `blinkOnly`? | `boolean` |
| `content`? | `string` |
| `description`? | `string` |
| `endTime` | `Date` |
| `hideRewards` | `boolean` |
| `id` | `string` |
| `imageUrl`? | `string` |
| `lootBoxRewards`? | `LootBoxReward` & `object` |
| `offerBgImage`? | `string` |
| `offerLink`? | `string` |
| `offerTheme` | `OfferTheme` |
| `pendingConversions`? | `number` |
| `pubKey` | `string` |
| `publisherRewardAmount`? | `string` |
| `publisherRewardToken`? | `string` |
| `publisherRewardType`? | [`ApiRewardType`](../enumerations/ApiRewardType.md) |
| `remainingConversions` | `number` |
| `requirements` | [`ApiRequirement`](ApiRequirement.md)[] |
| `startTime` | `Date` |
| `status` | `string` |
| `targetLink`? | `string` |
| `title` | `string` |
| `totalConversions` | `number` |
| `type` | `string` |
| `userPayouts`? | `object`[] |
| `userRewardAmount`? | `string` |
| `userRewardToken`? | `string` |
| `userRewardType`? | [`ApiRewardType`](../enumerations/ApiRewardType.md) |

## Defined in

[src/types/api.ts:89](https://github.com/torque-labs/torque-ts-sdk/blob/e34efdf278512e8a58bacdba966e9cd90b1db20a/src/types/api.ts#L89)
