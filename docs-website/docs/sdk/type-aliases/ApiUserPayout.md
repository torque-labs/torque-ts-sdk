# Type alias: ApiUserPayout

```ts
type ApiUserPayout: {
  payouts: {
     amount: number;
     campaign: ApiCampaign;
     createdAt: Date;
     id: string;
     isRafflePayout: boolean;
     payoutTx: string | null;
     tokenAddress: string;
     userPubKey: string;
    }[];
};
```

User Payout data.

## Type declaration

### payouts

```ts
payouts: {
  amount: number;
  campaign: ApiCampaign;
  createdAt: Date;
  id: string;
  isRafflePayout: boolean;
  payoutTx: string | null;
  tokenAddress: string;
  userPubKey: string;
 }[];
```

## Source

[src/types/api.ts:250](https://github.com/torque-labs/torque-ts-sdk/blob/60b058a1261e69e5eb8f4ad7130e050df24bb92d/src/types/api.ts#L250)
