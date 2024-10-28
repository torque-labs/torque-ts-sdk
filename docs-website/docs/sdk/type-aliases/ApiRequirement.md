# Type alias: ApiRequirement

```ts
type ApiRequirement: 
  | OfferSwapAction
  | OfferNFTTradeAction
  | OfferClickAction
  | OfferMemoAction
  | OfferTensorBuyAction
  | OfferTensorBidAction
  | NftBidBuyAction
  | OfferCustomEventAction
  | RealmsDaoVoteAction
  | OfferMarginfiLendAction
  | OfferKaminoLendAction
  | OfferDriftBetAction
  | OfferDriftDepositAction & {
  id: string;
};
```

Full bounty step requirement type.

## Type declaration

### id?

```ts
optional id: string;
```

## Source

[src/types/api.ts:473](https://github.com/torque-labs/torque-ts-sdk/blob/4377d91cff1aa0b27936cb53a23174cb35cc6c04/src/types/api.ts#L473)
