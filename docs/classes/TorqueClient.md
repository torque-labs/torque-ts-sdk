[torque-ts-sdk](../README.md) / [Exports](../modules.md) / TorqueClient

# Class: TorqueClient

## Table of contents

### Constructors

- [constructor](TorqueClient.md#constructor)

### Properties

- [api\_token](TorqueClient.md#api_token)
- [becomeAPublisher](TorqueClient.md#becomeapublisher)
- [createCampaign](TorqueClient.md#createcampaign)
- [createCampaignLink](TorqueClient.md#createcampaignlink)
- [finishCampaign](TorqueClient.md#finishcampaign)
- [getAudiences](TorqueClient.md#getaudiences)
- [getCampaigns](TorqueClient.md#getcampaigns)
- [getLinks](TorqueClient.md#getlinks)
- [getSharedLinkData](TorqueClient.md#getsharedlinkdata)
- [getUser](TorqueClient.md#getuser)
- [initialized](TorqueClient.md#initialized)
- [payoutPublisher](TorqueClient.md#payoutpublisher)
- [startCampaign](TorqueClient.md#startcampaign)

### Methods

- [\_getApiHeaders](TorqueClient.md#_getapiheaders)
- [apiFetch](TorqueClient.md#apifetch)
- [initialize](TorqueClient.md#initialize)

## Constructors

### constructor

• **new TorqueClient**(`options`): [`TorqueClient`](TorqueClient.md)

Initializes the TorqueClient with the provided options.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `options` | `ApiInputVerify` | The options required for API verification. |

#### Returns

[`TorqueClient`](TorqueClient.md)

A Promise that resolves when the initialization is complete.

#### Defined in

[client.ts:24](https://github.com/torque-labs/torque-ts-sdk/blob/457fcab4a36eeefaa589b539522aee9858dc42ab/src/client.ts#L24)

## Properties

### api\_token

• `Private` **api\_token**: ``null`` \| `string` = `null`

#### Defined in

[client.ts:17](https://github.com/torque-labs/torque-ts-sdk/blob/457fcab4a36eeefaa589b539522aee9858dc42ab/src/client.ts#L17)

___

### becomeAPublisher

• **becomeAPublisher**: (`client`: [`TorqueClient`](TorqueClient.md), `wallet`: `SignerWalletAdapter`) => `Promise`\<\{ `publisherPubKey`: `string`  }\>

Publisher

#### Type declaration

▸ (`client`, `wallet`): `Promise`\<\{ `publisherPubKey`: `string`  }\>

##### Parameters

| Name | Type |
| :------ | :------ |
| `client` | [`TorqueClient`](TorqueClient.md) |
| `wallet` | `SignerWalletAdapter` |

##### Returns

`Promise`\<\{ `publisherPubKey`: `string`  }\>

#### Defined in

[client.ts:93](https://github.com/torque-labs/torque-ts-sdk/blob/457fcab4a36eeefaa589b539522aee9858dc42ab/src/client.ts#L93)

___

### createCampaign

• **createCampaign**: (`client`: [`TorqueClient`](TorqueClient.md), `wallet`: `SignerWalletAdapter`, `data`: `CreateCampaignInput`) => `Promise`\<\{ `campaignId`: `string` ; `signature`: `string`  }\>

#### Type declaration

▸ (`client`, `wallet`, `data`): `Promise`\<\{ `campaignId`: `string` ; `signature`: `string`  }\>

Creates a new campaign transaction on the Solana blockchain using the Torque protocol.
This function prepares and sends a transaction that includes instructions for creating
a new campaign and funding it with tokens. It supports both SOL and custom SPL tokens
for payouts to publishers and users. The function also serializes the signed transaction
and sends it to a backend server for further processing.

##### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `client` | [`TorqueClient`](TorqueClient.md) | An instance of `TorqueClient` used to communicate with the backend server. |
| `wallet` | `SignerWalletAdapter` | A `SignerWalletAdapter` instance representing the user's wallet. |
| `data` | `CreateCampaignInput` | An object containing input data for the campaign creation, including details like campaign type, name, reward information, and duration. |

##### Returns

`Promise`\<\{ `campaignId`: `string` ; `signature`: `string`  }\>

A promise that resolves to the response from the backend server after
         the campaign creation transaction has been processed.

**`Throws`**

Will throw an error if the wallet does not have a public key or if any
        part of the transaction preparation or sending process fails.

#### Defined in

[client.ts:86](https://github.com/torque-labs/torque-ts-sdk/blob/457fcab4a36eeefaa589b539522aee9858dc42ab/src/client.ts#L86)

___

### createCampaignLink

• **createCampaignLink**: (`client`: [`TorqueClient`](TorqueClient.md), `campaignId`: `string`) => `Promise`\<`string`\>

#### Type declaration

▸ (`client`, `campaignId`): `Promise`\<`string`\>

Creates a campaign share link using the Torque API.

This function sends a POST request to the Torque API to create a new share link for a specific campaign
identified by its `campaignId`. The function constructs the request body with the `campaignId` and
sends the request. Upon successful creation, it returns the URL of the newly created campaign link.
If the operation fails or the API returns a status other than "SUCCESS", it throws an error with a
descriptive message.

##### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `client` | [`TorqueClient`](TorqueClient.md) | The TorqueClient instance used to perform the API request. |
| `campaignId` | `string` | The unique identifier of the campaign for which the link is to be created. |

##### Returns

`Promise`\<`string`\>

A Promise resolving to the URL of the newly created campaign share link.

**`Throws`**

An error if the link creation fails or if the API returns a status other than "SUCCESS".

#### Defined in

[client.ts:100](https://github.com/torque-labs/torque-ts-sdk/blob/457fcab4a36eeefaa589b539522aee9858dc42ab/src/client.ts#L100)

___

### finishCampaign

• **finishCampaign**: (`client`: [`TorqueClient`](TorqueClient.md), `wallet`: `SignerWalletAdapter`, `campaignId`: `string`, `campaignPubKey`: `string`) => `Promise`\<\{ `signature`: `string`  }\>

#### Type declaration

▸ (`client`, `wallet`, `campaignId`, `campaignPubKey`): `Promise`\<\{ `signature`: `string`  }\>

Finalizes a campaign on the Solana blockchain using the Torque protocol. This function constructs
and sends a transaction that includes an instruction to end a specific campaign. The transaction
is signed by the campaign owner's wallet and then serialized to a base64 string, which is sent to
a backend server for further processing. This is intended for campaign owners to officially close
their campaigns and potentially trigger any finalization logic defined in the smart contract.

##### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `client` | [`TorqueClient`](TorqueClient.md) | An instance of `TorqueClient` used to communicate with the backend server. |
| `wallet` | `SignerWalletAdapter` | A `SignerWalletAdapter` instance representing the campaign owner's wallet. |
| `campaignId` | `string` | A string identifier for the campaign to be ended. |
| `campaignPubKey` | `string` | The public key of the campaign as a string, used to identify the campaign on-chain. |

##### Returns

`Promise`\<\{ `signature`: `string`  }\>

A promise that resolves to the response from the backend server after the campaign ending
         transaction has been processed.

**`Throws`**

Will throw an error if the wallet does not have a public key or if any part of the transaction
        preparation or sending process fails.

#### Defined in

[client.ts:87](https://github.com/torque-labs/torque-ts-sdk/blob/457fcab4a36eeefaa589b539522aee9858dc42ab/src/client.ts#L87)

___

### getAudiences

• **getAudiences**: (`client`: [`TorqueClient`](TorqueClient.md)) => `Promise`\<`ApiAudience`[]\>

Audiences

#### Type declaration

▸ (`client`): `Promise`\<`ApiAudience`[]\>

##### Parameters

| Name | Type |
| :------ | :------ |
| `client` | [`TorqueClient`](TorqueClient.md) |

##### Returns

`Promise`\<`ApiAudience`[]\>

#### Defined in

[client.ts:80](https://github.com/torque-labs/torque-ts-sdk/blob/457fcab4a36eeefaa589b539522aee9858dc42ab/src/client.ts#L80)

___

### getCampaigns

• **getCampaigns**: () => `Promise`\<`ApiCampaign`[]\>

Campaign

#### Type declaration

▸ (): `Promise`\<`ApiCampaign`[]\>

##### Returns

`Promise`\<`ApiCampaign`[]\>

#### Defined in

[client.ts:85](https://github.com/torque-labs/torque-ts-sdk/blob/457fcab4a36eeefaa589b539522aee9858dc42ab/src/client.ts#L85)

___

### getLinks

• **getLinks**: (`client`: [`TorqueClient`](TorqueClient.md)) => `Promise`\<\{ `campaignId`: `string` ; `url`: `string`  }[]\>

Sharing

#### Type declaration

▸ (`client`): `Promise`\<\{ `campaignId`: `string` ; `url`: `string`  }[]\>

##### Parameters

| Name | Type |
| :------ | :------ |
| `client` | [`TorqueClient`](TorqueClient.md) |

##### Returns

`Promise`\<\{ `campaignId`: `string` ; `url`: `string`  }[]\>

#### Defined in

[client.ts:99](https://github.com/torque-labs/torque-ts-sdk/blob/457fcab4a36eeefaa589b539522aee9858dc42ab/src/client.ts#L99)

___

### getSharedLinkData

• **getSharedLinkData**: (`client`: [`TorqueClient`](TorqueClient.md), `campaignId`: `string`, `handle`: `string`) => `Promise`\<`ApiShare`\>

#### Type declaration

▸ (`client`, `campaignId`, `handle`): `Promise`\<`ApiShare`\>

Retrieves shared link data for a specific campaign and handle.

This function makes a GET request to the TORQUE_API_ROUTES.share endpoint,
passing the campaignId and handle as query parameters. It then processes
the response, returning the data if the request was successful, or throwing
an error if not.

##### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `client` | [`TorqueClient`](TorqueClient.md) | The TorqueClient instance used to perform the API fetch. |
| `campaignId` | `string` | The unique identifier for the campaign. |
| `handle` | `string` | The specific handle associated with the shared link. |

##### Returns

`Promise`\<`ApiShare`\>

The data associated with the shared link if the request is successful.

**`Throws`**

Error with the message from the API response if the request fails.

#### Defined in

[client.ts:101](https://github.com/torque-labs/torque-ts-sdk/blob/457fcab4a36eeefaa589b539522aee9858dc42ab/src/client.ts#L101)

___

### getUser

• **getUser**: (`client`: [`TorqueClient`](TorqueClient.md)) => `Promise`\<\{ `id`: `string` ; `isPublisher`: `boolean` ; `profileImage?`: `string` ; `pubKey`: `string` ; `publisherPubKey?`: ``null`` \| `string` ; `twitter?`: `string` ; `username?`: `string`  }\>

User

#### Type declaration

▸ (`client`): `Promise`\<\{ `id`: `string` ; `isPublisher`: `boolean` ; `profileImage?`: `string` ; `pubKey`: `string` ; `publisherPubKey?`: ``null`` \| `string` ; `twitter?`: `string` ; `username?`: `string`  }\>

##### Parameters

| Name | Type |
| :------ | :------ |
| `client` | [`TorqueClient`](TorqueClient.md) |

##### Returns

`Promise`\<\{ `id`: `string` ; `isPublisher`: `boolean` ; `profileImage?`: `string` ; `pubKey`: `string` ; `publisherPubKey?`: ``null`` \| `string` ; `twitter?`: `string` ; `username?`: `string`  }\>

#### Defined in

[client.ts:106](https://github.com/torque-labs/torque-ts-sdk/blob/457fcab4a36eeefaa589b539522aee9858dc42ab/src/client.ts#L106)

___

### initialized

• **initialized**: `boolean` = `false`

#### Defined in

[client.ts:16](https://github.com/torque-labs/torque-ts-sdk/blob/457fcab4a36eeefaa589b539522aee9858dc42ab/src/client.ts#L16)

___

### payoutPublisher

• **payoutPublisher**: (`wallet`: `SignerWalletAdapter`) => `Promise`\<`string`\>

#### Type declaration

▸ (`wallet`): `Promise`\<`string`\>

Executes a transaction to payout a publisher on the Solana blockchain using the Torque protocol.
This function calculates the maximum amount of SOL that can be transferred from the publisher's
account and creates a transaction to transfer that amount. The transaction is then signed and
executed. This is intended for publishers to withdraw their earnings.

##### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `wallet` | `SignerWalletAdapter` | A `SignerWalletAdapter` instance representing the publisher's wallet. The wallet must have a public key associated with it. |

##### Returns

`Promise`\<`string`\>

A promise that resolves to the result of the transaction execution, indicating the
         success or failure of the payout operation.

**`Throws`**

Will throw an error if the wallet does not have a public key or if any part of the
        transaction preparation or execution process fails.

#### Defined in

[client.ts:94](https://github.com/torque-labs/torque-ts-sdk/blob/457fcab4a36eeefaa589b539522aee9858dc42ab/src/client.ts#L94)

___

### startCampaign

• **startCampaign**: (`client`: [`TorqueClient`](TorqueClient.md), `campaignId`: `string`, `publisherHandle`: `string`) => `Promise`\<\{ `campaignId`: `string` ; `status`: `string`  }\>

#### Type declaration

▸ (`client`, `campaignId`, `publisherHandle`): `Promise`\<\{ `campaignId`: `string` ; `status`: `string`  }\>

Initiates a campaign start process by sending a request to the API.

This function sends a POST request to the API's journey endpoint, attempting to start a campaign
with the provided `campaignId` and `publisherHandle`. If the API responds with a success status,
the function returns the data part of the response. In case of failure, it throws an error with
the API's returned message.

##### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `client` | [`TorqueClient`](TorqueClient.md) | An instance of `TorqueClient` used to perform the API request. |
| `campaignId` | `string` | The unique identifier of the campaign to be started. |
| `publisherHandle` | `string` | The handle (identifier) of the publisher starting the campaign. |

##### Returns

`Promise`\<\{ `campaignId`: `string` ; `status`: `string`  }\>

A Promise resolving to the data part of the API response if successful.

**`Throws`**

An error with the message from the API response if the request fails.

#### Defined in

[client.ts:88](https://github.com/torque-labs/torque-ts-sdk/blob/457fcab4a36eeefaa589b539522aee9858dc42ab/src/client.ts#L88)

## Methods

### \_getApiHeaders

▸ **_getApiHeaders**(): `Object`

Retrieves the API headers required for making requests.

#### Returns

`Object`

The API headers as an object.

| Name | Type |
| :------ | :------ |
| `Authorization` | `string` |
| `Content-Type` | `string` |

**`Throws`**

Error if no API token is found.

#### Defined in

[client.ts:45](https://github.com/torque-labs/torque-ts-sdk/blob/457fcab4a36eeefaa589b539522aee9858dc42ab/src/client.ts#L45)

___

### apiFetch

▸ **apiFetch**(`url`, `options?`): `Promise`\<`Response`\>

Makes a fetch request with the required API headers.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `url` | `string` | The URL of the API endpoint. |
| `options?` | `RequestInit` | Optional parameters for the fetch request. |

#### Returns

`Promise`\<`Response`\>

A Promise that resolves with the response from the API endpoint.

#### Defined in

[client.ts:62](https://github.com/torque-labs/torque-ts-sdk/blob/457fcab4a36eeefaa589b539522aee9858dc42ab/src/client.ts#L62)

___

### initialize

▸ **initialize**(`options`): `Promise`\<`void`\>

Initializes the TorqueClient with the provided options.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `options` | `ApiInputVerify` | The options required for API verification. |

#### Returns

`Promise`\<`void`\>

A Promise that resolves when the initialization is complete.

#### Defined in

[client.ts:33](https://github.com/torque-labs/torque-ts-sdk/blob/457fcab4a36eeefaa589b539522aee9858dc42ab/src/client.ts#L33)
