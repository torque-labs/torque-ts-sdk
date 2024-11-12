# Type Alias: ApiIdentifyPayload

```ts
type ApiIdentifyPayload: {
  payload: {
     expirationTime: string;
     issuedAt: string;
     statement: string;
    };
};
```

Payload returned from the API as a sample payload for sign in.

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

`payload`

</td>
<td>

\{
  `expirationTime`: `string`;
  `issuedAt`: `string`;
  `statement`: `string`;
 \}

</td>
</tr>
<tr>
<td>

`payload.expirationTime`

</td>
<td>

`string`

</td>
</tr>
<tr>
<td>

`payload.issuedAt`

</td>
<td>

`string`

</td>
</tr>
<tr>
<td>

`payload.statement`

</td>
<td>

`string`

</td>
</tr>
</tbody>
</table>

## Defined in

[torque-ts-sdk/src/types/api.ts:226](https://github.com/torque-labs/torque-ts-sdk/blob/e34efdf278512e8a58bacdba966e9cd90b1db20a/src/types/api.ts#L226)
