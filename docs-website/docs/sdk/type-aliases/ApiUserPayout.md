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

[src/types/api.ts:244](https://github.com/torque-labs/torque-ts-sdk/blob/06c96b69b43209c72870e94ce49516c9ed8e9158/src/types/api.ts#L244)
