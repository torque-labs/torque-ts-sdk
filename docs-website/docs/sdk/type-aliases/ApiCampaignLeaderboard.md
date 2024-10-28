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

[src/types/api.ts:244](https://github.com/torque-labs/torque-ts-sdk/blob/2e5f57950645ce53fe6b770ba8048e80e413132e/src/types/api.ts#L244)
