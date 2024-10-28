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

[src/types/api.ts:310](https://github.com/torque-labs/torque-ts-sdk/blob/2e5f57950645ce53fe6b770ba8048e80e413132e/src/types/api.ts#L310)
