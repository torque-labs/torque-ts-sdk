[**@torque-labs/torque-ts-sdk**](../README.md) • **Docs**

***

[@torque-labs/torque-ts-sdk](../globals.md) / TorqueAdminClientOptions

# Type Alias: TorqueAdminClientOptions

> **TorqueAdminClientOptions**: `object`

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

[src/classes/admin.ts:27](https://github.com/torque-labs/torque-ts-sdk/blob/e34efdf278512e8a58bacdba966e9cd90b1db20a/src/classes/admin.ts#L27)
