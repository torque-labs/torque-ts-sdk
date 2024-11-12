[**@torque-labs/torque-ts-sdk**](../README.md) • **Docs**

***

[@torque-labs/torque-ts-sdk](../globals.md) / TorqueRequestOptions

# Type Alias: TorqueRequestOptions

> **TorqueRequestOptions**: `object`

Options for the TorqueRequestClient.

## Type declaration

| Name | Type | Description |
| ------ | ------ | ------ |
| `apiKey`? | `string` | The API key for the client. |
| `apiUrl`? | `string` | The API URL for the client. |
| `appUrl`? | `string` | The app URL for the client. |
| `connection`? | `Connection` | The connection for the client. |
| `functionsUrl`? | `string` | The functions URL for the client. |
| `signer`? | `Adapter` \| `Keypair` | The signer used to sign transactions. |
| `signTransaction`? | [`SignTransaction`](SignTransaction.md) | The function used to sign transactions. If provided, it will override the default signing method. |

## Defined in

[src/classes/request.ts:20](https://github.com/torque-labs/torque-ts-sdk/blob/e34efdf278512e8a58bacdba966e9cd90b1db20a/src/classes/request.ts#L20)
