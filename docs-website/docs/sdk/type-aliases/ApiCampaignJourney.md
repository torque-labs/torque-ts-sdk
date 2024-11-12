# Type Alias: ApiCampaignJourney

```ts
type ApiCampaignJourney: {
  campaign: ApiCampaign;
  campaignId: string;
  currentStep: number;
  publisherPubKey: string;
  startTime: Date;
  startTx: string;
  status: ApiProgressStatus;
  totalSteps: number;
  transaction: string;
  updatedAt: Date;
  userBountySteps: {
     bountyStepId: string;
     id: string;
     status: ApiProgressStatus;
     transaction: string;
     userJourneyId: string;
    }[];
  userPubKey: string;
};
```

A user's campaign journey data.

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

`campaign`

</td>
<td>

[`ApiCampaign`](ApiCampaign.md)

</td>
</tr>
<tr>
<td>

`campaignId`

</td>
<td>

`string`

</td>
</tr>
<tr>
<td>

`currentStep`

</td>
<td>

`number`

</td>
</tr>
<tr>
<td>

`publisherPubKey`

</td>
<td>

`string`

</td>
</tr>
<tr>
<td>

`startTime`?

</td>
<td>

`Date`

</td>
</tr>
<tr>
<td>

`startTx`?

</td>
<td>

`string`

</td>
</tr>
<tr>
<td>

`status`

</td>
<td>

[`ApiProgressStatus`](../enumerations/ApiProgressStatus.md)

</td>
</tr>
<tr>
<td>

`totalSteps`

</td>
<td>

`number`

</td>
</tr>
<tr>
<td>

`transaction`?

</td>
<td>

`string`

</td>
</tr>
<tr>
<td>

`updatedAt`

</td>
<td>

`Date`

</td>
</tr>
<tr>
<td>

`userBountySteps`?

</td>
<td>

\{
  `bountyStepId`: `string`;
  `id`: `string`;
  `status`: [`ApiProgressStatus`](../enumerations/ApiProgressStatus.md);
  `transaction`: `string`;
  `userJourneyId`: `string`;
 \}[]

</td>
</tr>
<tr>
<td>

`userPubKey`

</td>
<td>

`string`

</td>
</tr>
</tbody>
</table>

## Defined in

[torque-ts-sdk/src/types/api.ts:278](https://github.com/torque-labs/torque-ts-sdk/blob/e34efdf278512e8a58bacdba966e9cd90b1db20a/src/types/api.ts#L278)
