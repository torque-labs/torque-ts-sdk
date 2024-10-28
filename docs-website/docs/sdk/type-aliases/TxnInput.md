# Type alias: TxnInput

```ts
type TxnInput: {
  data: CreateCampaignInputSchema;
  txnType: CampaignCreate;
 } | {
  data: CampaignEndInputSchema;
  txnType: CampaignEnd;
 } | {
  data: PublisherCreateInputSchema;
  txnType: PublisherCreate;
 } | {
  data: PublisherPayoutInputSchema;
  txnType: PublisherPayout;
};
```

On-chain transaction build input

## Source

[src/types/transactions.ts:30](https://github.com/torque-labs/torque-ts-sdk/blob/4377d91cff1aa0b27936cb53a23174cb35cc6c04/src/types/transactions.ts#L30)
