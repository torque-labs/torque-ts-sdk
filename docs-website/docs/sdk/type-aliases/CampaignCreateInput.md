# Type alias: CampaignCreateInput

```ts
type CampaignCreateInput: {
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
  userRewardType: POINTS | TOKENS;
  userTokenAddress: string;
};
```

Campaign create input.

## Type declaration

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
optional userRewardType: POINTS | TOKENS;
```

### userTokenAddress?

```ts
optional userTokenAddress: string;
```

## Source

[src/types/transactions.ts:15](https://github.com/torque-labs/torque-ts-sdk/blob/3bb7686d9ca1711cb29a16a45efd25d459673e82/src/types/transactions.ts#L15)
