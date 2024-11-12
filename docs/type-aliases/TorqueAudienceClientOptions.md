[**@torque-labs/torque-ts-sdk**](../README.md) • **Docs**

***

[@torque-labs/torque-ts-sdk](../globals.md) / TorqueAudienceClientOptions

# Type Alias: TorqueAudienceClientOptions

> **TorqueAudienceClientOptions**: `object`

Options for the TorqueAudienceClient.

## Type declaration

| Name | Type | Description |
| ------ | ------ | ------ |
| `apiKey` | `string` | The API key for the client. |
| `apiUrl`? | `string` | The API URL for the client. |
| `appUrl`? | `string` | The app URL for the client. |
| `functionsUrl`? | `string` | The functions URL for the client. |
| `signer` | `Adapter` \| `Keypair` | The signer used to sign transactions. |
| `userClient` | [`TorqueUserClient`](../classes/TorqueUserClient.md) | The user client for the user based API requests. |

## Defined in

[src/classes/audience.ts:12](https://github.com/torque-labs/torque-ts-sdk/blob/e34efdf278512e8a58bacdba966e9cd90b1db20a/src/classes/audience.ts#L12)
