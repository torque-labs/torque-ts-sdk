[**@torque-labs/torque-ts-sdk**](../README.md) • **Docs**

***

[@torque-labs/torque-ts-sdk](../README.md) / ApiCampaignLeaderboard

# Type Alias: ApiCampaignLeaderboard

```ts
type ApiCampaignLeaderboard: {
  campaignName: string;
  leaderboard: {
     conversions: number;
     profileImage: string | null;
     user: string;
    }[];
};
```

Campaign leaderboard data.

## Type declaration

| Name | Type |
| ------ | ------ |
| `campaignName` | `string` |
| `leaderboard` | \{ `conversions`: `number`; `profileImage`: `string` \| `null`; `user`: `string`; \}[] |

## Defined in

[src/types/api.ts:247](https://github.com/torque-labs/torque-ts-sdk/blob/a30afeab92cb119627ec542f4c8aff2dd9faf383/src/types/api.ts#L247)
