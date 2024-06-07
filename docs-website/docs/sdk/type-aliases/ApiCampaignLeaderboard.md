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

[src/types/api.ts:182](https://github.com/torque-labs/torque-ts-sdk/blob/e7e20c5519300f3127faf1f4bde402ef91d14a40/src/types/api.ts#L182)
