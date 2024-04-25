[torque-ts-sdk](../README.md) / [Exports](../modules.md) / TorqueClient

# Class: TorqueClient

## Table of contents

### Constructors

- [constructor](TorqueClient.md#constructor)

### Properties

- [api\_token](TorqueClient.md#api_token)
- [getAudiences](TorqueClient.md#getaudiences)
- [getCampaigns](TorqueClient.md#getcampaigns)
- [getIdentifyPayload](TorqueClient.md#getidentifypayload)
- [getLinks](TorqueClient.md#getlinks)
- [getSharedLinkData](TorqueClient.md#getsharedlinkdata)
- [getUser](TorqueClient.md#getuser)
- [initialized](TorqueClient.md#initialized)
- [publisherHandle](TorqueClient.md#publisherhandle)

### Methods

- [\_getApiHeaders](TorqueClient.md#_getapiheaders)
- [apiFetch](TorqueClient.md#apifetch)
- [initialize](TorqueClient.md#initialize)

## Constructors

### constructor

• **new TorqueClient**(`publisherHandle`, `options`): [`TorqueClient`](TorqueClient.md)

Initializes the TorqueClient with the provided options.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `publisherHandle` | `string` | The publisher's handle or publisherPubKey to be used for offer links. |
| `options` | [`ApiInputVerify`](../modules.md#apiinputverify) | The options required for API verification. |

#### Returns

[`TorqueClient`](TorqueClient.md)

A Promise that resolves when the initialization is complete.

#### Defined in

[src/client.ts:19](https://github.com/torque-labs/torque-ts-sdk/blob/ab64622a4de69c8aabdb5d18bf7b42d2ca787e24/src/client.ts#L19)

## Properties

### api\_token

• `Private` **api\_token**: ``null`` \| `string` = `null`

#### Defined in

[src/client.ts:11](https://github.com/torque-labs/torque-ts-sdk/blob/ab64622a4de69c8aabdb5d18bf7b42d2ca787e24/src/client.ts#L11)

___

### getAudiences

• **getAudiences**: (...`args`: []) => `Promise`\<[`ApiAudience`](../modules.md#apiaudience)[]\>

Fetches a list of audiences from the Torque API.

If the API call is successful and the status is "SUCCESS", it returns the audiences data.
Otherwise, it returns an empty array.

#### Type declaration

▸ (`...args`): `Promise`\<[`ApiAudience`](../modules.md#apiaudience)[]\>

##### Parameters

| Name | Type |
| :------ | :------ |
| `...args` | [] |

##### Returns

`Promise`\<[`ApiAudience`](../modules.md#apiaudience)[]\>

#### Defined in

[src/client.ts:85](https://github.com/torque-labs/torque-ts-sdk/blob/ab64622a4de69c8aabdb5d18bf7b42d2ca787e24/src/client.ts#L85)

___

### getCampaigns

• **getCampaigns**: (...`args`: []) => `Promise`\<[`ApiCampaign`](../modules.md#apicampaign)[]\>

Retrieves a list of active campaigns from the Torque API.

This function sends a GET request to the Torque API to fetch all campaigns that are currently avaialable for the user. Upon receiving
a response, it parses the JSON and checks the status of the response. If the status is "SUCCESS", it returns the list of active
campaigns. Otherwise, it throws an error with the message received from the API.

**`Throws`**

if the fetch operation fails, or if the API returns a status other than "SUCCESS".

#### Type declaration

▸ (`...args`): `Promise`\<[`ApiCampaign`](../modules.md#apicampaign)[]\>

##### Parameters

| Name | Type |
| :------ | :------ |
| `...args` | [] |

##### Returns

`Promise`\<[`ApiCampaign`](../modules.md#apicampaign)[]\>

#### Defined in

[src/client.ts:97](https://github.com/torque-labs/torque-ts-sdk/blob/ab64622a4de69c8aabdb5d18bf7b42d2ca787e24/src/client.ts#L97)

___

### getIdentifyPayload

• **getIdentifyPayload**: () => `Promise`\<\{ `expirationTime`: `string` ; `issuedAt`: `string` ; `statement`: `string`  }\>

Retrieves the payload for identification from the Torque API. The paylaod can then be used with the verification function

This function makes a GET request to the Torque API's identify endpoint to fetch the identification payload.
The payload includes a statement, the time it was issued, and its expiration time. If the request is successful,
the function returns the payload. Otherwise, it throws an error with the message received from the API.

**`Throws`**

Throws an error if the API request is unsuccessful or if the API response status is not "SUCCESS".

#### Type declaration

▸ (): `Promise`\<\{ `expirationTime`: `string` ; `issuedAt`: `string` ; `statement`: `string`  }\>

##### Returns

`Promise`\<\{ `expirationTime`: `string` ; `issuedAt`: `string` ; `statement`: `string`  }\>

#### Defined in

[src/client.ts:150](https://github.com/torque-labs/torque-ts-sdk/blob/ab64622a4de69c8aabdb5d18bf7b42d2ca787e24/src/client.ts#L150)

___

### getLinks

• **getLinks**: (...`args`: []) => `Promise`\<\{ `campaignId`: `string` ; `url`: `string`  }[]\>

Fetches all of the user's share links using the Torque API.

This function sends a GET request to the Torque API to fetch all share links for a for the
current user. Upon success, it returns an array of URLs and campaign IDs of the user's share links.
If the operation fails or the API returns a status other than "SUCCESS", it throws an error with a
descriptive message.

**`Throws`**

if the link fetch fails or if the API returns a status other than "SUCCESS".

#### Type declaration

▸ (`...args`): `Promise`\<\{ `campaignId`: `string` ; `url`: `string`  }[]\>

##### Parameters

| Name | Type |
| :------ | :------ |
| `...args` | [] |

##### Returns

`Promise`\<\{ `campaignId`: `string` ; `url`: `string`  }[]\>

#### Defined in

[src/client.ts:110](https://github.com/torque-labs/torque-ts-sdk/blob/ab64622a4de69c8aabdb5d18bf7b42d2ca787e24/src/client.ts#L110)

___

### getSharedLinkData

• **getSharedLinkData**: (...`args`: [campaignId: string, handle: string]) => `Promise`\<[`ApiShare`](../modules.md#apishare)\>

Retrieves shared link data for a specific campaign and handle.

This function makes a GET request to the TORQUE_API_ROUTES.share endpoint,
passing the campaignId and handle as query parameters. It then processes
the response, returning the data if the request was successful, or throwing
an error if not.

**`Throws`**

with the message from the API response if the request fails.

#### Type declaration

▸ (`...args`): `Promise`\<[`ApiShare`](../modules.md#apishare)\>

##### Parameters

| Name | Type |
| :------ | :------ |
| `...args` | [campaignId: string, handle: string] |

##### Returns

`Promise`\<[`ApiShare`](../modules.md#apishare)\>

#### Defined in

[src/client.ts:125](https://github.com/torque-labs/torque-ts-sdk/blob/ab64622a4de69c8aabdb5d18bf7b42d2ca787e24/src/client.ts#L125)

___

### getUser

• **getUser**: (...`args`: []) => `Promise`\<\{ `id`: `string` ; `isPublisher`: `boolean` ; `profileImage?`: `string` ; `pubKey`: `string` ; `publisherPubKey?`: ``null`` \| `string` ; `twitter?`: `string` ; `username?`: `string`  }\>

Fetches the current user's data from the Torque API.

This function asynchronously retrieves the user data by making a call to the Torque API's user endpoint.
It expects a `TorqueClient` instance as its parameter, which is used to perform the API fetch.
The function parses the JSON response into an `ApiResponse` object, which includes the user's details
such as ID, public key, Twitter handle, profile image URL, username, publisher status, and publisher public key.

**`Throws`**

Throws an error if the API response status is not "SUCCESS".

#### Type declaration

▸ (`...args`): `Promise`\<\{ `id`: `string` ; `isPublisher`: `boolean` ; `profileImage?`: `string` ; `pubKey`: `string` ; `publisherPubKey?`: ``null`` \| `string` ; `twitter?`: `string` ; `username?`: `string`  }\>

##### Parameters

| Name | Type |
| :------ | :------ |
| `...args` | [] |

##### Returns

`Promise`\<\{ `id`: `string` ; `isPublisher`: `boolean` ; `profileImage?`: `string` ; `pubKey`: `string` ; `publisherPubKey?`: ``null`` \| `string` ; `twitter?`: `string` ; `username?`: `string`  }\>

#### Defined in

[src/client.ts:138](https://github.com/torque-labs/torque-ts-sdk/blob/ab64622a4de69c8aabdb5d18bf7b42d2ca787e24/src/client.ts#L138)

___

### initialized

• `Private` **initialized**: `boolean` = `false`

#### Defined in

[src/client.ts:10](https://github.com/torque-labs/torque-ts-sdk/blob/ab64622a4de69c8aabdb5d18bf7b42d2ca787e24/src/client.ts#L10)

___

### publisherHandle

• **publisherHandle**: ``null`` \| `string` = `null`

#### Defined in

[src/client.ts:9](https://github.com/torque-labs/torque-ts-sdk/blob/ab64622a4de69c8aabdb5d18bf7b42d2ca787e24/src/client.ts#L9)

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

if no API token is found.

#### Defined in

[src/client.ts:45](https://github.com/torque-labs/torque-ts-sdk/blob/ab64622a4de69c8aabdb5d18bf7b42d2ca787e24/src/client.ts#L45)

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

[src/client.ts:62](https://github.com/torque-labs/torque-ts-sdk/blob/ab64622a4de69c8aabdb5d18bf7b42d2ca787e24/src/client.ts#L62)

___

### initialize

▸ **initialize**(`options`): `Promise`\<`void`\>

Initializes the TorqueClient with the provided options.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `options` | [`ApiInputVerify`](../modules.md#apiinputverify) | The options required for API verification. |

#### Returns

`Promise`\<`void`\>

A Promise that resolves when the initialization is complete.

#### Defined in

[src/client.ts:29](https://github.com/torque-labs/torque-ts-sdk/blob/ab64622a4de69c8aabdb5d18bf7b42d2ca787e24/src/client.ts#L29)
