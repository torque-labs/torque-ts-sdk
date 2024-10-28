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

[src/types/transactions.ts:35](https://github.com/torque-labs/torque-ts-sdk/blob/4377d91cff1aa0b27936cb53a23174cb35cc6c04/src/types/transactions.ts#L35)
