# Type alias: ApiCampaignJourney

```ts
type ApiCampaignJourney: {
  campaign: ApiCampaign;
  campaignId: string;
  currentStep: number;
  publisherPubKey: string;
  startTime: Date;
  startTx: string;
  status: ApiProgressStatus;
  totalSteps: number;
  transaction: string;
  updatedAt: Date;
  userBountySteps: {
     bountyStepId: string;
     id: string;
     status: ApiProgressStatus;
     transaction: string;
     userJourneyId: string;
    }[];
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

### startTime?

```ts
optional startTime: Date;
```

### startTx?

```ts
optional startTx: string;
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

### updatedAt

```ts
updatedAt: Date;
```

### userBountySteps?

```ts
optional userBountySteps: {
  bountyStepId: string;
  id: string;
  status: ApiProgressStatus;
  transaction: string;
  userJourneyId: string;
 }[];
```

### userPubKey

```ts
userPubKey: string;
```

## Source

[src/types/api.ts:275](https://github.com/torque-labs/torque-ts-sdk/blob/4377d91cff1aa0b27936cb53a23174cb35cc6c04/src/types/api.ts#L275)
