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

[src/types/api.ts:189](https://github.com/torque-labs/torque-ts-sdk/blob/06c96b69b43209c72870e94ce49516c9ed8e9158/src/types/api.ts#L189)
