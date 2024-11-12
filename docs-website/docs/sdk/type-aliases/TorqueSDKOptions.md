# Type Alias: TorqueSDKOptions

```ts
type TorqueSDKOptions: {
  apiKey: string;
  apiUrl: string;
  appUrl: string;
  functionsUrl: string;
  network: Cluster;
  publisherHandle: string;
  rpc: string;
};
```

Options for the TorqueSDK.

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

`network`?

</td>
<td>

`Cluster`

</td>
<td>

The network for the client. Defaults to 'mainnet-beta'. Only used if the RPC URL is not provided.

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

The RPC URL for the client. Defaults to the Solana mainnet-beta cluster.

</td>
</tr>
</tbody>
</table>

## Defined in

[torque-ts-sdk/src/classes/sdk.ts:20](https://github.com/torque-labs/torque-ts-sdk/blob/e34efdf278512e8a58bacdba966e9cd90b1db20a/src/classes/sdk.ts#L20)
