# Type Alias: ApiShare

```ts
type ApiShare: {
  campaign: {
     advertiser: {
        profileImage: string | null;
        twitter: string | null;
        username: string | null;
       };
     endTime: Date;
     id: string;
     imageUrl: string;
     startTime: Date;
     targetLink: string;
     title: string;
     type: string;
    };
  publisher: {
     profileImage: string | null;
     twitter: string | null;
     username: string | null;
    };
};
```

Share link data.

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

\{
  `advertiser`: \{
     `profileImage`: `string` \| `null`;
     `twitter`: `string` \| `null`;
     `username`: `string` \| `null`;
    \};
  `endTime`: `Date`;
  `id`: `string`;
  `imageUrl`: `string`;
  `startTime`: `Date`;
  `targetLink`: `string`;
  `title`: `string`;
  `type`: `string`;
 \}

</td>
</tr>
<tr>
<td>

`campaign.advertiser`

</td>
<td>

\{
  `profileImage`: `string` \| `null`;
  `twitter`: `string` \| `null`;
  `username`: `string` \| `null`;
 \}

</td>
</tr>
<tr>
<td>

`campaign.advertiser.profileImage`?

</td>
<td>

`string` \| `null`

</td>
</tr>
<tr>
<td>

`campaign.advertiser.twitter`?

</td>
<td>

`string` \| `null`

</td>
</tr>
<tr>
<td>

`campaign.advertiser.username`

</td>
<td>

`string` \| `null`

</td>
</tr>
<tr>
<td>

`campaign.endTime`

</td>
<td>

`Date`

</td>
</tr>
<tr>
<td>

`campaign.id`

</td>
<td>

`string`

</td>
</tr>
<tr>
<td>

`campaign.imageUrl`?

</td>
<td>

`string`

</td>
</tr>
<tr>
<td>

`campaign.startTime`

</td>
<td>

`Date`

</td>
</tr>
<tr>
<td>

`campaign.targetLink`?

</td>
<td>

`string`

</td>
</tr>
<tr>
<td>

`campaign.title`

</td>
<td>

`string`

</td>
</tr>
<tr>
<td>

`campaign.type`

</td>
<td>

`string`

</td>
</tr>
<tr>
<td>

`publisher`

</td>
<td>

\{
  `profileImage`: `string` \| `null`;
  `twitter`: `string` \| `null`;
  `username`: `string` \| `null`;
 \}

</td>
</tr>
<tr>
<td>

`publisher.profileImage`?

</td>
<td>

`string` \| `null`

</td>
</tr>
<tr>
<td>

`publisher.twitter`?

</td>
<td>

`string` \| `null`

</td>
</tr>
<tr>
<td>

`publisher.username`

</td>
<td>

`string` \| `null`

</td>
</tr>
</tbody>
</table>

## Defined in

[torque-ts-sdk/src/types/api.ts:177](https://github.com/torque-labs/torque-ts-sdk/blob/e34efdf278512e8a58bacdba966e9cd90b1db20a/src/types/api.ts#L177)
