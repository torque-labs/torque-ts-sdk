# Type Alias: TorqueUserClientOptions

```ts
type TorqueUserClientOptions: {
  apiUrl: string;
  appUrl: string;
  functionsUrl: string;
  network: Cluster;
  publisherHandle: string;
  rpc: string;
  signer: Adapter | Keypair;
  signTransaction: SignTransaction;
};
```

Options for the TorqueUserClient.

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

`apiUrl`?

</td>
<td>

`string`

</td>
<td>

API URL for the client.

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

App URL for the client.

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

Functions URL for the client.

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

`publisherHandle`?

</td>
<td>

`string`

</td>
<td>

The publisher handle for the client. Defaults to 'torqueprotocol'.

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

`signTransaction`?

</td>
<td>

[`SignTransaction`](SignTransaction.md)

</td>
<td>

The function used to sign transactions. If provided, it will override the default signing method.

</td>
</tr>
</tbody>
</table>

## Defined in

[torque-ts-sdk/src/classes/user.ts:26](https://github.com/torque-labs/torque-ts-sdk/blob/e34efdf278512e8a58bacdba966e9cd90b1db20a/src/classes/user.ts#L26)
