# Type alias: TxnExecute

```ts
type TxnExecute: {
  data: {
     blockhash: string;
     campaignId: string;
     userSignature: string;
    };
  txnType: CampaignCreate | CampaignEnd;
 } | {
  data: TxnExecuteDefaults;
  txnType: string;
};
```

On-chain transaction execute input.

## Source

[src/types/transactions.ts:40](https://github.com/torque-labs/torque-ts-sdk/blob/e7e20c5519300f3127faf1f4bde402ef91d14a40/src/types/transactions.ts#L40)
