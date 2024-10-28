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

[src/types/api.ts:244](https://github.com/torque-labs/torque-ts-sdk/blob/4377d91cff1aa0b27936cb53a23174cb35cc6c04/src/types/api.ts#L244)
