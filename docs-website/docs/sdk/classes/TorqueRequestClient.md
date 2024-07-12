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
| :------ | :------ |
| `options` | [`TorqueRequestOptions`](../type-aliases/TorqueRequestOptions.md) |

#### Returns

[`TorqueRequestClient`](TorqueRequestClient.md)

#### Throws

Throws an error if a signer is not provided.

#### Source

[src/classes/request.ts:61](https://github.com/torque-labs/torque-ts-sdk/blob/60b058a1261e69e5eb8f4ad7130e050df24bb92d/src/classes/request.ts#L61)

## Properties

| Property | Modifier | Type |
| :------ | :------ | :------ |
| `apiAuthHeader` | `private` | `Record`\<`string`, `string`\> |
| `apiKey` | `private` | `undefined` \| `string` |
| `apiUrl` | `private` | `string` |
| `appUrl` | `private` | `string` |
| `connection` | `private` | `undefined` \| `Connection` |
| `functionsUrl` | `private` | `string` |
| `signer` | `private` | `Adapter` \| `Keypair` |

## Methods

### apiFetch()

```ts
apiFetch<T>(
   url, 
   options?, 
supressError?): Promise<T>
```

Perform a request to the Torque API.

#### Type parameters

| Type parameter | Description |
| :------ | :------ |
| `T` | The type of the response data. |

#### Parameters

| Parameter | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `url` | `string` | `undefined` | The URL of the API endpoint. |
| `options`? | `RequestInit` | `undefined` | The options for the request. |
| `supressError`? | `boolean` | `false` | - |

#### Returns

`Promise`\<`T`\>

The response from the API.

#### Throws

If there is an error performing the request.

#### Source

[src/classes/request.ts:129](https://github.com/torque-labs/torque-ts-sdk/blob/60b058a1261e69e5eb8f4ad7130e050df24bb92d/src/classes/request.ts#L129)

***

### buildTransaction()

```ts
private buildTransaction<T>(txnInput, token?): Promise<T & {
  serializedTx: string;
}>
```

Builds and returns a serialized transaction from the API based on the provided transaction input.

#### Type parameters

| Type parameter | Description |
| :------ | :------ |
| `T` | The type of the response data. |

#### Parameters

| Parameter | Type | Description |
| :------ | :------ | :------ |
| `txnInput` | \{ `data`: `CampaignCreateInputSchema`; `txnType`: `CampaignCreate`; \} \| \{ `data`: `CampaignEndInputSchema`; `txnType`: `CampaignEnd`; \} \| \{ `data`: `PublisherCreateInputSchema`; `txnType`: `PublisherCreate`; \} \| \{ `data`: `PublisherPayoutInputSchema`; `txnType`: `PublisherPayout`; \} | The input object of the transaction to build. |
| `token`? | `string` | - |

#### Returns

`Promise`\<`T` & \{
  `serializedTx`: `string`;
 \}\>

A promise that resolves with the serialized transaction.

#### Throws

Throws an error if the API is not able to build the transaction.

#### Source

[src/classes/request.ts:208](https://github.com/torque-labs/torque-ts-sdk/blob/60b058a1261e69e5eb8f4ad7130e050df24bb92d/src/classes/request.ts#L208)

***

### executeTransaction()

```ts
private executeTransaction(txnExecuteInput, token?): Promise<TxnExecuteResponse>
```

Executes the serialized transaction using the API.

#### Parameters

| Parameter | Type | Description |
| :------ | :------ | :------ |
| `txnExecuteInput` | \{ `data`: \{ `blockhash`: `string`; `campaignId`: `string`; `userSignature`: `string`; \}; `txnType`: `CampaignCreate` \| `CampaignEnd`; \} \| \{ `data`: `TxnExecuteDefaults`; `txnType`: `string`; \} | The input object of the transaction to execute. |
| `token`? | `string` | - |

#### Returns

`Promise` \<[`TxnExecuteResponse`](../type-aliases/TxnExecuteResponse.md)\>

A promise that resolves with the signature of the transaction.

#### Throws

Throws an error if the API request is unsuccessful or if the transaction fails.

#### Source

[src/classes/request.ts:249](https://github.com/torque-labs/torque-ts-sdk/blob/60b058a1261e69e5eb8f4ad7130e050df24bb92d/src/classes/request.ts#L249)

***

### functionsFetch()

```ts
functionsFetch<T>(url, options?): Promise<T>
```

Perform a request to a Torque Function endpoint.

#### Type parameters

| Type parameter | Description |
| :------ | :------ |
| `T` | The type of the response data. |

#### Parameters

| Parameter | Type | Description |
| :------ | :------ | :------ |
| `url` | `string` | The URL of the API endpoint. |
| `options`? | `RequestInit` | The options for the request. |

#### Returns

`Promise`\<`T`\>

The response from the API.

#### Throws

If there is an error performing the request.

#### Source

[src/classes/request.ts:172](https://github.com/torque-labs/torque-ts-sdk/blob/60b058a1261e69e5eb8f4ad7130e050df24bb92d/src/classes/request.ts#L172)

***

### signWithKeypair()

```ts
private signWithKeypair(txn): VersionedTransaction
```

Signs a transaction with a Keypair.

#### Parameters

| Parameter | Type | Description |
| :------ | :------ | :------ |
| `txn` | `VersionedTransaction` | The transaction to sign. |

#### Returns

`VersionedTransaction`

The signed transaction.

#### Throws

If the signer is not initialized or if the signer is not a Keypair.

#### Source

[src/classes/request.ts:342](https://github.com/torque-labs/torque-ts-sdk/blob/60b058a1261e69e5eb8f4ad7130e050df24bb92d/src/classes/request.ts#L342)

***

### transaction()

```ts
transaction<T>(txnInput, token?): Promise<WithSignature<T>>
```

Builds and executes the transaction using the Torque API.

#### Type parameters

| Type parameter | Description |
| :------ | :------ |
| `T` | The type of the response data. |

#### Parameters

| Parameter | Type | Description |
| :------ | :------ | :------ |
| `txnInput` | \{ `data`: `CampaignCreateInputSchema`; `txnType`: `CampaignCreate`; \} \| \{ `data`: `CampaignEndInputSchema`; `txnType`: `CampaignEnd`; \} \| \{ `data`: `PublisherCreateInputSchema`; `txnType`: `PublisherCreate`; \} \| \{ `data`: `PublisherPayoutInputSchema`; `txnType`: `PublisherPayout`; \} | The input object of the transaction to process. |
| `token`? | `string` | - |

#### Returns

`Promise` \<[`WithSignature`](../type-aliases/WithSignature.md)\<`T`\>\>

A promise that resolves with the signature of the transaction.

#### Source

[src/classes/request.ts:295](https://github.com/torque-labs/torque-ts-sdk/blob/60b058a1261e69e5eb8f4ad7130e050df24bb92d/src/classes/request.ts#L295)

***

### anyFetch()

```ts
static anyFetch<T>(url, options?): Promise<T>
```

Perform a regular request to any endpoint.

#### Type parameters

| Type parameter | Description |
| :------ | :------ |
| `T` | The type of the response data. |

#### Parameters

| Parameter | Type | Description |
| :------ | :------ | :------ |
| `url` | `string` | The URL of the API endpoint. |
| `options`? | `RequestInit` | The options for the request. |

#### Returns

`Promise`\<`T`\>

The response from the API.

#### Throws

If there is an error performing the request.

#### Source

[src/classes/request.ts:95](https://github.com/torque-labs/torque-ts-sdk/blob/60b058a1261e69e5eb8f4ad7130e050df24bb92d/src/classes/request.ts#L95)
