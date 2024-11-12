# Type Alias: OrOperator

```ts
type OrOperator: {
  $or: (Condition | AndOperator | OrOperator)[];
};
```

Aggregation or operator.

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

`$or`

</td>
<td>

([`Condition`](Condition.md) \| [`AndOperator`](AndOperator.md) \| [`OrOperator`](OrOperator.md))[]

</td>
</tr>
</tbody>
</table>

## Defined in

[torque-ts-sdk/src/types/audience.ts:268](https://github.com/torque-labs/torque-ts-sdk/blob/e34efdf278512e8a58bacdba966e9cd90b1db20a/src/types/audience.ts#L268)
