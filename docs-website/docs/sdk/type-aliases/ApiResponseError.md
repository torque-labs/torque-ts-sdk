# Type Alias: ApiResponseError

```ts
type ApiResponseError: {
  message: string;
  status: Exclude<ApiStatus, ApiStatus.SUCCESS>;
};
```

Generic error response for the API.

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

`message`

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

`Exclude`\<[`ApiStatus`](../enumerations/ApiStatus.md), `ApiStatus.SUCCESS`\>

</td>
</tr>
</tbody>
</table>

## Defined in

[torque-ts-sdk/src/types/api.ts:58](https://github.com/torque-labs/torque-ts-sdk/blob/e34efdf278512e8a58bacdba966e9cd90b1db20a/src/types/api.ts#L58)
