# Type Alias: CampaignAnalytics

```ts
type CampaignAnalytics: {
  conversions: {
     15min: ConversionTime[];
     1d: ConversionTime[];
     1hr: ConversionTime[];
    };
  counts: {
     converted: number;
     started: number;
    };
  payouts: {
     amount: number;
     count: number;
    };
  starts: {
     15min: ConversionTime[];
     1d: ConversionTime[];
     1hr: ConversionTime[];
    };
  volume: number | null;
};
```

Campaign analytics type retrieved from the API.

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

`conversions`

</td>
<td>

\{
  `15min`: [`ConversionTime`](ConversionTime.md)[];
  `1d`: [`ConversionTime`](ConversionTime.md)[];
  `1hr`: [`ConversionTime`](ConversionTime.md)[];
 \}

</td>
</tr>
<tr>
<td>

`conversions.15min`

</td>
<td>

[`ConversionTime`](ConversionTime.md)[]

</td>
</tr>
<tr>
<td>

`conversions.1d`

</td>
<td>

[`ConversionTime`](ConversionTime.md)[]

</td>
</tr>
<tr>
<td>

`conversions.1hr`

</td>
<td>

[`ConversionTime`](ConversionTime.md)[]

</td>
</tr>
<tr>
<td>

`counts`

</td>
<td>

\{
  `converted`: `number`;
  `started`: `number`;
 \}

</td>
</tr>
<tr>
<td>

`counts.converted`

</td>
<td>

`number`

</td>
</tr>
<tr>
<td>

`counts.started`

</td>
<td>

`number`

</td>
</tr>
<tr>
<td>

`payouts`

</td>
<td>

\{
  `amount`: `number`;
  `count`: `number`;
 \}

</td>
</tr>
<tr>
<td>

`payouts.amount`

</td>
<td>

`number`

</td>
</tr>
<tr>
<td>

`payouts.count`

</td>
<td>

`number`

</td>
</tr>
<tr>
<td>

`starts`

</td>
<td>

\{
  `15min`: [`ConversionTime`](ConversionTime.md)[];
  `1d`: [`ConversionTime`](ConversionTime.md)[];
  `1hr`: [`ConversionTime`](ConversionTime.md)[];
 \}

</td>
</tr>
<tr>
<td>

`starts.15min`

</td>
<td>

[`ConversionTime`](ConversionTime.md)[]

</td>
</tr>
<tr>
<td>

`starts.1d`

</td>
<td>

[`ConversionTime`](ConversionTime.md)[]

</td>
</tr>
<tr>
<td>

`starts.1hr`

</td>
<td>

[`ConversionTime`](ConversionTime.md)[]

</td>
</tr>
<tr>
<td>

`volume`?

</td>
<td>

`number` \| `null`

</td>
</tr>
</tbody>
</table>

## Defined in

[torque-ts-sdk/src/types/analytics.ts:12](https://github.com/torque-labs/torque-ts-sdk/blob/e34efdf278512e8a58bacdba966e9cd90b1db20a/src/types/analytics.ts#L12)
