[torque-ts-sdk](../README.md) / [Exports](../modules.md) / TorqueClient

# Class: TorqueClient

## Table of contents

### Constructors

- [constructor](TorqueClient.md#constructor)

### Properties

- [getAudiences](TorqueClient.md#getaudiences)
- [getCampaigns](TorqueClient.md#getcampaigns)
- [getIdentifyPayload](TorqueClient.md#getidentifypayload)
- [getLinks](TorqueClient.md#getlinks)
- [getSharedLinkData](TorqueClient.md#getsharedlinkdata)
- [getUser](TorqueClient.md#getuser)
- [getUserShareLink](TorqueClient.md#getusersharelink)
- [getVerifyBody](TorqueClient.md#getverifybody)
- [initPublisher](TorqueClient.md#initpublisher)
- [initialized](TorqueClient.md#initialized)
- [payoutPublisher](TorqueClient.md#payoutpublisher)
- [publisherHandle](TorqueClient.md#publisherhandle)
- [user](TorqueClient.md#user)

### Methods

- [\_getApiHeaders](TorqueClient.md#_getapiheaders)
- [apiFetch](TorqueClient.md#apifetch)
- [getUserHandle](TorqueClient.md#getuserhandle)
- [initialize](TorqueClient.md#initialize)
- [isUserPublisher](TorqueClient.md#isuserpublisher)
- [setUserPublisher](TorqueClient.md#setuserpublisher)

## Constructors

### constructor

• **new TorqueClient**(`publisherHandle`): [`TorqueClient`](TorqueClient.md)

Creates a new Torque client.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `publisherHandle` | `string` | Publisher handle to be used for offer links: pubKey, publisherPubKey, username, twitter |

#### Returns

[`TorqueClient`](TorqueClient.md)

#### Defined in

[src/client.ts:19](https://github.com/torque-labs/torque-ts-sdk/blob/82c0f0054819300c00990cc3d24f1f60da91a74b/src/client.ts#L19)

## Properties

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

[src/client.ts:93](https://github.com/torque-labs/torque-ts-sdk/blob/82c0f0054819300c00990cc3d24f1f60da91a74b/src/client.ts#L93)

___

### getCampaigns

• **getCampaigns**: (...`args`: []) => `Promise`\<[`ApiCampaign`](../modules.md#apicampaign)[]\>

Retrieves a list of active campaigns from the Torque API.

This function sends a GET request to the Torque API to fetch all campaigns that are currently marked as "ACTIVE".
It constructs a query with the status parameter set to "ACTIVE" and sends the request. Upon receiving a response,
it parses the JSON and checks the status of the response. If the status is "SUCCESS", it returns the list of active
campaigns. Otherwise, it throws an error with the message received from the API.

**`Throws`**

An error if the fetch operation fails, or if the API returns a status other than "SUCCESS".

#### Type declaration

▸ (`...args`): `Promise`\<[`ApiCampaign`](../modules.md#apicampaign)[]\>

##### Parameters

| Name | Type |
| :------ | :------ |
| `...args` | [] |

##### Returns

`Promise`\<[`ApiCampaign`](../modules.md#apicampaign)[]\>

#### Defined in

[src/client.ts:106](https://github.com/torque-labs/torque-ts-sdk/blob/82c0f0054819300c00990cc3d24f1f60da91a74b/src/client.ts#L106)

___

### getIdentifyPayload

• **getIdentifyPayload**: () => `Promise`\<\{ `expirationTime`: `string` ; `issuedAt`: `string` ; `statement`: `string`  }\> = `getIdentifyPayload`

Retrieves the payload for identification from the Torque API.

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

[src/client.ts:245](https://github.com/torque-labs/torque-ts-sdk/blob/82c0f0054819300c00990cc3d24f1f60da91a74b/src/client.ts#L245)

___

### getLinks

• **getLinks**: (...`args`: []) => `Promise`\<\{ `campaignId`: `string` ; `url`: `string`  }[]\>

Fetches all of the user's share links using the Torque API.

This function sends a GET request to the Torque API to fetch all share links for a for the
current user. Upon success, it returns an array of URLs and campaign IDs of the user's share links.
If the operation fails or the API returns a status other than "SUCCESS", it throws an error with a
descriptive message.

**`Throws`**

An error if the link fetch fails or if the API returns a status other than "SUCCESS".

#### Type declaration

▸ (`...args`): `Promise`\<\{ `campaignId`: `string` ; `url`: `string`  }[]\>

##### Parameters

| Name | Type |
| :------ | :------ |
| `...args` | [] |

##### Returns

`Promise`\<\{ `campaignId`: `string` ; `url`: `string`  }[]\>

#### Defined in

[src/client.ts:169](https://github.com/torque-labs/torque-ts-sdk/blob/82c0f0054819300c00990cc3d24f1f60da91a74b/src/client.ts#L169)

___

### getSharedLinkData

• **getSharedLinkData**: (...`args`: [campaignId: string, handle: string]) => `Promise`\<[`ApiShare`](../modules.md#apishare)\>

Retrieves shared link data for a specific campaign and handle.

This function makes a GET request to the TORQUE_API_ROUTES.share endpoint,
passing the campaignId and handle as query parameters. It then processes
the response, returning the data if the request was successful, or throwing
an error if not.

**`Throws`**

Error with the message from the API response if the request fails.

#### Type declaration

▸ (`...args`): `Promise`\<[`ApiShare`](../modules.md#apishare)\>

##### Parameters

| Name | Type |
| :------ | :------ |
| `...args` | [campaignId: string, handle: string] |

##### Returns

`Promise`\<[`ApiShare`](../modules.md#apishare)\>

#### Defined in

[src/client.ts:121](https://github.com/torque-labs/torque-ts-sdk/blob/82c0f0054819300c00990cc3d24f1f60da91a74b/src/client.ts#L121)

___

### getUser

• **getUser**: (...`args`: []) => `Promise`\<[`ApiUser`](../modules.md#apiuser)\>

Fetches the current user's data from the Torque API.

This function asynchronously retrieves the user data by making a call to the Torque API's user endpoint.
The function parses the JSON response into an `ApiResponse` object, which includes the user's details
such as ID, public key, Twitter handle, profile image URL, username, publisher status, and publisher public key.

**`Throws`**

Throws an error if the API response status is not "SUCCESS".

#### Type declaration

▸ (`...args`): `Promise`\<[`ApiUser`](../modules.md#apiuser)\>

##### Parameters

| Name | Type |
| :------ | :------ |
| `...args` | [] |

##### Returns

`Promise`\<[`ApiUser`](../modules.md#apiuser)\>

#### Defined in

[src/client.ts:137](https://github.com/torque-labs/torque-ts-sdk/blob/82c0f0054819300c00990cc3d24f1f60da91a74b/src/client.ts#L137)

___

### getUserShareLink

• **getUserShareLink**: (...`args`: [campaignId: string]) => `Promise`\<`string`\>

Generates a URL for a user's shared link for a specific campaign.

This function checks if the user is a publisher and has a handle,
then constructs and returns a URL using the user's handle and the campaign ID.
If the user is not a publisher or does not have a handle, an error is thrown.

**`Throws`**

Throws an error if the user is not a publisher or does not have a handle.

#### Type declaration

▸ (`...args`): `Promise`\<`string`\>

##### Parameters

| Name | Type |
| :------ | :------ |
| `...args` | [campaignId: string] |

##### Returns

`Promise`\<`string`\>

#### Defined in

[src/client.ts:229](https://github.com/torque-labs/torque-ts-sdk/blob/82c0f0054819300c00990cc3d24f1f60da91a74b/src/client.ts#L229)

___

### getVerifyBody

• **getVerifyBody**: (`params`: [`ApiInputVerify`](../modules.md#apiinputverify)) => \{ `authType`: ``"siws"`` ; `payload`: \{ `input`: `SolanaSignInInput` = payload.input; `output`: \{ `account`: \{ `address`: `string` ; `chains`: `IdentifierArray` ; `features`: `IdentifierArray` ; `icon?`: \`data:image/svg+xml;base64,$\{string}\` \| \`data:image/webp;base64,$\{string}\` \| \`data:image/png;base64,$\{string}\` \| \`data:image/gif;base64,$\{string}\` ; `label?`: `string` ; `publicKey`: `number`[]  } ; `signature`: `Uint8Array` ; `signedMessage`: `Uint8Array`  }  } ; `pubKey`: `string`  } \| \{ `authType`: ``"basic"`` ; `payload`: \{ `input`: `string` = payload.input; `output`: `string` = payload.output } ; `pubKey`: `string`  } = `getVerifyBody`

Constructs the body for the verify API request based on the authentication type.

This function prepares the request body for the verification process, handling
different structures based on the authentication type specified. For `siws` authentication,
it processes the public key, signature, and signed message to ensure they are in the correct
format (Uint8Array) for transmission. For other authentication types, it passes the payload
as-is.

#### Type declaration

▸ (`params`): \{ `authType`: ``"siws"`` ; `payload`: \{ `input`: `SolanaSignInInput` = payload.input; `output`: \{ `account`: \{ `address`: `string` ; `chains`: `IdentifierArray` ; `features`: `IdentifierArray` ; `icon?`: \`data:image/svg+xml;base64,$\{string}\` \| \`data:image/webp;base64,$\{string}\` \| \`data:image/png;base64,$\{string}\` \| \`data:image/gif;base64,$\{string}\` ; `label?`: `string` ; `publicKey`: `number`[]  } ; `signature`: `Uint8Array` ; `signedMessage`: `Uint8Array`  }  } ; `pubKey`: `string`  } \| \{ `authType`: ``"basic"`` ; `payload`: \{ `input`: `string` = payload.input; `output`: `string` = payload.output } ; `pubKey`: `string`  }

##### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `params` | [`ApiInputVerify`](../modules.md#apiinputverify) | The parameters for constructing the verify body. |

##### Returns

\{ `authType`: ``"siws"`` ; `payload`: \{ `input`: `SolanaSignInInput` = payload.input; `output`: \{ `account`: \{ `address`: `string` ; `chains`: `IdentifierArray` ; `features`: `IdentifierArray` ; `icon?`: \`data:image/svg+xml;base64,$\{string}\` \| \`data:image/webp;base64,$\{string}\` \| \`data:image/png;base64,$\{string}\` \| \`data:image/gif;base64,$\{string}\` ; `label?`: `string` ; `publicKey`: `number`[]  } ; `signature`: `Uint8Array` ; `signedMessage`: `Uint8Array`  }  } ; `pubKey`: `string`  } \| \{ `authType`: ``"basic"`` ; `payload`: \{ `input`: `string` = payload.input; `output`: `string` = payload.output } ; `pubKey`: `string`  }

#### Defined in

[src/client.ts:262](https://github.com/torque-labs/torque-ts-sdk/blob/82c0f0054819300c00990cc3d24f1f60da91a74b/src/client.ts#L262)

___

### initPublisher

• **initPublisher**: (...`args`: [wallet: SignerWalletAdapter]) => `Promise`\<\{ `publisherPubKey`: `string`  }\>

Initializes a publisher by sending a serialized transaction to the Torque API.
This function attempts to create a new publisher using the provided serialized transaction.
If successful, it returns the data containing the publisher's public key.

**`Throws`**

Will throw an error if the API call fails or if the response status is not `SUCCESS`.

#### Type declaration

▸ (`...args`): `Promise`\<\{ `publisherPubKey`: `string`  }\>

##### Parameters

| Name | Type |
| :------ | :------ |
| `...args` | [wallet: SignerWalletAdapter] |

##### Returns

`Promise`\<\{ `publisherPubKey`: `string`  }\>

#### Defined in

[src/client.ts:184](https://github.com/torque-labs/torque-ts-sdk/blob/82c0f0054819300c00990cc3d24f1f60da91a74b/src/client.ts#L184)

___

### initialized

• `Private` **initialized**: `boolean` = `false`

#### Defined in

[src/client.ts:11](https://github.com/torque-labs/torque-ts-sdk/blob/82c0f0054819300c00990cc3d24f1f60da91a74b/src/client.ts#L11)

___

### payoutPublisher

• **payoutPublisher**: (...`args`: [wallet: SignerWalletAdapter]) => `Promise`\<`string`\>

Processes a payout to a publisher by sending a serialized transaction.
This function attempts to execute a payout transaction for the publisher using the provided wallet.
It leverages the `payoutPublisherTxn` function to create and send the transaction.

**`Throws`**

Will throw an error if the transaction fails to process or if there's an issue with the transaction creation.

#### Type declaration

▸ (`...args`): `Promise`\<`string`\>

##### Parameters

| Name | Type |
| :------ | :------ |
| `...args` | [wallet: SignerWalletAdapter] |

##### Returns

`Promise`\<`string`\>

#### Defined in

[src/client.ts:195](https://github.com/torque-labs/torque-ts-sdk/blob/82c0f0054819300c00990cc3d24f1f60da91a74b/src/client.ts#L195)

___

### publisherHandle

• **publisherHandle**: `string`

#### Defined in

[src/client.ts:10](https://github.com/torque-labs/torque-ts-sdk/blob/82c0f0054819300c00990cc3d24f1f60da91a74b/src/client.ts#L10)

___

### user

• `Private` **user**: ``null`` \| [`ApiVerifiedUser`](../modules.md#apiverifieduser) = `null`

#### Defined in

[src/client.ts:12](https://github.com/torque-labs/torque-ts-sdk/blob/82c0f0054819300c00990cc3d24f1f60da91a74b/src/client.ts#L12)

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

[src/client.ts:48](https://github.com/torque-labs/torque-ts-sdk/blob/82c0f0054819300c00990cc3d24f1f60da91a74b/src/client.ts#L48)

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

[src/client.ts:66](https://github.com/torque-labs/torque-ts-sdk/blob/82c0f0054819300c00990cc3d24f1f60da91a74b/src/client.ts#L66)

___

### getUserHandle

▸ **getUserHandle**(): `undefined` \| ``null`` \| `string`

Retrieves the user's handle.

#### Returns

`undefined` \| ``null`` \| `string`

The user's handle or `undefined` if no handle is available.

#### Defined in

[src/client.ts:144](https://github.com/torque-labs/torque-ts-sdk/blob/82c0f0054819300c00990cc3d24f1f60da91a74b/src/client.ts#L144)

___

### initialize

▸ **initialize**(`options`): `Promise`\<`string`\>

Initializes the TorqueClient with the provided options.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `options` | [`ApiInputVerify`](../modules.md#apiinputverify) | The options required for API verification. |

#### Returns

`Promise`\<`string`\>

A Promise that resolves when the initialization is complete.

**`Throws`**

If user was not verified.

#### Defined in

[src/client.ts:30](https://github.com/torque-labs/torque-ts-sdk/blob/82c0f0054819300c00990cc3d24f1f60da91a74b/src/client.ts#L30)

___

### isUserPublisher

▸ **isUserPublisher**(): `boolean`

Checks if the current user is a publisher.

#### Returns

`boolean`

True if the user is marked as a publisher, false otherwise.

#### Defined in

[src/client.ts:214](https://github.com/torque-labs/torque-ts-sdk/blob/82c0f0054819300c00990cc3d24f1f60da91a74b/src/client.ts#L214)

___

### setUserPublisher

▸ **setUserPublisher**(`publisherPubKey`): `void`

Sets the publisher public key for the current user.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `publisherPubKey` | `string` | The public key of the publisher to set. |

#### Returns

`void`

#### Defined in

[src/client.ts:202](https://github.com/torque-labs/torque-ts-sdk/blob/82c0f0054819300c00990cc3d24f1f60da91a74b/src/client.ts#L202)
