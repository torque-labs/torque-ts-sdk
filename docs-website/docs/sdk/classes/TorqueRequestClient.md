[torque-ts-sdk](../README.md) / [Exports](../modules.md) / TorqueRequestClient

# Class: TorqueRequestClient

The TorqueRequestClient class is used to make requests to the Torque API.
It provides methods for performing API requests and handling responses.

**`Example`**

```ts
const client = new TorqueRequestClient({ clientType: "admin", apiKey: "your-api-key" });
const response = await client.apiFetch<T>("https://api.torque.so/v1/users");
console.log(response);
```

## Table of contents

### Constructors

- [constructor](TorqueRequestClient.md#constructor)

### Properties

- [apiAuthHeader](TorqueRequestClient.md#apiauthheader)
- [apiKey](TorqueRequestClient.md#apikey)
- [signer](TorqueRequestClient.md#signer)

### Methods

- [apiFetch](TorqueRequestClient.md#apifetch)
- [buildTransaction](TorqueRequestClient.md#buildtransaction)
- [executeTransaction](TorqueRequestClient.md#executetransaction)
- [signWithKeypair](TorqueRequestClient.md#signwithkeypair)
- [transaction](TorqueRequestClient.md#transaction)

## Constructors

### constructor

• **new TorqueRequestClient**(`signer`, `apiKey?`): [`TorqueRequestClient`](TorqueRequestClient.md)

Create a new instance of the TorqueRequestClient class.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `signer` | `SignerWalletAdapter` \| `Keypair` | The signer used to sign transactions. |
| `apiKey?` | `string` | The API key for the client. |

#### Returns

[`TorqueRequestClient`](TorqueRequestClient.md)

**`Throws`**

Throws an error if a signer is not provided.

#### Defined in

[src/classes/request.ts:35](https://github.com/torque-labs/torque-ts-sdk/blob/f017e3d354c17063da4ba8e079313e0799f76ecf/src/classes/request.ts#L35)

## Properties

### apiAuthHeader

• `Private` **apiAuthHeader**: `Record`\<`string`, `string`\> = `{}`

#### Defined in

[src/classes/request.ts:24](https://github.com/torque-labs/torque-ts-sdk/blob/f017e3d354c17063da4ba8e079313e0799f76ecf/src/classes/request.ts#L24)

___

### apiKey

• `Private` **apiKey**: `undefined` \| `string`

#### Defined in

[src/classes/request.ts:23](https://github.com/torque-labs/torque-ts-sdk/blob/f017e3d354c17063da4ba8e079313e0799f76ecf/src/classes/request.ts#L23)

___

### signer

• `Private` **signer**: `undefined` \| `SignerWalletAdapter` \| `Keypair`

#### Defined in

[src/classes/request.ts:25](https://github.com/torque-labs/torque-ts-sdk/blob/f017e3d354c17063da4ba8e079313e0799f76ecf/src/classes/request.ts#L25)

## Methods

### apiFetch

▸ **apiFetch**\<`T`\>(`url`, `options?`): `Promise`\<`T`\>

Perform a request to the Torque API.

#### Type parameters

| Name | Description |
| :------ | :------ |
| `T` | The type of the response data. |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `url` | `string` | The URL of the API endpoint. |
| `options?` | `RequestInit` | The options for the request. |

#### Returns

`Promise`\<`T`\>

The response from the API.

**`Throws`**

If there is an error performing the request.

#### Defined in

[src/classes/request.ts:63](https://github.com/torque-labs/torque-ts-sdk/blob/f017e3d354c17063da4ba8e079313e0799f76ecf/src/classes/request.ts#L63)

___

### buildTransaction

▸ **buildTransaction**\<`T`\>(`txnInput`): `Promise`\<`T` & \{ `serializedTx`: `string`  }\>

Builds and returns a serialized transaction from the API based on the provided transaction input.

#### Type parameters

| Name | Description |
| :------ | :------ |
| `T` | The type of the response data. |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `txnInput` | \{ `data`: \{ `audience?`: ``null`` \| `string` ; `campaignName`: `string` ; `campaignType`: `string` ; `conversionCount?`: ``null`` \| `number` ; `endTime`: `number` ; `eventProgramAddress?`: `string` ; `eventTokenAddress?`: `string` ; `eventType`: [`ApiEventType`](../enums/ApiEventType.md) ; `landingPage`: `string` ; `minAmount?`: ``null`` \| `number` ; `proposal?`: ``null`` \| `string` ; `publisherPayoutPerConversion`: `number` ; `publisherRewardType`: [`ApiRewardType`](../enums/ApiRewardType.md) ; `publisherTokenAddress?`: `string` ; `startTime`: `number` ; `userPayoutPerConversion?`: `number` ; `userRewardType?`: [`POINTS`](../enums/ApiRewardType.md#points) \| [`TOKENS`](../enums/ApiRewardType.md#tokens) ; `userTokenAddress?`: `string`  } = CampaignCreateInputSchema; `txnType`: [`CampaignCreate`](../enums/ApiTxnTypes.md#campaigncreate)  } \| \{ `data`: \{ `campaignId`: `string`  } = CampaignEndInputSchema; `txnType`: [`CampaignEnd`](../enums/ApiTxnTypes.md#campaignend)  } \| \{ `data`: `boolean` = PublisherCreateInputSchema; `txnType`: [`PublisherCreate`](../enums/ApiTxnTypes.md#publishercreate)  } \| \{ `data`: \{ `amount`: `number` ; `token`: `string`  } = PublisherPayoutInputSchema; `txnType`: [`PublisherPayout`](../enums/ApiTxnTypes.md#publisherpayout)  } | The input object of the transaction to build. |

#### Returns

`Promise`\<`T` & \{ `serializedTx`: `string`  }\>

A promise that resolves with the serialized transaction.

**`Throws`**

Throws an error if the API is not able to build the transaction.

#### Defined in

[src/classes/request.ts:101](https://github.com/torque-labs/torque-ts-sdk/blob/f017e3d354c17063da4ba8e079313e0799f76ecf/src/classes/request.ts#L101)

___

### executeTransaction

▸ **executeTransaction**(`txnExecuteInput`): `Promise`\<[`TxnExecuteResponse`](../modules.md#txnexecuteresponse)\>

Executes the serialized transaction using the API.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `txnExecuteInput` | \{ `data`: \{ `blockhash`: `string` ; `campaignId`: `string` ; `userSignature`: `string`  } ; `txnType`: [`CampaignCreate`](../enums/ApiTxnTypes.md#campaigncreate) \| [`CampaignEnd`](../enums/ApiTxnTypes.md#campaignend)  } \| \{ `data`: \{ `blockhash`: `string` ; `userSignature`: `string`  } = TxnExecuteDefaults; `txnType`: `string`  } | The input object of the transaction to execute. |

#### Returns

`Promise`\<[`TxnExecuteResponse`](../modules.md#txnexecuteresponse)\>

A promise that resolves with the signature of the transaction.

**`Throws`**

Throws an error if the API request is unsuccessful or if the transaction fails.

#### Defined in

[src/classes/request.ts:143](https://github.com/torque-labs/torque-ts-sdk/blob/f017e3d354c17063da4ba8e079313e0799f76ecf/src/classes/request.ts#L143)

___

### signWithKeypair

▸ **signWithKeypair**(`txn`): `VersionedTransaction`

Signs a transaction with a Keypair.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `txn` | `VersionedTransaction` | The transaction to sign. |

#### Returns

`VersionedTransaction`

The signed transaction.

**`Throws`**

If the signer is not initialized or if the signer is not a Keypair.

#### Defined in

[src/classes/request.ts:240](https://github.com/torque-labs/torque-ts-sdk/blob/f017e3d354c17063da4ba8e079313e0799f76ecf/src/classes/request.ts#L240)

___

### transaction

▸ **transaction**\<`T`\>(`txnInput`): `Promise`\<\{ `signature`: `string`  } & `Omit`\<`T` & \{ `serializedTx`: `string`  }, ``"serializedTx"``\>\>

Builds and executes the transaction using the Torque API.

#### Type parameters

| Name | Description |
| :------ | :------ |
| `T` | The type of the response data. |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `txnInput` | \{ `data`: \{ `audience?`: ``null`` \| `string` ; `campaignName`: `string` ; `campaignType`: `string` ; `conversionCount?`: ``null`` \| `number` ; `endTime`: `number` ; `eventProgramAddress?`: `string` ; `eventTokenAddress?`: `string` ; `eventType`: [`ApiEventType`](../enums/ApiEventType.md) ; `landingPage`: `string` ; `minAmount?`: ``null`` \| `number` ; `proposal?`: ``null`` \| `string` ; `publisherPayoutPerConversion`: `number` ; `publisherRewardType`: [`ApiRewardType`](../enums/ApiRewardType.md) ; `publisherTokenAddress?`: `string` ; `startTime`: `number` ; `userPayoutPerConversion?`: `number` ; `userRewardType?`: [`POINTS`](../enums/ApiRewardType.md#points) \| [`TOKENS`](../enums/ApiRewardType.md#tokens) ; `userTokenAddress?`: `string`  } = CampaignCreateInputSchema; `txnType`: [`CampaignCreate`](../enums/ApiTxnTypes.md#campaigncreate)  } \| \{ `data`: \{ `campaignId`: `string`  } = CampaignEndInputSchema; `txnType`: [`CampaignEnd`](../enums/ApiTxnTypes.md#campaignend)  } \| \{ `data`: `boolean` = PublisherCreateInputSchema; `txnType`: [`PublisherCreate`](../enums/ApiTxnTypes.md#publishercreate)  } \| \{ `data`: \{ `amount`: `number` ; `token`: `string`  } = PublisherPayoutInputSchema; `txnType`: [`PublisherPayout`](../enums/ApiTxnTypes.md#publisherpayout)  } | The input object of the transaction to process. |

#### Returns

`Promise`\<\{ `signature`: `string`  } & `Omit`\<`T` & \{ `serializedTx`: `string`  }, ``"serializedTx"``\>\>

A promise that resolves with the signature of the transaction.

#### Defined in

[src/classes/request.ts:189](https://github.com/torque-labs/torque-ts-sdk/blob/f017e3d354c17063da4ba8e079313e0799f76ecf/src/classes/request.ts#L189)
