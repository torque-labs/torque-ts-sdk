[**@torque-labs/torque-ts-sdk**](../README.md) • **Docs**

***

[@torque-labs/torque-ts-sdk](../README.md) / TorqueAudienceClientOptions

# Type Alias: TorqueAudienceClientOptions

```ts
type TorqueAudienceClientOptions: {
  apiKey: string;
  apiUrl: string;
  appUrl: string;
  functionsUrl: string;
  signer: Adapter | Keypair;
  userClient: TorqueUserClient;
};
```

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

[src/classes/audience.ts:12](https://github.com/torque-labs/torque-ts-sdk/blob/a30afeab92cb119627ec542f4c8aff2dd9faf383/src/classes/audience.ts#L12)
