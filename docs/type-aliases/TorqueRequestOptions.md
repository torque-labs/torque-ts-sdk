[**@torque-labs/torque-ts-sdk**](../README.md) • **Docs**

***

[@torque-labs/torque-ts-sdk](../README.md) / TorqueRequestOptions

# Type Alias: TorqueRequestOptions

```ts
type TorqueRequestOptions: {
  apiKey: string;
  apiUrl: string;
  appUrl: string;
  connection: Connection;
  functionsUrl: string;
  signer: Adapter | Keypair;
  signTransaction: SignTransaction;
};
```

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

[src/classes/request.ts:20](https://github.com/torque-labs/torque-ts-sdk/blob/a30afeab92cb119627ec542f4c8aff2dd9faf383/src/classes/request.ts#L20)
