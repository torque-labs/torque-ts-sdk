# Type Alias: TxnInput

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

## Defined in

[torque-ts-sdk/src/types/transactions.ts:30](https://github.com/torque-labs/torque-ts-sdk/blob/e34efdf278512e8a58bacdba966e9cd90b1db20a/src/types/transactions.ts#L30)
