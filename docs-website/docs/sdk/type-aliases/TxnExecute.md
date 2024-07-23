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

[src/types/transactions.ts:41](https://github.com/torque-labs/torque-ts-sdk/blob/06c96b69b43209c72870e94ce49516c9ed8e9158/src/types/transactions.ts#L41)
