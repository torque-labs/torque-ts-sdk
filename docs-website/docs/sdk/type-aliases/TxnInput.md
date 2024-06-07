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

[src/types/transactions.ts:35](https://github.com/torque-labs/torque-ts-sdk/blob/e7e20c5519300f3127faf1f4bde402ef91d14a40/src/types/transactions.ts#L35)
