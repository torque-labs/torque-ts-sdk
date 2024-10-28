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

[src/types/api.ts:310](https://github.com/torque-labs/torque-ts-sdk/blob/4377d91cff1aa0b27936cb53a23174cb35cc6c04/src/types/api.ts#L310)
