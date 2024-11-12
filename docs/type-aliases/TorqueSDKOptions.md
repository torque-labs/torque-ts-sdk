[**@torque-labs/torque-ts-sdk**](../README.md) • **Docs**

***

[@torque-labs/torque-ts-sdk](../README.md) / TorqueSDKOptions

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

| Name | Type | Description |
| ------ | ------ | ------ |
| `apiKey`? | `string` | The API key for the client. |
| `apiUrl`? | `string` | The API URL for the client. |
| `appUrl`? | `string` | The app URL for the client. |
| `functionsUrl`? | `string` | The functions URL for the client. |
| `network`? | `Cluster` | The network for the client. Defaults to 'mainnet-beta'. Only used if the RPC URL is not provided. |
| `publisherHandle`? | `string` | The publisher handle for the client. Defaults to 'torqueprotocol'. |
| `rpc`? | `string` | The RPC URL for the client. Defaults to the Solana mainnet-beta cluster. |

## Defined in

[src/classes/sdk.ts:20](https://github.com/torque-labs/torque-ts-sdk/blob/a30afeab92cb119627ec542f4c8aff2dd9faf383/src/classes/sdk.ts#L20)
