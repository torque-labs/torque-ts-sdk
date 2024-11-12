# Type Alias: TorqueAdminClientOptions

```ts
type TorqueAdminClientOptions: {
  apiKey: string;
  apiUrl: string;
  appUrl: string;
  functionsUrl: string;
  network: Cluster;
  rpc: string;
  signer: Adapter | Keypair;
  signTransaction: SignTransaction;
  userClient: TorqueUserClient;
};
```

Options for the TorqueAdminClient.

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

`apiKey`?

</td>
<td>

`string`

</td>
<td>

The API key for the admin client.

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

`network`

</td>
<td>

`Cluster`

</td>
<td>

The network for the client. Defaults to 'mainnet-beta'.

</td>
</tr>
<tr>
<td>

`rpc`?

</td>
<td>

`string`

</td>
<td>

RPC URL for the client.

</td>
</tr>
<tr>
<td>

`signer`?

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

`signTransaction`?

</td>
<td>

[`SignTransaction`](SignTransaction.md)

</td>
<td>

The function used to sign transactions. If provided, it will override the default signing method.

</td>
</tr>
<tr>
<td>

`userClient`?

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

[torque-ts-sdk/src/classes/admin.ts:27](https://github.com/torque-labs/torque-ts-sdk/blob/e34efdf278512e8a58bacdba966e9cd90b1db20a/src/classes/admin.ts#L27)
