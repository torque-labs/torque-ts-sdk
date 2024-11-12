[**@torque-labs/torque-ts-sdk**](../README.md) • **Docs**

***

[@torque-labs/torque-ts-sdk](../globals.md) / TorqueUserClientOptions

# Type Alias: TorqueUserClientOptions

> **TorqueUserClientOptions**: `object`

Options for the TorqueUserClient.

## Type declaration

| Name | Type | Description |
| ------ | ------ | ------ |
| `apiUrl`? | `string` | API URL for the client. |
| `appUrl`? | `string` | App URL for the client. |
| `functionsUrl`? | `string` | Functions URL for the client. |
| `network` | `Cluster` | The network for the client. Defaults to 'mainnet-beta'. |
| `publisherHandle`? | `string` | The publisher handle for the client. Defaults to 'torqueprotocol'. |
| `rpc`? | `string` | RPC URL for the client. |
| `signer` | `Adapter` \| `Keypair` | The signer used to sign transactions. |
| `signTransaction`? | [`SignTransaction`](SignTransaction.md) | The function used to sign transactions. If provided, it will override the default signing method. |

## Defined in

[src/classes/user.ts:26](https://github.com/torque-labs/torque-ts-sdk/blob/e34efdf278512e8a58bacdba966e9cd90b1db20a/src/classes/user.ts#L26)
