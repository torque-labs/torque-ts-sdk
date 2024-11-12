[**@torque-labs/torque-ts-sdk**](../README.md) • **Docs**

***

[@torque-labs/torque-ts-sdk](../README.md) / TorqueAdminClientOptions

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

| Name | Type | Description |
| ------ | ------ | ------ |
| `apiKey`? | `string` | The API key for the admin client. |
| `apiUrl`? | `string` | The API URL for the client. |
| `appUrl`? | `string` | The app URL for the client. |
| `functionsUrl`? | `string` | The functions URL for the client. |
| `network` | `Cluster` | The network for the client. Defaults to 'mainnet-beta'. |
| `rpc`? | `string` | RPC URL for the client. |
| `signer`? | `Adapter` \| `Keypair` | The signer used to sign transactions. |
| `signTransaction`? | [`SignTransaction`](SignTransaction.md) | The function used to sign transactions. If provided, it will override the default signing method. |
| `userClient`? | [`TorqueUserClient`](../classes/TorqueUserClient.md) | The user client for the user based API requests. |

## Defined in

[src/classes/admin.ts:27](https://github.com/torque-labs/torque-ts-sdk/blob/a30afeab92cb119627ec542f4c8aff2dd9faf383/src/classes/admin.ts#L27)
