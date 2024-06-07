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

[src/types/transactions.ts:40](https://github.com/torque-labs/torque-ts-sdk/blob/35180ea2561c531d50df4b23b7bd32172a5fdc80/src/types/transactions.ts#L40)
