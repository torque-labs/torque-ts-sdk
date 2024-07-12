# Type alias: ApiCampaignJourney

```ts
type ApiCampaignJourney: {
  campaign: ApiCampaign;
  campaignId: string;
  currentStep: number;
  publisherPubKey: string;
  status: ApiProgressStatus;
  totalSteps: number;
  transaction: string;
  userPubKey: string;
};
```

A user's campaign journey data.

## Type declaration

### campaign

```ts
campaign: ApiCampaign;
```

### campaignId

```ts
campaignId: string;
```

### currentStep

```ts
currentStep: number;
```

### publisherPubKey

```ts
publisherPubKey: string;
```

### status

```ts
status: ApiProgressStatus;
```

### totalSteps

```ts
totalSteps: number;
```

### transaction?

```ts
optional transaction: string;
```

### userPubKey

```ts
userPubKey: string;
```

## Source

[src/types/api.ts:225](https://github.com/torque-labs/torque-ts-sdk/blob/c95828d99ae8c726ef550803d1dbba9bc4dfc9f3/src/types/api.ts#L225)
