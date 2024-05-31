---
sidebar_position: 1
---

# Class: TorqueClient

[client](../modules/client.md).TorqueClient

The official Torque Typescript SDK

## Table of contents

### Constructors

- [constructor](client.TorqueClient.md#constructor)

### Properties

- [adminInitalized](client.TorqueClient.md#admininitalized)
- [apiKey](client.TorqueClient.md#apikey)
- [createCampaign](client.TorqueClient.md#createcampaign)
- [endCampaign](client.TorqueClient.md#endcampaign)
- [getAudiences](client.TorqueClient.md#getaudiences)
- [getCampaigns](client.TorqueClient.md#getcampaigns)
- [getIdentifyPayload](client.TorqueClient.md#getidentifypayload)
- [getLinks](client.TorqueClient.md#getlinks)
- [getSharedLinkData](client.TorqueClient.md#getsharedlinkdata)
- [getUser](client.TorqueClient.md#getuser)
- [getUserShareLink](client.TorqueClient.md#getusersharelink)
- [getVerifyBody](client.TorqueClient.md#getverifybody)
- [initPublisher](client.TorqueClient.md#initpublisher)
- [payoutPublisher](client.TorqueClient.md#payoutpublisher)
- [publisherHandle](client.TorqueClient.md#publisherhandle)
- [user](client.TorqueClient.md#user)
- [userInitialized](client.TorqueClient.md#userinitialized)

### Methods

- [\_getAdminHeaders](client.TorqueClient.md#_getadminheaders)
- [\_getApiHeaders](client.TorqueClient.md#_getapiheaders)
- [adminApiFetch](client.TorqueClient.md#adminapifetch)
- [apiFetch](client.TorqueClient.md#apifetch)
- [getUserHandle](client.TorqueClient.md#getuserhandle)
- [initializeUser](client.TorqueClient.md#initializeuser)
- [isUserPublisher](client.TorqueClient.md#isuserpublisher)
- [setUserPublisher](client.TorqueClient.md#setuserpublisher)

## Constructors

### constructor

• **new TorqueClient**(`publisherHandle`, `apiKey?`): [`TorqueClient`](client.TorqueClient.md)

Creates a new Torque client.

#### Parameters

| Name              | Type     | Description                                                                             |
| :---------------- | :------- | :-------------------------------------------------------------------------------------- |
| `publisherHandle` | `string` | Publisher handle to be used for offer links: pubKey, publisherPubKey, username, twitter |
| `apiKey?`         | `string` | Optional API key that enables direct API access                                         |

#### Returns

[`TorqueClient`](client.TorqueClient.md)

#### Defined in

[src/client.ts:30](https://github.com/torque-labs/torque-ts-sdk/blob/8d242e3a120b331046817aa6802b07d103b26ca4/src/client.ts#L30)

## Properties

### adminInitalized

• **adminInitalized**: `boolean` = `false`

#### Defined in

[src/client.ts:20](https://github.com/torque-labs/torque-ts-sdk/blob/8d242e3a120b331046817aa6802b07d103b26ca4/src/client.ts#L20)

---

### apiKey

• `Private` **apiKey**: `undefined` \| `null` \| `string` = `undefined`

#### Defined in

[src/client.ts:22](https://github.com/torque-labs/torque-ts-sdk/blob/8d242e3a120b331046817aa6802b07d103b26ca4/src/client.ts#L22)

---

### createCampaign

• **createCampaign**: (...`args`: [wallet: SignerWalletAdapter, data: Object]) => `Promise`\<`string`\>

Create a campaign using the passed wallet and campaign creation data.

This function creates a new campaign using the provided wallet and campaign data.
It constructs an input object with the transaction type and campaign data, and then
calls a function to prepare and execute the transaction.

**`Throws`**

If there is an error creating the campaign.

#### Type declaration

▸ (`...args`): `Promise`\<`string`\>

##### Parameters

| Name      | Type                                        |
| :-------- | :------------------------------------------ |
| `...args` | [wallet: SignerWalletAdapter, data: Object] |

##### Returns

`Promise`\<`string`\>

#### Defined in

[src/client.ts:206](https://github.com/torque-labs/torque-ts-sdk/blob/8d242e3a120b331046817aa6802b07d103b26ca4/src/client.ts#L206)

---

### endCampaign

• **endCampaign**: (...`args`: [wallet: SignerWalletAdapter, campaignId: string]) => `Promise`\<`string`\>

Ends a campaign using the provided wallet and campaign campaignId.

This function will prepare and execute the end campaign function. If the transaction
is successful, the function returns the signature of the transaction. If an error occurs
during the process, it is logged and a new error with a user-friendly message is thrown.

**`Throws`**

If there is an error ending the campaign.

#### Type declaration

▸ (`...args`): `Promise`\<`string`\>

##### Parameters

| Name      | Type                                              |
| :-------- | :------------------------------------------------ |
| `...args` | [wallet: SignerWalletAdapter, campaignId: string] |

##### Returns

`Promise`\<`string`\>

#### Defined in

[src/client.ts:221](https://github.com/torque-labs/torque-ts-sdk/blob/8d242e3a120b331046817aa6802b07d103b26ca4/src/client.ts#L221)

---

### getAudiences

• **getAudiences**: (...`args`: []) => `Promise`\<[`ApiAudience`](../modules/types.md#apiaudience)[]\>

Fetches a list of audiences from the Torque API.

If the API call is successful and the status is "SUCCESS", it returns the audiences data.
Otherwise, it returns an empty array.

#### Type declaration

▸ (`...args`): `Promise`\<[`ApiAudience`](../modules/types.md#apiaudience)[]\>

##### Parameters

| Name      | Type |
| :-------- | :--- |
| `...args` | []   |

##### Returns

`Promise`\<[`ApiAudience`](../modules/types.md#apiaudience)[]\>

#### Defined in

[src/client.ts:159](https://github.com/torque-labs/torque-ts-sdk/blob/8d242e3a120b331046817aa6802b07d103b26ca4/src/client.ts#L159)

---

### getCampaigns

• **getCampaigns**: (...`args`: []) => `Promise`\<[`ApiCampaign`](../modules/types.md#apicampaign)[]\>

Retrieves a list of active campaigns from the Torque API.

This function sends a GET request to the Torque API to fetch all campaigns that are currently marked as "ACTIVE".
It constructs a query with the status parameter set to "ACTIVE" and sends the request. Upon receiving a response,
it parses the JSON and checks the status of the response. If the status is "SUCCESS", it returns the list of active
campaigns. Otherwise, it throws an error with the message received from the API.

**`Throws`**

An error if the fetch operation fails, or if the API returns a status other than "SUCCESS".

#### Type declaration

▸ (`...args`): `Promise`\<[`ApiCampaign`](../modules/types.md#apicampaign)[]\>

##### Parameters

| Name      | Type |
| :-------- | :--- |
| `...args` | []   |

##### Returns

`Promise`\<[`ApiCampaign`](../modules/types.md#apicampaign)[]\>

#### Defined in

[src/client.ts:173](https://github.com/torque-labs/torque-ts-sdk/blob/8d242e3a120b331046817aa6802b07d103b26ca4/src/client.ts#L173)

---

### getIdentifyPayload

• **getIdentifyPayload**: () => `Promise`\<\{ `expirationTime`: `string` ; `issuedAt`: `string` ; `statement`: `string` }\> = `getIdentifyPayload`

Retrieves the payload for identification from the Torque API.

This function makes a GET request to the Torque API's identify endpoint to fetch the identification payload.
The payload includes a statement, the time it was issued, and its expiration time. If the request is successful,
the function returns the payload. Otherwise, it throws an error with the message received from the API.

**`Throws`**

Throws an error if the API request is unsuccessful or if the API response status is not "SUCCESS".

#### Type declaration

▸ (): `Promise`\<\{ `expirationTime`: `string` ; `issuedAt`: `string` ; `statement`: `string` }\>

##### Returns

`Promise`\<\{ `expirationTime`: `string` ; `issuedAt`: `string` ; `statement`: `string` }\>

#### Defined in

[src/client.ts:334](https://github.com/torque-labs/torque-ts-sdk/blob/8d242e3a120b331046817aa6802b07d103b26ca4/src/client.ts#L334)

---

### getLinks

• **getLinks**: (...`args`: []) => `Promise`\<\{ `campaignId`: `string` ; `url`: `string` }[]\>

#### Type declaration

▸ (`...args`): `Promise`\<\{ `campaignId`: `string` ; `url`: `string` }[]\>

##### Parameters

| Name      | Type |
| :-------- | :--- |
| `...args` | []   |

##### Returns

`Promise`\<\{ `campaignId`: `string` ; `url`: `string` }[]\>

#### Defined in

[src/client.ts:258](https://github.com/torque-labs/torque-ts-sdk/blob/8d242e3a120b331046817aa6802b07d103b26ca4/src/client.ts#L258)

---

### getSharedLinkData

• **getSharedLinkData**: (...`args`: [campaignId: string, handle: string]) => `Promise`\<[`ApiShare`](../modules/types.md#apishare)\>

Retrieves shared link data for a specific campaign and handle.

This function makes a GET request to the TORQUE_API_ROUTES.share endpoint,
passing the campaignId and handle as query parameters. It then processes
the response, returning the data if the request was successful, or throwing
an error if not.

**`Throws`**

Error with the message from the API response if the request fails.

#### Type declaration

▸ (`...args`): `Promise`\<[`ApiShare`](../modules/types.md#apishare)\>

##### Parameters

| Name      | Type                                 |
| :-------- | :----------------------------------- |
| `...args` | [campaignId: string, handle: string] |

##### Returns

`Promise`\<[`ApiShare`](../modules/types.md#apishare)\>

#### Defined in

[src/client.ts:190](https://github.com/torque-labs/torque-ts-sdk/blob/8d242e3a120b331046817aa6802b07d103b26ca4/src/client.ts#L190)

---

### getUser

• **getUser**: (...`args`: []) => `Promise`\<[`ApiUser`](../modules/types.md#apiuser)\>

Fetches the current user's data from the Torque API.

This function asynchronously retrieves the user data by making a call to the Torque API's user endpoint.
The function parses the JSON response into an `ApiResponse` object, which includes the user's details
such as ID, public key, Twitter handle, profile image URL, username, publisher status, and publisher public key.

**`Throws`**

Throws an error if the API response status is not "SUCCESS".

#### Type declaration

▸ (`...args`): `Promise`\<[`ApiUser`](../modules/types.md#apiuser)\>

##### Parameters

| Name      | Type |
| :-------- | :--- |
| `...args` | []   |

##### Returns

`Promise`\<[`ApiUser`](../modules/types.md#apiuser)\>

#### Defined in

[src/client.ts:237](https://github.com/torque-labs/torque-ts-sdk/blob/8d242e3a120b331046817aa6802b07d103b26ca4/src/client.ts#L237)

---

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

| Name      | Type                 |
| :-------- | :------------------- |
| `...args` | [campaignId: string] |

##### Returns

`Promise`\<`string`\>

#### Defined in

[src/client.ts:318](https://github.com/torque-labs/torque-ts-sdk/blob/8d242e3a120b331046817aa6802b07d103b26ca4/src/client.ts#L318)

---

### getVerifyBody

• **getVerifyBody**: (`params`: [`ApiInputVerify`](../modules/types.md#apiinputverify)) => \{ `authType`: `"siws"` ; `payload`: \{ `input`: `SolanaSignInInput` = payload.input; `output`: `SolanaSignInOutput` } ; `pubKey`: `string` } \| \{ `authType`: `"basic"` ; `payload`: \{ `input`: `string` = payload.input; `output`: `string` = payload.output } ; `pubKey`: `string` } = `getVerifyBody`

Constructs the body for the verify API request based on the authentication type.

This function prepares the request body for the verification process, handling
different structures based on the authentication type specified. For `siws` authentication,
it processes the public key, signature, and signed message to ensure they are in the correct
format (Uint8Array) for transmission. For other authentication types, it passes the payload
as-is.

#### Type declaration

▸ (`params`): \{ `authType`: `"siws"` ; `payload`: \{ `input`: `SolanaSignInInput` = payload.input; `output`: `SolanaSignInOutput` } ; `pubKey`: `string` } \| \{ `authType`: `"basic"` ; `payload`: \{ `input`: `string` = payload.input; `output`: `string` = payload.output } ; `pubKey`: `string` }

##### Parameters

| Name     | Type                                                   | Description                                      |
| :------- | :----------------------------------------------------- | :----------------------------------------------- |
| `params` | [`ApiInputVerify`](../modules/types.md#apiinputverify) | The parameters for constructing the verify body. |

##### Returns

\{ `authType`: `"siws"` ; `payload`: \{ `input`: `SolanaSignInInput` = payload.input; `output`: `SolanaSignInOutput` } ; `pubKey`: `string` } \| \{ `authType`: `"basic"` ; `payload`: \{ `input`: `string` = payload.input; `output`: `string` = payload.output } ; `pubKey`: `string` }

#### Defined in

[src/client.ts:351](https://github.com/torque-labs/torque-ts-sdk/blob/8d242e3a120b331046817aa6802b07d103b26ca4/src/client.ts#L351)

---

### initPublisher

• **initPublisher**: (...`args`: [wallet: SignerWalletAdapter]) => `Promise`\<`string`\>

Initializes a publisher by sending a serialized transaction to the Torque API.
This function attempts to create a new publisher using the provided serialized transaction.
If successful, it returns the data containing the publisher's public key.

**`Throws`**

Will throw an error if the API call fails or if the response status is not `SUCCESS`.

#### Type declaration

▸ (`...args`): `Promise`\<`string`\>

##### Parameters

| Name      | Type                          |
| :-------- | :---------------------------- |
| `...args` | [wallet: SignerWalletAdapter] |

##### Returns

`Promise`\<`string`\>

#### Defined in

[src/client.ts:273](https://github.com/torque-labs/torque-ts-sdk/blob/8d242e3a120b331046817aa6802b07d103b26ca4/src/client.ts#L273)

---

### payoutPublisher

• **payoutPublisher**: (...`args`: [wallet: SignerWalletAdapter, data: Object]) => `Promise`\<`string`\>

Processes a payout to a publisher by sending a serialized transaction.
This function attempts to execute a payout transaction for the publisher using the provided wallet.
It leverages the `payoutPublisherTxn` function to create and send the transaction.

**`Throws`**

Will throw an error if the transaction fails to process or if there's an issue with the transaction creation.

#### Type declaration

▸ (`...args`): `Promise`\<`string`\>

##### Parameters

| Name      | Type                                        |
| :-------- | :------------------------------------------ |
| `...args` | [wallet: SignerWalletAdapter, data: Object] |

##### Returns

`Promise`\<`string`\>

#### Defined in

[src/client.ts:284](https://github.com/torque-labs/torque-ts-sdk/blob/8d242e3a120b331046817aa6802b07d103b26ca4/src/client.ts#L284)

---

### publisherHandle

• **publisherHandle**: `string`

#### Defined in

[src/client.ts:18](https://github.com/torque-labs/torque-ts-sdk/blob/8d242e3a120b331046817aa6802b07d103b26ca4/src/client.ts#L18)

---

### user

• `Private` **user**: `null` \| [`ApiVerifiedUser`](../modules/types.md#apiverifieduser) = `null`

#### Defined in

[src/client.ts:21](https://github.com/torque-labs/torque-ts-sdk/blob/8d242e3a120b331046817aa6802b07d103b26ca4/src/client.ts#L21)

---

### userInitialized

• **userInitialized**: `boolean` = `false`

#### Defined in

[src/client.ts:19](https://github.com/torque-labs/torque-ts-sdk/blob/8d242e3a120b331046817aa6802b07d103b26ca4/src/client.ts#L19)

## Methods

### \_getAdminHeaders

▸ **\_getAdminHeaders**(): `undefined` \| \{ `x-torque-api-key`: `string` }

Retrieves the API headers for making requests.

#### Returns

`undefined` \| \{ `x-torque-api-key`: `string` }

The API headers as an object.

#### Defined in

[src/client.ts:77](https://github.com/torque-labs/torque-ts-sdk/blob/8d242e3a120b331046817aa6802b07d103b26ca4/src/client.ts#L77)

---

### \_getApiHeaders

▸ **\_getApiHeaders**(): `undefined` \| \{ `Authorization`: `string` }

Retrieves the user's authorization header.

#### Returns

`undefined` \| \{ `Authorization`: `string` }

The API headers as an object.

#### Defined in

[src/client.ts:65](https://github.com/torque-labs/torque-ts-sdk/blob/8d242e3a120b331046817aa6802b07d103b26ca4/src/client.ts#L65)

---

### adminApiFetch

▸ **adminApiFetch**(`url`, `options?`): `Promise`\<`Response`\>

Fetch request on using admin API key.

#### Parameters

| Name       | Type          | Description                                |
| :--------- | :------------ | :----------------------------------------- |
| `url`      | `string`      | The URL of the API endpoint.               |
| `options?` | `RequestInit` | Optional parameters for the fetch request. |

#### Returns

`Promise`\<`Response`\>

A Promise that resolves with the response from the API endpoint.

#### Defined in

[src/client.ts:124](https://github.com/torque-labs/torque-ts-sdk/blob/8d242e3a120b331046817aa6802b07d103b26ca4/src/client.ts#L124)

---

### apiFetch

▸ **apiFetch**(`url`, `options?`): `Promise`\<`Response`\>

Fetch request on using the user's API token.

#### Parameters

| Name       | Type          | Description                                |
| :--------- | :------------ | :----------------------------------------- |
| `url`      | `string`      | The URL of the API endpoint.               |
| `options?` | `RequestInit` | Optional parameters for the fetch request. |

#### Returns

`Promise`\<`Response`\>

A Promise that resolves with the response from the API endpoint.

#### Defined in

[src/client.ts:93](https://github.com/torque-labs/torque-ts-sdk/blob/8d242e3a120b331046817aa6802b07d103b26ca4/src/client.ts#L93)

---

### getUserHandle

▸ **getUserHandle**(): `undefined` \| `null` \| `string`

Retrieves the user's handle.

#### Returns

`undefined` \| `null` \| `string`

The user's handle or `undefined` if no handle is available.

#### Defined in

[src/client.ts:244](https://github.com/torque-labs/torque-ts-sdk/blob/8d242e3a120b331046817aa6802b07d103b26ca4/src/client.ts#L244)

---

### initializeUser

▸ **initializeUser**(`userAuth`): `Promise`\<[`ApiVerifiedUser`](../modules/types.md#apiverifieduser)\>

Initializes the TorqueClient with the provided options.

#### Parameters

| Name       | Type                                                   | Description                                                                |
| :--------- | :----------------------------------------------------- | :------------------------------------------------------------------------- |
| `userAuth` | [`ApiInputVerify`](../modules/types.md#apiinputverify) | User signature object that is required to authenticate a user with Torque. |

#### Returns

`Promise`\<[`ApiVerifiedUser`](../modules/types.md#apiverifieduser)\>

A Promise that resolves when the initialization is complete.

**`Throws`**

If user was not verified.

#### Defined in

[src/client.ts:48](https://github.com/torque-labs/torque-ts-sdk/blob/8d242e3a120b331046817aa6802b07d103b26ca4/src/client.ts#L48)

---

### isUserPublisher

▸ **isUserPublisher**(): `boolean`

Checks if the current user is a publisher.

#### Returns

`boolean`

True if the user is marked as a publisher, false otherwise.

#### Defined in

[src/client.ts:303](https://github.com/torque-labs/torque-ts-sdk/blob/8d242e3a120b331046817aa6802b07d103b26ca4/src/client.ts#L303)

---

### setUserPublisher

▸ **setUserPublisher**(`publisherPubKey`): `void`

Sets the publisher public key for the current user.

#### Parameters

| Name              | Type     | Description                             |
| :---------------- | :------- | :-------------------------------------- |
| `publisherPubKey` | `string` | The public key of the publisher to set. |

#### Returns

`void`

#### Defined in

[src/client.ts:291](https://github.com/torque-labs/torque-ts-sdk/blob/8d242e3a120b331046817aa6802b07d103b26ca4/src/client.ts#L291)
