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

[src/types/api.ts:250](https://github.com/torque-labs/torque-ts-sdk/blob/c95828d99ae8c726ef550803d1dbba9bc4dfc9f3/src/types/api.ts#L250)
