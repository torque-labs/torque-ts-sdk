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
  eventType: ApiEventType;
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
eventType: ApiEventType;
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

[src/types/transactions.ts:15](https://github.com/torque-labs/torque-ts-sdk/blob/c95828d99ae8c726ef550803d1dbba9bc4dfc9f3/src/types/transactions.ts#L15)
