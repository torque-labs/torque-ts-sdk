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

[src/types/api.ts:219](https://github.com/torque-labs/torque-ts-sdk/blob/06c96b69b43209c72870e94ce49516c9ed8e9158/src/types/api.ts#L219)
