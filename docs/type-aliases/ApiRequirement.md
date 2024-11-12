[**@torque-labs/torque-ts-sdk**](../README.md) • **Docs**

***

[@torque-labs/torque-ts-sdk](../README.md) / ApiRequirement

# Type Alias: ApiRequirement

```ts
type ApiRequirement: 
  | OfferSwapAction
  | OfferNFTTradeAction
  | OfferClickAction
  | OfferMemoAction
  | OfferTensorBuyAction
  | OfferTensorBidAction
  | OfferNftBidBuyAction
  | OfferCustomEventAction
  | OfferRealmsVoteAction
  | OfferMarginfiLendAction
  | OfferKaminoLendAction
  | OfferDriftBetAction
  | OfferDriftDepositAction
  | OfferStakeSolanaAction & {
  id: string;
};
```

Full bounty step requirement type.

## Type declaration

| Name | Type |
| ------ | ------ |
| `id`? | `string` |

## Defined in

[src/types/api.ts:474](https://github.com/torque-labs/torque-ts-sdk/blob/a30afeab92cb119627ec542f4c8aff2dd9faf383/src/types/api.ts#L474)
