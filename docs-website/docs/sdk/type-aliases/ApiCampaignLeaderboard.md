# Type alias: ApiCampaignLeaderboard

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

### campaignName

```ts
campaignName: string;
```

### leaderboard

```ts
leaderboard: {
  conversions: number;
  profileImage: string | null;
  user: string;
 }[];
```

## Source

[src/types/api.ts:195](https://github.com/torque-labs/torque-ts-sdk/blob/c95828d99ae8c726ef550803d1dbba9bc4dfc9f3/src/types/api.ts#L195)
