# Type Alias: TorqueAudienceClientOptions

```ts
type TorqueAudienceClientOptions: {
  apiKey: string;
  apiUrl: string;
  appUrl: string;
  functionsUrl: string;
  signer: Adapter | Keypair;
  userClient: TorqueUserClient;
};
```

Options for the TorqueAudienceClient.

## Type declaration

<table>
<thead>
<tr>
<th>Name</th>
<th>Type</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`apiKey`

</td>
<td>

`string`

</td>
<td>

The API key for the client.

</td>
</tr>
<tr>
<td>

`apiUrl`?

</td>
<td>

`string`

</td>
<td>

The API URL for the client.

</td>
</tr>
<tr>
<td>

`appUrl`?

</td>
<td>

`string`

</td>
<td>

The app URL for the client.

</td>
</tr>
<tr>
<td>

`functionsUrl`?

</td>
<td>

`string`

</td>
<td>

The functions URL for the client.

</td>
</tr>
<tr>
<td>

`signer`

</td>
<td>

`Adapter` \| `Keypair`

</td>
<td>

The signer used to sign transactions.

</td>
</tr>
<tr>
<td>

`userClient`

</td>
<td>

[`TorqueUserClient`](../classes/TorqueUserClient.md)

</td>
<td>

The user client for the user based API requests.

</td>
</tr>
</tbody>
</table>

## Defined in

[torque-ts-sdk/src/classes/audience.ts:12](https://github.com/torque-labs/torque-ts-sdk/blob/e34efdf278512e8a58bacdba966e9cd90b1db20a/src/classes/audience.ts#L12)
