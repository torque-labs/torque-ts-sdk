# Class: TorqueSDK

The official Torque Typescript SDK.

The TorqueSDK class is used to manage the user and api clients for the Torque API.

## Example

```ts
const sdk = new TorqueSDK({
  signer: <wallet adapter or keypair>,
  apiKey: "<your-api-key>",
  publisherHandle: "<your-publisher-handle>",
});

// See if user is already logged in
const currentUser = await sdk.user.getCurrentUser();

// Authenticate the user if not logged in
const user = currentUser
  ? currentUser
  : await sdk.user.initializeUser(ApiInputLogin);
```

## Constructors

### new TorqueSDK()

```ts
new TorqueSDK(options): TorqueSDK
```

Initializes the TorqueSDK with the provided options.

#### Parameters

| Parameter | Type | Description |
| :------ | :------ | :------ |
| `options` | [`TorqueSDKOptions`](../type-aliases/TorqueSDKOptions.md) | The options for the TorqueSDK. |

#### Returns

[`TorqueSDK`](TorqueSDK.md)

#### Throws

Throws an error if the there is no api key or publisher handle provided.

#### Source

[src/classes/sdk.ts:52](https://github.com/torque-labs/torque-ts-sdk/blob/e7e20c5519300f3127faf1f4bde402ef91d14a40/src/classes/sdk.ts#L52)

## Properties

| Property | Modifier | Type |
| :------ | :------ | :------ |
| `api` | `public` | `undefined` \| [`TorqueAdminClient`](TorqueAdminClient.md) |
| `audience` | `public` | `undefined` \| [`TorqueAudienceClient`](TorqueAudienceClient.md) |
| `user` | `public` | [`TorqueUserClient`](TorqueUserClient.md) |

## Methods

### verifyLogin()

```ts
static verifyLogin(loginOptions): Promise<ApiVerifiedUser>
```

Static method to verify the login options with the Torque API.

#### Parameters

| Parameter | Type | Description |
| :------ | :------ | :------ |
| `loginOptions` | [`ApiInputLogin`](../type-aliases/ApiInputLogin.md) | The verification object that is required to authenticate a user with Torque. |

#### Returns

`Promise` \<[`ApiVerifiedUser`](../type-aliases/ApiVerifiedUser.md)\>

A Promise that resolves to an object containing the user information.

#### Throws

Throws an error if there is an error authenticating the user.

#### Source

[src/classes/sdk.ts:89](https://github.com/torque-labs/torque-ts-sdk/blob/e7e20c5519300f3127faf1f4bde402ef91d14a40/src/classes/sdk.ts#L89)
