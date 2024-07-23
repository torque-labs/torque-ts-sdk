# Type alias: CampaignCreateInput

```ts
type CampaignCreateInput: {
  asymmetricRewards: null | {
     amount: number;
     tokenAddress: string;
    }[];
  audience: null | string;
  campaignName: string;
  campaignType: string;
  conversionCount: null | number;
  endTime: number;
  eventProgramAddress: string;
  eventTokenAddress: string;
  eventType: EventType;
  landingPage: string;
  minAmount: null | number;
  proposal: null | string;
  publisherPayoutPerConversion: number;
  publisherRewardType: ApiRewardType;
  publisherTokenAddress: string;
  startTime: number;
  userPayoutPerConversion: number;
  userRewardType: POINTS | TOKENS | ASYMMETRIC_REWARDS;
  userTokenAddress: string;
};
```

Campaign create input.

## Type declaration

### asymmetricRewards?

```ts
optional asymmetricRewards: null | {
  amount: number;
  tokenAddress: string;
 }[];
```

### audience?

```ts
optional audience: null | string;
```

### campaignName

```ts
campaignName: string;
```

### campaignType

```ts
campaignType: string;
```

### conversionCount?

```ts
optional conversionCount: null | number;
```

### endTime

```ts
endTime: number;
```

### eventProgramAddress?

```ts
optional eventProgramAddress: string;
```

### eventTokenAddress?

```ts
optional eventTokenAddress: string;
```

### eventType

```ts
eventType: EventType;
```

### landingPage

```ts
landingPage: string;
```

### minAmount?

```ts
optional minAmount: null | number;
```

### proposal?

```ts
optional proposal: null | string;
```

### publisherPayoutPerConversion

```ts
publisherPayoutPerConversion: number;
```

### publisherRewardType

```ts
publisherRewardType: ApiRewardType;
```

### publisherTokenAddress?

```ts
optional publisherTokenAddress: string;
```

### startTime

```ts
startTime: number;
```

### userPayoutPerConversion?

```ts
optional userPayoutPerConversion: number;
```

### userRewardType?

```ts
optional userRewardType: POINTS | TOKENS | ASYMMETRIC_REWARDS;
```

### userTokenAddress?

```ts
optional userTokenAddress: string;
```

## Source

[src/types/transactions.ts:16](https://github.com/torque-labs/torque-ts-sdk/blob/06c96b69b43209c72870e94ce49516c9ed8e9158/src/types/transactions.ts#L16)
