[**@torque-labs/torque-ts-sdk**](../README.md) • **Docs**

***

[@torque-labs/torque-ts-sdk](../README.md) / ApiUserPayout

# Type Alias: ApiUserPayout

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

| Name | Type |
| ------ | ------ |
| `payouts` | \{ `amount`: `number`; `campaign`: [`ApiCampaign`](ApiCampaign.md); `createdAt`: `Date`; `id`: `string`; `isRafflePayout`: `boolean`; `payoutTx`: `string` \| `null`; `tokenAddress`: `string`; `userPubKey`: `string`; \}[] |

## Defined in

[src/types/api.ts:313](https://github.com/torque-labs/torque-ts-sdk/blob/a30afeab92cb119627ec542f4c8aff2dd9faf383/src/types/api.ts#L313)
