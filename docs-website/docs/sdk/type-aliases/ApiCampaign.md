# Type alias: ApiCampaign

```ts
type ApiCampaign: {
  advertiser: {
     profileImage: string | null;
     twitter: string | null;
     username: string | null;
    };
  advertiserPubKey: string;
  asymmetricRewards: {
     amount: number;
     tokenAddress: string;
    }[];
  audiences: {
     id: string;
     title: string;
    }[];
  content: string;
  description: string;
  endTime: Date;
  id: string;
  imageUrl: string;
  offerLink: string;
  pubKey: string;
  publisherRewardAmount: number;
  publisherRewardToken: string;
  publisherRewardType: string;
  remainingConversions: number;
  startTime: Date;
  status: string;
  targetLink: string;
  title: string;
  totalConversions: number;
  type: string;
  userRewardAmount: number;
  userRewardToken: string;
};
```

Campaign data.

## Type declaration

### advertiser?

```ts
optional advertiser: {
  profileImage: string | null;
  twitter: string | null;
  username: string | null;
};
```

### advertiser.profileImage?

```ts
optional profileImage: string | null;
```

### advertiser.twitter?

```ts
optional twitter: string | null;
```

### advertiser.username?

```ts
optional username: string | null;
```

### advertiserPubKey

```ts
advertiserPubKey: string;
```

### asymmetricRewards

```ts
asymmetricRewards: {
  amount: number;
  tokenAddress: string;
 }[];
```

### audiences

```ts
audiences: {
  id: string;
  title: string;
 }[];
```

### content?

```ts
optional content: string;
```

### description?

```ts
optional description: string;
```

### endTime

```ts
endTime: Date;
```

### id

```ts
id: string;
```

### imageUrl?

```ts
optional imageUrl: string;
```

### offerLink?

```ts
optional offerLink: string;
```

### pubKey

```ts
pubKey: string;
```

### publisherRewardAmount?

```ts
optional publisherRewardAmount: number;
```

### publisherRewardToken?

```ts
optional publisherRewardToken: string;
```

### publisherRewardType?

```ts
optional publisherRewardType: string;
```

### remainingConversions

```ts
remainingConversions: number;
```

### startTime

```ts
startTime: Date;
```

### status

```ts
status: string;
```

### targetLink?

```ts
optional targetLink: string;
```

### title

```ts
title: string;
```

### totalConversions

```ts
totalConversions: number;
```

### type

```ts
type: string;
```

### userRewardAmount?

```ts
optional userRewardAmount: number;
```

### userRewardToken?

```ts
optional userRewardToken: string;
```

## Source

[src/types/api.ts:76](https://github.com/torque-labs/torque-ts-sdk/blob/06c96b69b43209c72870e94ce49516c9ed8e9158/src/types/api.ts#L76)
