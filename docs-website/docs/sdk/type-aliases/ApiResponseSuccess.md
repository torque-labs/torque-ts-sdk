# Type Alias: ApiResponseSuccess\<T\>

```ts
type ApiResponseSuccess<T>: {
  data: T;
  status: ApiStatus.SUCCESS;
};
```

Generic success response for the API.

## Type Parameters

| Type Parameter |
| ------ |
| `T` |

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

`data`

</td>
<td>

`T`

</td>
</tr>
<tr>
<td>

`status`

</td>
<td>

`ApiStatus.SUCCESS`

</td>
</tr>
</tbody>
</table>

## Defined in

[torque-ts-sdk/src/types/api.ts:50](https://github.com/torque-labs/torque-ts-sdk/blob/e34efdf278512e8a58bacdba966e9cd90b1db20a/src/types/api.ts#L50)
