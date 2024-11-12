[**@torque-labs/torque-ts-sdk**](../README.md) • **Docs**

***

[@torque-labs/torque-ts-sdk](../README.md) / ApiCampaign

# Type Alias: ApiCampaign

```ts
type ApiCampaign: {
  advertiser: {
     profileImage: string | null;
     twitter: string | null;
     username: string | null;
    };
  advertiserPubKey: string;
  asymmetricRewards: AsymmetricReward[];
  audiences: {
     config: Audience[];
     id: string;
     title: string;
    }[];
  blinkOnly: boolean;
  content: string;
  description: string;
  endTime: Date;
  hideRewards: boolean;
  id: string;
  imageUrl: string;
  lootBoxRewards: LootBoxReward & {
     id: string;
    };
  offerBgImage: string;
  offerLink: string;
  offerTheme: OfferTheme;
  pendingConversions: number;
  pubKey: string;
  publisherRewardAmount: string;
  publisherRewardToken: string;
  publisherRewardType: ApiRewardType;
  remainingConversions: number;
  requirements: ApiRequirement[];
  startTime: Date;
  status: string;
  targetLink: string;
  title: string;
  totalConversions: number;
  type: string;
  userPayouts: {
     payoutTx: string | null;
     user: {
        profileImage: string | null;
        pubkey: string;
        twitter: string | null;
        username: string | null;
       };
    }[];
  userRewardAmount: string;
  userRewardToken: string;
  userRewardType: ApiRewardType;
};
```

Campaign data.

## Type declaration

| Name | Type |
| ------ | ------ |
| `advertiser`? | \{ `profileImage`: `string` \| `null`; `twitter`: `string` \| `null`; `username`: `string` \| `null`; \} |
| `advertiser.profileImage`? | `string` \| `null` |
| `advertiser.twitter`? | `string` \| `null` |
| `advertiser.username`? | `string` \| `null` |
| `advertiserPubKey` | `string` |
| `asymmetricRewards` | `AsymmetricReward`[] |
| `audiences` | \{ `config`: [`Audience`](Audience.md)[]; `id`: `string`; `title`: `string`; \}[] |
| `blinkOnly`? | `boolean` |
| `content`? | `string` |
| `description`? | `string` |
| `endTime` | `Date` |
| `hideRewards` | `boolean` |
| `id` | `string` |
| `imageUrl`? | `string` |
| `lootBoxRewards`? | `LootBoxReward` & \{ `id`: `string`; \} |
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
| `userPayouts`? | \{ `payoutTx`: `string` \| `null`; `user`: \{ `profileImage`: `string` \| `null`; `pubkey`: `string`; `twitter`: `string` \| `null`; `username`: `string` \| `null`; \}; \}[] |
| `userRewardAmount`? | `string` |
| `userRewardToken`? | `string` |
| `userRewardType`? | [`ApiRewardType`](../enumerations/ApiRewardType.md) |

## Defined in

[src/types/api.ts:89](https://github.com/torque-labs/torque-ts-sdk/blob/a30afeab92cb119627ec542f4c8aff2dd9faf383/src/types/api.ts#L89)
