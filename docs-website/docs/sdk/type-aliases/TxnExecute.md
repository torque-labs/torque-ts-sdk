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

[src/types/transactions.ts:40](https://github.com/torque-labs/torque-ts-sdk/blob/3bb7686d9ca1711cb29a16a45efd25d459673e82/src/types/transactions.ts#L40)
