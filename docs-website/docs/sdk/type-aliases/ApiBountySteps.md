# Type alias: ApiBountySteps

```ts
type ApiBountySteps: {
  campaign: {
     advertiserPubKey: string;
     asymmetricRewards: {
        amount: string;
        tokenAddress: string;
       }[];
     audiences: {
        config: Audience[];
        id: string;
        title: string;
       }[];
     content: string;
     description: string;
     endTime: Date;
     id: string;
     imageUrl: string;
     pubKey: string;
     publisherRewardAmount: number;
     publisherRewardToken: string;
     publisherRewardType: ApiRewardType;
     remainingConversions: number;
     requirements: ApiRequirement[];
     startTime: Date;
     status: string;
     targetLink: string;
     title: string;
     totalConversions: number;
     type: string;
     userRewardAmount: string;
     userRewardToken: string;
     userRewardType: ApiRewardType;
    };
};
```

Campaign data with bounty steps.

## Type declaration

### campaign

```ts
campaign: {
  advertiserPubKey: string;
  asymmetricRewards: {
     amount: string;
     tokenAddress: string;
    }[];
  audiences: {
     config: Audience[];
     id: string;
     title: string;
    }[];
  content: string;
  description: string;
  endTime: Date;
  id: string;
  imageUrl: string;
  pubKey: string;
  publisherRewardAmount: number;
  publisherRewardToken: string;
  publisherRewardType: ApiRewardType;
  remainingConversions: number;
  requirements: ApiRequirement[];
  startTime: Date;
  status: string;
  targetLink: string;
  title: string;
  totalConversions: number;
  type: string;
  userRewardAmount: string;
  userRewardToken: string;
  userRewardType: ApiRewardType;
};
```

### campaign.advertiserPubKey

```ts
advertiserPubKey: string;
```

### campaign.asymmetricRewards

```ts
asymmetricRewards: {
  amount: string;
  tokenAddress: string;
 }[];
```

### campaign.audiences

```ts
audiences: {
  config: Audience[];
  id: string;
  title: string;
 }[];
```

### campaign.content?

```ts
optional content: string;
```

### campaign.description?

```ts
optional description: string;
```

### campaign.endTime

```ts
endTime: Date;
```

### campaign.id

```ts
id: string;
```

### campaign.imageUrl?

```ts
optional imageUrl: string;
```

### campaign.pubKey

```ts
pubKey: string;
```

### campaign.publisherRewardAmount?

```ts
optional publisherRewardAmount: number;
```

### campaign.publisherRewardToken?

```ts
optional publisherRewardToken: string;
```

### campaign.publisherRewardType

```ts
publisherRewardType: ApiRewardType;
```

### campaign.remainingConversions

```ts
remainingConversions: number;
```

### campaign.requirements

```ts
requirements: ApiRequirement[];
```

### campaign.startTime

```ts
startTime: Date;
```

### campaign.status

```ts
status: string;
```

### campaign.targetLink?

```ts
optional targetLink: string;
```

### campaign.title

```ts
title: string;
```

### campaign.totalConversions

```ts
totalConversions: number;
```

### campaign.type

```ts
type: string;
```

### campaign.userRewardAmount

```ts
userRewardAmount: string;
```

### campaign.userRewardToken?

```ts
optional userRewardToken: string;
```

### campaign.userRewardType

```ts
userRewardType: ApiRewardType;
```

## Source

[src/types/api.ts:320](https://github.com/torque-labs/torque-ts-sdk/blob/06c96b69b43209c72870e94ce49516c9ed8e9158/src/types/api.ts#L320)
