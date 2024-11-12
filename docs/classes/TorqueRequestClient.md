[**@torque-labs/torque-ts-sdk**](../README.md) • **Docs**

***

[@torque-labs/torque-ts-sdk](../README.md) / TorqueRequestClient

# Class: TorqueRequestClient

The TorqueRequestClient class is used to make requests to the Torque API.
It provides methods for performing API requests and handling responses.

## Example

```ts
const client = new TorqueRequestClient(<options>);

const response = await client.apiFetch<T>("https://api.torque.so/v1/users");
```

## Constructors

### new TorqueRequestClient()

```ts
new TorqueRequestClient(options): TorqueRequestClient
```

Create a new instance of the TorqueRequestClient class.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `options` | [`TorqueRequestOptions`](../type-aliases/TorqueRequestOptions.md) |

#### Returns

[`TorqueRequestClient`](TorqueRequestClient.md)

#### Throws

Throws an error if a signer is not provided.

#### Defined in

[src/classes/request.ts:78](https://github.com/torque-labs/torque-ts-sdk/blob/a30afeab92cb119627ec542f4c8aff2dd9faf383/src/classes/request.ts#L78)

## Properties

| Property | Type |
| ------ | ------ |
| `apiAuthHeader` | `Record`\<`string`, `string`\> |
| `apiKey` | `undefined` \| `string` |
| `apiUrl` | `string` |
| `appUrl` | `string` |
| `connection` | `undefined` \| `Connection` |
| `functionsUrl` | `string` |
| `signer` | `undefined` \| `Adapter` \| `Keypair` |
| `signTransaction` | `undefined` \| [`SignTransaction`](../type-aliases/SignTransaction.md) |

## Methods

### apiFetch()

```ts
apiFetch<T>(
   url, 
   options?, 
supressError?): Promise<T>
```

Perform a request to the Torque API.

#### Type Parameters

| Type Parameter | Description |
| ------ | ------ |
| `T` | The type of the response data. |

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `url` | `string` | The URL of the API endpoint. |
| `options`? | `RequestInit` | The options for the request. |
| `supressError`? | `boolean` | - |

#### Returns

`Promise`\<`T`\>

The response from the API.

#### Throws

If there is an error performing the request.

#### Defined in

[src/classes/request.ts:141](https://github.com/torque-labs/torque-ts-sdk/blob/a30afeab92cb119627ec542f4c8aff2dd9faf383/src/classes/request.ts#L141)

***

### buildTransaction()

```ts
private buildTransaction<T>(txnInput, token?): Promise<T & {
  serializedTx: string;
}>
```

Builds and returns a serialized transaction from the API based on the provided transaction input.

#### Type Parameters

| Type Parameter | Description |
| ------ | ------ |
| `T` | The type of the response data. |

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `txnInput` | \{ `data`: `CreateCampaignInputSchema`; `txnType`: `CampaignCreate`; \} \| \{ `data`: `CampaignEndInputSchema`; `txnType`: `CampaignEnd`; \} \| \{ `data`: `PublisherCreateInputSchema`; `txnType`: `PublisherCreate`; \} \| \{ `data`: `PublisherPayoutInputSchema`; `txnType`: `PublisherPayout`; \} | The input object of the transaction to build. |
| `token`? | `string` | The Torque API token to use for the transaction. |

#### Returns

`Promise`\<`T` & \{
  `serializedTx`: `string`;
 \}\>

A promise that resolves with the serialized transaction.

#### Throws

Throws an error if the API is not able to build the transaction.

#### Defined in

[src/classes/request.ts:221](https://github.com/torque-labs/torque-ts-sdk/blob/a30afeab92cb119627ec542f4c8aff2dd9faf383/src/classes/request.ts#L221)

***

### executeTransaction()

```ts
private executeTransaction(txnExecuteInput, token?): Promise<TxnExecuteResponse>
```

Executes the serialized transaction using the API.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `txnExecuteInput` | \{ `data`: \{ `blockhash`: `string`; `campaignId`: `string`; `userSignature`: `string`; \}; `txnType`: `CampaignCreate` \| `CampaignEnd`; \} \| \{ `data`: `TxnExecuteDefaults`; `txnType`: `string`; \} | The input object of the transaction to execute. |
| `token`? | `string` | The Torque API token to use for the transaction. |

#### Returns

`Promise`\<[`TxnExecuteResponse`](../type-aliases/TxnExecuteResponse.md)\>

A promise that resolves with the signature of the transaction.

#### Throws

Throws an error if the API request is unsuccessful or if the transaction fails.

#### Defined in

[src/classes/request.ts:263](https://github.com/torque-labs/torque-ts-sdk/blob/a30afeab92cb119627ec542f4c8aff2dd9faf383/src/classes/request.ts#L263)

***

### functionsFetch()

```ts
functionsFetch<T>(url, options?): Promise<T>
```

Perform a request to a Torque Function endpoint.

#### Type Parameters

| Type Parameter | Description |
| ------ | ------ |
| `T` | The type of the response data. |

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `url` | `string` | The URL of the API endpoint. |
| `options`? | `RequestInit` | The options for the request. |

#### Returns

`Promise`\<`T`\>

The response from the API.

#### Throws

If there is an error performing the request.

#### Defined in

[src/classes/request.ts:184](https://github.com/torque-labs/torque-ts-sdk/blob/a30afeab92cb119627ec542f4c8aff2dd9faf383/src/classes/request.ts#L184)

***

### signWithKeypair()

```ts
private signWithKeypair(txn): VersionedTransaction
```

Signs a transaction with a Keypair.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `txn` | `VersionedTransaction` | The transaction to sign. |

#### Returns

`VersionedTransaction`

The signed transaction.

#### Throws

If the signer is not initialized or if the signer is not a Keypair.

#### Defined in

[src/classes/request.ts:366](https://github.com/torque-labs/torque-ts-sdk/blob/a30afeab92cb119627ec542f4c8aff2dd9faf383/src/classes/request.ts#L366)

***

### transaction()

```ts
transaction<T>(txnInput, token?): Promise<WithSignature<T>>
```

Builds and executes the transaction using the Torque API.

#### Type Parameters

| Type Parameter | Description |
| ------ | ------ |
| `T` | The type of the response data. |

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `txnInput` | \{ `data`: `CreateCampaignInputSchema`; `txnType`: `CampaignCreate`; \} \| \{ `data`: `CampaignEndInputSchema`; `txnType`: `CampaignEnd`; \} \| \{ `data`: `PublisherCreateInputSchema`; `txnType`: `PublisherCreate`; \} \| \{ `data`: `PublisherPayoutInputSchema`; `txnType`: `PublisherPayout`; \} | The input object of the transaction to process. |
| `token`? | `string` | The Torque API token to use for the transaction. |

#### Returns

`Promise`\<[`WithSignature`](../type-aliases/WithSignature.md)\<`T`\>\>

A promise that resolves with the signature of the transaction.

#### Defined in

[src/classes/request.ts:310](https://github.com/torque-labs/torque-ts-sdk/blob/a30afeab92cb119627ec542f4c8aff2dd9faf383/src/classes/request.ts#L310)

***

### anyFetch()

```ts
static anyFetch<T>(url, options?): Promise<T>
```

Perform a regular request to any endpoint.

#### Type Parameters

| Type Parameter | Description |
| ------ | ------ |
| `T` | The type of the response data. |

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `url` | `string` | The URL of the API endpoint. |
| `options`? | `RequestInit` | The options for the request. |

#### Returns

`Promise`\<`T`\>

The response from the API.

#### Throws

If there is an error performing the request.

#### Defined in

[src/classes/request.ts:107](https://github.com/torque-labs/torque-ts-sdk/blob/a30afeab92cb119627ec542f4c8aff2dd9faf383/src/classes/request.ts#L107)
