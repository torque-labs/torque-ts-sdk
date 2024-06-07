# Type alias: TxnInput

```ts
type TxnInput: {
  data: CampaignCreateInputSchema;
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

[src/types/transactions.ts:35](https://github.com/torque-labs/torque-ts-sdk/blob/3bb7686d9ca1711cb29a16a45efd25d459673e82/src/types/transactions.ts#L35)
