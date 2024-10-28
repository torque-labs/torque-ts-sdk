# Type alias: ApiCampaign

```ts
type ApiCampaign: {
  advertiser: {
     profileImage: string | null;
     twitter: string | null;
     username: string | null;
    };
  advertiserPubKey: string;
  asymmetricRewards: AsymmetricReward[];
  audiences: {
     config: Audience[];
     id: string;
     title: string;
    }[];
  blinkOnly: boolean;
  content: string;
  description: string;
  endTime: Date;
  id: string;
  imageUrl: string;
  offerBgImage: string;
  offerLink: string;
  offerTheme: OfferTheme;
  pendingConversions: number;
  pubKey: string;
  publisherRewardAmount: string;
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
  userPayouts: {
     payoutTx: string | null;
     user: {
        profileImage: string | null;
        pubkey: string;
        twitter: string | null;
        username: string | null;
       };
    }[];
  userRewardAmount: string;
  userRewardToken: string;
  userRewardType: ApiRewardType;
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
asymmetricRewards: AsymmetricReward[];
```

### audiences

```ts
audiences: {
  config: Audience[];
  id: string;
  title: string;
 }[];
```

### blinkOnly?

```ts
optional blinkOnly: boolean;
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

### offerBgImage?

```ts
optional offerBgImage: string;
```

### offerLink?

```ts
optional offerLink: string;
```

### offerTheme

```ts
offerTheme: OfferTheme;
```

### pendingConversions?

```ts
optional pendingConversions: number;
```

### pubKey

```ts
pubKey: string;
```

### publisherRewardAmount?

```ts
optional publisherRewardAmount: string;
```

### publisherRewardToken?

```ts
optional publisherRewardToken: string;
```

### publisherRewardType?

```ts
optional publisherRewardType: ApiRewardType;
```

### remainingConversions

```ts
remainingConversions: number;
```

### requirements

```ts
requirements: ApiRequirement[];
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

### userPayouts?

```ts
optional userPayouts: {
  payoutTx: string | null;
  user: {
     profileImage: string | null;
     pubkey: string;
     twitter: string | null;
     username: string | null;
    };
 }[];
```

### userRewardAmount?

```ts
optional userRewardAmount: string;
```

### userRewardToken?

```ts
optional userRewardToken: string;
```

### userRewardType?

```ts
optional userRewardType: ApiRewardType;
```

## Source

[src/types/api.ts:88](https://github.com/torque-labs/torque-ts-sdk/blob/4377d91cff1aa0b27936cb53a23174cb35cc6c04/src/types/api.ts#L88)
