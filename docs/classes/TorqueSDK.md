[torque-ts-sdk](../README.md) / [Exports](../modules.md) / TorqueSDK

# Class: TorqueSDK

The official Torque Typescript SDK.

The TorqueSDK class is used to manage the user and api clients for the Torque API.

**`Example`**

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

## Table of contents

### Constructors

- [constructor](TorqueSDK.md#constructor)

### Properties

- [api](TorqueSDK.md#api)
- [user](TorqueSDK.md#user)

## Constructors

### constructor

• **new TorqueSDK**(`options`): [`TorqueSDK`](TorqueSDK.md)

Initializes the TorqueSDK with the provided options.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `options` | [`TorqueSDKOptions`](../modules.md#torquesdkoptions) | The options for the TorqueSDK. |

#### Returns

[`TorqueSDK`](TorqueSDK.md)

#### Defined in

[src/classes/sdk.ts:41](https://github.com/torque-labs/torque-ts-sdk/blob/f017e3d354c17063da4ba8e079313e0799f76ecf/src/classes/sdk.ts#L41)

## Properties

### api

• **api**: `undefined` \| [`TorqueAdminClient`](TorqueAdminClient.md)

#### Defined in

[src/classes/sdk.ts:34](https://github.com/torque-labs/torque-ts-sdk/blob/f017e3d354c17063da4ba8e079313e0799f76ecf/src/classes/sdk.ts#L34)

___

### user

• **user**: `undefined` \| [`TorqueUserClient`](TorqueUserClient.md)

#### Defined in

[src/classes/sdk.ts:33](https://github.com/torque-labs/torque-ts-sdk/blob/f017e3d354c17063da4ba8e079313e0799f76ecf/src/classes/sdk.ts#L33)
