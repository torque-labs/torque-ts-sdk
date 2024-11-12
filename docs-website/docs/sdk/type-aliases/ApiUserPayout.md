# Type Alias: ApiUserPayout

```ts
type ApiUserPayout: {
  payouts: {
     amount: number;
     campaign: ApiCampaign;
     createdAt: Date;
     id: string;
     isRafflePayout: boolean;
     payoutTx: string | null;
     tokenAddress: string;
     userPubKey: string;
    }[];
};
```

User Payout data.

## Type declaration

<table>
<thead>
<tr>
<th>Name</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`payouts`

</td>
<td>

\{
  `amount`: `number`;
  `campaign`: [`ApiCampaign`](ApiCampaign.md);
  `createdAt`: `Date`;
  `id`: `string`;
  `isRafflePayout`: `boolean`;
  `payoutTx`: `string` \| `null`;
  `tokenAddress`: `string`;
  `userPubKey`: `string`;
 \}[]

</td>
</tr>
</tbody>
</table>

## Defined in

[torque-ts-sdk/src/types/api.ts:313](https://github.com/torque-labs/torque-ts-sdk/blob/e34efdf278512e8a58bacdba966e9cd90b1db20a/src/types/api.ts#L313)
