# Type alias: ApiShare

```ts
type ApiShare: {
  campaign: {
     advertiser: {
        profileImage: string | null;
        twitter: string | null;
        username: string | null;
       };
     endTime: Date;
     id: string;
     startTime: Date;
     targetLink: string;
     title: string;
     type: string;
    };
  publisher: {
     profileImage: string | null;
     twitter: string | null;
     username: string | null;
    };
};
```

Share link data.

## Type declaration

### campaign

```ts
campaign: {
  advertiser: {
     profileImage: string | null;
     twitter: string | null;
     username: string | null;
    };
  endTime: Date;
  id: string;
  startTime: Date;
  targetLink: string;
  title: string;
  type: string;
};
```

### campaign.advertiser

```ts
advertiser: {
  profileImage: string | null;
  twitter: string | null;
  username: string | null;
};
```

### campaign.advertiser.profileImage?

```ts
optional profileImage: string | null;
```

### campaign.advertiser.twitter?

```ts
optional twitter: string | null;
```

### campaign.advertiser.username

```ts
username: string | null;
```

### campaign.endTime

```ts
endTime: Date;
```

### campaign.id

```ts
id: string;
```

### campaign.startTime

```ts
startTime: Date;
```

### campaign.targetLink?

```ts
optional targetLink: string;
```

### campaign.title

```ts
title: string;
```

### campaign.type

```ts
type: string;
```

### publisher

```ts
publisher: {
  profileImage: string | null;
  twitter: string | null;
  username: string | null;
};
```

### publisher.profileImage?

```ts
optional profileImage: string | null;
```

### publisher.twitter?

```ts
optional twitter: string | null;
```

### publisher.username

```ts
username: string | null;
```

## Source

[src/types/api.ts:118](https://github.com/torque-labs/torque-ts-sdk/blob/e7e20c5519300f3127faf1f4bde402ef91d14a40/src/types/api.ts#L118)
