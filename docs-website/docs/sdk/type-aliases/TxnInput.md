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

[src/types/transactions.ts:35](https://github.com/torque-labs/torque-ts-sdk/blob/60b058a1261e69e5eb8f4ad7130e050df24bb92d/src/types/transactions.ts#L35)
