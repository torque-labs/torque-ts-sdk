# Type Alias: TxnExecute

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

## Defined in

[torque-ts-sdk/src/types/transactions.ts:35](https://github.com/torque-labs/torque-ts-sdk/blob/e34efdf278512e8a58bacdba966e9cd90b1db20a/src/types/transactions.ts#L35)
