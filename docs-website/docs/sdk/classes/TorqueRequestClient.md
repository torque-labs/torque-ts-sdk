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

[torque-ts-sdk/src/classes/request.ts:78](https://github.com/torque-labs/torque-ts-sdk/blob/e34efdf278512e8a58bacdba966e9cd90b1db20a/src/classes/request.ts#L78)

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

[torque-ts-sdk/src/classes/request.ts:141](https://github.com/torque-labs/torque-ts-sdk/blob/e34efdf278512e8a58bacdba966e9cd90b1db20a/src/classes/request.ts#L141)

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

[torque-ts-sdk/src/classes/request.ts:184](https://github.com/torque-labs/torque-ts-sdk/blob/e34efdf278512e8a58bacdba966e9cd90b1db20a/src/classes/request.ts#L184)

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

[torque-ts-sdk/src/classes/request.ts:310](https://github.com/torque-labs/torque-ts-sdk/blob/e34efdf278512e8a58bacdba966e9cd90b1db20a/src/classes/request.ts#L310)

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

[torque-ts-sdk/src/classes/request.ts:107](https://github.com/torque-labs/torque-ts-sdk/blob/e34efdf278512e8a58bacdba966e9cd90b1db20a/src/classes/request.ts#L107)
