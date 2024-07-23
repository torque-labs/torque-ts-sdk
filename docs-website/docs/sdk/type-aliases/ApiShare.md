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
     imageUrl: string;
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
  imageUrl: string;
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

### campaign.imageUrl?

```ts
optional imageUrl: string;
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

[src/types/api.ts:123](https://github.com/torque-labs/torque-ts-sdk/blob/06c96b69b43209c72870e94ce49516c9ed8e9158/src/types/api.ts#L123)
