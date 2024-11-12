# Type Alias: BridgeAction

```ts
type BridgeAction: {
  direction: "INBOUND" | "OUTBOUND";
  maxAmount: number;
  minAmount: number;
  mint: string;
  withinDays: number;
};
```

Parameters for a bridge action.

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

`direction`

</td>
<td>

`"INBOUND"` \| `"OUTBOUND"`

</td>
</tr>
<tr>
<td>

`maxAmount`?

</td>
<td>

`number`

</td>
</tr>
<tr>
<td>

`minAmount`?

</td>
<td>

`number`

</td>
</tr>
<tr>
<td>

`mint`

</td>
<td>

`string`

</td>
</tr>
<tr>
<td>

`withinDays`?

</td>
<td>

`number`

</td>
</tr>
</tbody>
</table>

## Defined in

[torque-ts-sdk/src/types/audience.ts:45](https://github.com/torque-labs/torque-ts-sdk/blob/e34efdf278512e8a58bacdba966e9cd90b1db20a/src/types/audience.ts#L45)
