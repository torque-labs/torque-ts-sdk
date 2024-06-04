[torque-ts-sdk](../README.md) / [Exports](../modules.md) / TorqueUserClient

# Class: TorqueUserClient

The TorqueUserClient class is used to authenticate a user with the Torque API.
The user client allows publishers to fetch campaigns and offers that are available for the current user.

**`Example`**

```ts
const client = new TorqueUserClient();

// Check if the user is already logged in with API
const currentUser = await client.getCurrentUser();

const user = currentUser
  ? currentUser
  : await this.initializeUser(ApiInputLogin);
```

## Table of contents

### Constructors

- [constructor](TorqueUserClient.md#constructor)

### Properties

- [client](TorqueUserClient.md#client)
- [initialized](TorqueUserClient.md#initialized)
- [publisherHandle](TorqueUserClient.md#publisherhandle)
- [user](TorqueUserClient.md#user)

### Methods

- [getAllUserShareLinks](TorqueUserClient.md#getallusersharelinks)
- [getCampaigns](TorqueUserClient.md#getcampaigns)
- [getCurrentUser](TorqueUserClient.md#getcurrentuser)
- [getSharedLinkData](TorqueUserClient.md#getsharedlinkdata)
- [getUserHandle](TorqueUserClient.md#getuserhandle)
- [getUserShareLink](TorqueUserClient.md#getusersharelink)
- [initializeUser](TorqueUserClient.md#initializeuser)
- [isPublisher](TorqueUserClient.md#ispublisher)
- [login](TorqueUserClient.md#login)

## Constructors

### constructor

• **new TorqueUserClient**(`signer`, `publisherHandle?`): [`TorqueUserClient`](TorqueUserClient.md)

Create a new instance of the TorqueUserClient class with the publisher's handle, if provided.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `signer` | `SignerWalletAdapter` \| `Keypair` | The signer used to sign transactions. |
| `publisherHandle?` | `string` | The publisher handle as registered with Torque (twitter, publisher pubKey or wallet address used when signing up). |

#### Returns

[`TorqueUserClient`](TorqueUserClient.md)

**`Throws`**

Throws an error if the user's wallet is not provided.

#### Defined in

[src/classes/user.ts:35](https://github.com/torque-labs/torque-ts-sdk/blob/f017e3d354c17063da4ba8e079313e0799f76ecf/src/classes/user.ts#L35)

## Properties

### client

• `Private` **client**: `undefined` \| [`TorqueRequestClient`](TorqueRequestClient.md)

#### Defined in

[src/classes/user.ts:24](https://github.com/torque-labs/torque-ts-sdk/blob/f017e3d354c17063da4ba8e079313e0799f76ecf/src/classes/user.ts#L24)

___

### initialized

• **initialized**: `boolean` = `false`

#### Defined in

[src/classes/user.ts:23](https://github.com/torque-labs/torque-ts-sdk/blob/f017e3d354c17063da4ba8e079313e0799f76ecf/src/classes/user.ts#L23)

___

### publisherHandle

• **publisherHandle**: `undefined` \| `string`

#### Defined in

[src/classes/user.ts:22](https://github.com/torque-labs/torque-ts-sdk/blob/f017e3d354c17063da4ba8e079313e0799f76ecf/src/classes/user.ts#L22)

___

### user

• `Private` **user**: `undefined` \| [`ApiVerifiedUser`](../modules.md#apiverifieduser)

#### Defined in

[src/classes/user.ts:25](https://github.com/torque-labs/torque-ts-sdk/blob/f017e3d354c17063da4ba8e079313e0799f76ecf/src/classes/user.ts#L25)

## Methods

### getAllUserShareLinks

▸ **getAllUserShareLinks**(): `Promise`\<\{ `links`: \{ `campaignId`: `string` ; `url`: `string`  }[]  }\>

Fetches all of the user's share links that they have previously created.

#### Returns

`Promise`\<\{ `links`: \{ `campaignId`: `string` ; `url`: `string`  }[]  }\>

A Promise resolving to the URLs of the user's share links.

**`Throws`**

An error if the link fetch fails.

#### Defined in

[src/classes/user.ts:255](https://github.com/torque-labs/torque-ts-sdk/blob/f017e3d354c17063da4ba8e079313e0799f76ecf/src/classes/user.ts#L255)

___

### getCampaigns

▸ **getCampaigns**(): `Promise`\<\{ `campaigns`: [`ApiCampaign`](../modules.md#apicampaign)[]  }\>

Retrieves a list of active campaigns from the Torque API that the user is eligible to participate in.

#### Returns

`Promise`\<\{ `campaigns`: [`ApiCampaign`](../modules.md#apicampaign)[]  }\>

A Promise resolving to an array of `ApiCampaign` objects representing the active campaigns.

**`Throws`**

An error if the fetch operation fails, or if the API returns a status other than "SUCCESS".

#### Defined in

[src/classes/user.ts:180](https://github.com/torque-labs/torque-ts-sdk/blob/f017e3d354c17063da4ba8e079313e0799f76ecf/src/classes/user.ts#L180)

___

### getCurrentUser

▸ **getCurrentUser**(): `Promise`\<``false`` \| [`ApiVerifiedUser`](../modules.md#apiverifieduser)\>

Checks to see if the user is already logged into the Torque API.

#### Returns

`Promise`\<``false`` \| [`ApiVerifiedUser`](../modules.md#apiverifieduser)\>

A promise that resolves to the user if they are signed in, otherwise false.

**`Throws`**

Throws an error if checking the user's login status fails.

#### Defined in

[src/classes/user.ts:115](https://github.com/torque-labs/torque-ts-sdk/blob/f017e3d354c17063da4ba8e079313e0799f76ecf/src/classes/user.ts#L115)

___

### getSharedLinkData

▸ **getSharedLinkData**(`campaignId`, `handle`): `Promise`\<[`ApiShare`](../modules.md#apishare)\>

Retrieves the data for an offer link for a specific campaign and handle.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `campaignId` | `string` | The unique identifier for the campaign. |
| `handle` | `string` | The specific handle associated with the shared link. |

#### Returns

`Promise`\<[`ApiShare`](../modules.md#apishare)\>

The data associated with the shared link if the request is successful.

**`Throws`**

Throws an error there was an error getting the shared link data.

#### Defined in

[src/classes/user.ts:294](https://github.com/torque-labs/torque-ts-sdk/blob/f017e3d354c17063da4ba8e079313e0799f76ecf/src/classes/user.ts#L294)

___

### getUserHandle

▸ **getUserHandle**(): `undefined` \| ``null`` \| `string`

Retrieves the user's handle.

#### Returns

`undefined` \| ``null`` \| `string`

The user's handle or `undefined` if no handle is available.

#### Defined in

[src/classes/user.ts:153](https://github.com/torque-labs/torque-ts-sdk/blob/f017e3d354c17063da4ba8e079313e0799f76ecf/src/classes/user.ts#L153)

___

### getUserShareLink

▸ **getUserShareLink**(`campaignId`): `string`

Generates a URL for a user's shared link for a specific campaign.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `campaignId` | `string` | The unique identifier for the campaign. |

#### Returns

`string`

A promise that resolves to the URL string of the user's shared link for the campaign.

**`Throws`**

Throws an error if the user is not a publisher or does not have a handle.

#### Defined in

[src/classes/user.ts:237](https://github.com/torque-labs/torque-ts-sdk/blob/f017e3d354c17063da4ba8e079313e0799f76ecf/src/classes/user.ts#L237)

___

### initializeUser

▸ **initializeUser**(`userAuth`): `Promise`\<[`ApiVerifiedUser`](../modules.md#apiverifieduser)\>

Initializes the TorqueUserClient with the provided options.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `userAuth` | [`ApiInputLogin`](../modules.md#apiinputlogin) | User signature object that is required to authenticate a user with Torque. |

#### Returns

`Promise`\<[`ApiVerifiedUser`](../modules.md#apiverifieduser)\>

A Promise that resolves when the initialization is complete.

**`Throws`**

If user was not verified.

#### Defined in

[src/classes/user.ts:55](https://github.com/torque-labs/torque-ts-sdk/blob/f017e3d354c17063da4ba8e079313e0799f76ecf/src/classes/user.ts#L55)

___

### isPublisher

▸ **isPublisher**(): `boolean`

Checks to see if the user is a publisher.

#### Returns

`boolean`

True if the user is a publisher, false otherwise.

**`Throws`**

Throws an error if the user is not signed in.

#### Defined in

[src/classes/user.ts:220](https://github.com/torque-labs/torque-ts-sdk/blob/f017e3d354c17063da4ba8e079313e0799f76ecf/src/classes/user.ts#L220)

___

### login

▸ **login**(`loginOptions`): `Promise`\<[`ApiVerifiedUser`](../modules.md#apiverifieduser)\>

Authenticate the user with the torque API with the provided user signature object.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `loginOptions` | [`ApiInputLogin`](../modules.md#apiinputlogin) | The verification object that is required to authenticate a user with Torque. |

#### Returns

`Promise`\<[`ApiVerifiedUser`](../modules.md#apiverifieduser)\>

A Promise that resolves to an object containing the user information.

**`Throws`**

Throws an error if there is an error authenticating the user.

#### Defined in

[src/classes/user.ts:79](https://github.com/torque-labs/torque-ts-sdk/blob/f017e3d354c17063da4ba8e079313e0799f76ecf/src/classes/user.ts#L79)
