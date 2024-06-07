# Class: TorqueRequestClient

The TorqueRequestClient class is used to make requests to the Torque API.
It provides methods for performing API requests and handling responses.

## Example

```ts
const client = new TorqueRequestClient(signer, apiKey);

const response = await client.apiFetch<T>("https://api.torque.so/v1/users");
```

## Constructors

### new TorqueRequestClient()

```ts
new TorqueRequestClient(signer, apiKey?): TorqueRequestClient
```

Create a new instance of the TorqueRequestClient class.

#### Parameters

| Parameter | Type | Description |
| :------ | :------ | :------ |
| `signer` | `SignerWalletAdapter` \| `Keypair` | The signer used to sign transactions. |
| `apiKey`? | `string` | The API key for the client. |

#### Returns

[`TorqueRequestClient`](TorqueRequestClient.md)

#### Throws

Throws an error if a signer is not provided.

#### Source

[src/classes/request.ts:37](https://github.com/torque-labs/torque-ts-sdk/blob/e7e20c5519300f3127faf1f4bde402ef91d14a40/src/classes/request.ts#L37)

## Properties

| Property | Modifier | Type |
| :------ | :------ | :------ |
| `apiAuthHeader` | `private` | `Record`\<`string`, `string`\> |
| `apiKey` | `private` | `undefined` \| `string` |
| `signer` | `private` | `SignerWalletAdapter` \| `Keypair` |

## Methods

### apiFetch()

```ts
apiFetch<T>(url, options?): Promise<T>
```

Perform a request to the Torque API.

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

[src/classes/request.ts:65](https://github.com/torque-labs/torque-ts-sdk/blob/e7e20c5519300f3127faf1f4bde402ef91d14a40/src/classes/request.ts#L65)

***

### buildTransaction()

```ts
private buildTransaction<T>(txnInput): Promise<T & {
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

#### Returns

`Promise`\<`T` & \{
  `serializedTx`: `string`;
 \}\>

A promise that resolves with the serialized transaction.

#### Throws

Throws an error if the API is not able to build the transaction.

#### Source

[src/classes/request.ts:140](https://github.com/torque-labs/torque-ts-sdk/blob/e7e20c5519300f3127faf1f4bde402ef91d14a40/src/classes/request.ts#L140)

***

### executeTransaction()

```ts
private executeTransaction(txnExecuteInput): Promise<TxnExecuteResponse>
```

Executes the serialized transaction using the API.

#### Parameters

| Parameter | Type | Description |
| :------ | :------ | :------ |
| `txnExecuteInput` | \{ `data`: \{ `blockhash`: `string`; `campaignId`: `string`; `userSignature`: `string`; \}; `txnType`: `CampaignCreate` \| `CampaignEnd`; \} \| \{ `data`: `TxnExecuteDefaults`; `txnType`: `string`; \} | The input object of the transaction to execute. |

#### Returns

`Promise` \<[`TxnExecuteResponse`](../type-aliases/TxnExecuteResponse.md)\>

A promise that resolves with the signature of the transaction.

#### Throws

Throws an error if the API request is unsuccessful or if the transaction fails.

#### Source

[src/classes/request.ts:178](https://github.com/torque-labs/torque-ts-sdk/blob/e7e20c5519300f3127faf1f4bde402ef91d14a40/src/classes/request.ts#L178)

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

[src/classes/request.ts:105](https://github.com/torque-labs/torque-ts-sdk/blob/e7e20c5519300f3127faf1f4bde402ef91d14a40/src/classes/request.ts#L105)

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

[src/classes/request.ts:267](https://github.com/torque-labs/torque-ts-sdk/blob/e7e20c5519300f3127faf1f4bde402ef91d14a40/src/classes/request.ts#L267)

***

### transaction()

```ts
transaction<T>(txnInput): Promise<{
  signature: string;
 } & Omit<T & {
  serializedTx: string;
}, "serializedTx">>
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

#### Returns

`Promise`\<\{
  `signature`: `string`;
 \} & `Omit`\<`T` & \{
  `serializedTx`: `string`;
 \}, `"serializedTx"`\>\>

A promise that resolves with the signature of the transaction.

#### Source

[src/classes/request.ts:220](https://github.com/torque-labs/torque-ts-sdk/blob/e7e20c5519300f3127faf1f4bde402ef91d14a40/src/classes/request.ts#L220)
