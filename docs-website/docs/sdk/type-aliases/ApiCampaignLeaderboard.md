# Type Alias: ApiCampaignLeaderboard

```ts
type ApiCampaignLeaderboard: {
  campaignName: string;
  leaderboard: {
     conversions: number;
     profileImage: string | null;
     user: string;
    }[];
};
```

Campaign leaderboard data.

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

`campaignName`

</td>
<td>

`string`

</td>
</tr>
<tr>
<td>

`leaderboard`

</td>
<td>

\{
  `conversions`: `number`;
  `profileImage`: `string` \| `null`;
  `user`: `string`;
 \}[]

</td>
</tr>
</tbody>
</table>

## Defined in

[torque-ts-sdk/src/types/api.ts:247](https://github.com/torque-labs/torque-ts-sdk/blob/e34efdf278512e8a58bacdba966e9cd90b1db20a/src/types/api.ts#L247)
