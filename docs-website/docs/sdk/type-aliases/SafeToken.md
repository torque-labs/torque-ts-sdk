# Type Alias: SafeToken

```ts
type SafeToken: {
  address: string;
  chainId: number;
  decimals: number;
  extensions: {
     coingeckoId: string;
    };
  logoURI: string;
  name: string;
  symbol: string;
  tags: string[];
};
```

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

`address`

</td>
<td>

`string`

</td>
</tr>
<tr>
<td>

`chainId`

</td>
<td>

`number`

</td>
</tr>
<tr>
<td>

`decimals`

</td>
<td>

`number`

</td>
</tr>
<tr>
<td>

`extensions`

</td>
<td>

\{
  `coingeckoId`: `string`;
 \}

</td>
</tr>
<tr>
<td>

`extensions.coingeckoId`

</td>
<td>

`string`

</td>
</tr>
<tr>
<td>

`logoURI`

</td>
<td>

`string`

</td>
</tr>
<tr>
<td>

`name`

</td>
<td>

`string`

</td>
</tr>
<tr>
<td>

`symbol`

</td>
<td>

`string`

</td>
</tr>
<tr>
<td>

`tags`

</td>
<td>

`string`[]

</td>
</tr>
</tbody>
</table>

## Defined in

[torque-ts-sdk/src/types/chain.ts:1](https://github.com/torque-labs/torque-ts-sdk/blob/e34efdf278512e8a58bacdba966e9cd90b1db20a/src/types/chain.ts#L1)
