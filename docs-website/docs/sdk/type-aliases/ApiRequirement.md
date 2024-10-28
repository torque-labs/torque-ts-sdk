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

[src/types/api.ts:473](https://github.com/torque-labs/torque-ts-sdk/blob/2e5f57950645ce53fe6b770ba8048e80e413132e/src/types/api.ts#L473)
