---
sidebar_label: TypeScript
sidebar_position: 1
---

# Torque TypeScript SDK

## Table of contents

### Enumerations

- [ApiEventType](enums/ApiEventType.md)
- [ApiRewardType](enums/ApiRewardType.md)
- [ApiStatus](enums/ApiStatus.md)
- [ApiTxnTypes](enums/ApiTxnTypes.md)

### Classes

- [TorqueAdminClient](classes/TorqueAdminClient.md)
- [TorqueRequestClient](classes/TorqueRequestClient.md)
- [TorqueSDK](classes/TorqueSDK.md)
- [TorqueUserClient](classes/TorqueUserClient.md)

### Type Aliases

- [ApiAudience](modules.md#apiaudience)
- [ApiCampaign](modules.md#apicampaign)
- [ApiIdentifyPayload](modules.md#apiidentifypayload)
- [ApiInputLogin](modules.md#apiinputlogin)
- [ApiLinks](modules.md#apilinks)
- [ApiResponse](modules.md#apiresponse)
- [ApiResponseError](modules.md#apiresponseerror)
- [ApiResponseSuccess](modules.md#apiresponsesuccess)
- [ApiShare](modules.md#apishare)
- [ApiUser](modules.md#apiuser)
- [ApiVerifiedUser](modules.md#apiverifieduser)
- [CampaignCreateInput](modules.md#campaigncreateinput)
- [CampaignEndInput](modules.md#campaignendinput)
- [PublisherCreateInput](modules.md#publishercreateinput)
- [PublisherPayoutInput](modules.md#publisherpayoutinput)
- [TorqueSDKOptions](modules.md#torquesdkoptions)
- [TxnExecute](modules.md#txnexecute)
- [TxnExecuteResponse](modules.md#txnexecuteresponse)
- [TxnInput](modules.md#txninput)

### Variables

- [AdminTransactionTypes](modules.md#admintransactiontypes)
- [TransactionType](modules.md#transactiontype)
- [UserTransactionTypes](modules.md#usertransactiontypes)

### Functions

- [base64ToUint8Array](modules.md#base64touint8array)
- [uint8ArrayToBase64](modules.md#uint8arraytobase64)

## Type Aliases

### ApiAudience

Ƭ **ApiAudience**: `Object`

#### Type declaration

| Name           | Type     |
| :------------- | :------- |
| `description?` | `string` |
| `id`           | `string` |
| `imageUrl?`    | `string` |
| `title`        | `string` |

#### Defined in

[src/types/api.ts:83](https://github.com/torque-labs/torque-ts-sdk/blob/f017e3d354c17063da4ba8e079313e0799f76ecf/src/types/api.ts#L83)

---

### ApiCampaign

Ƭ **ApiCampaign**: `Object`

#### Type declaration

| Name                     | Type                                      |
| :----------------------- | :---------------------------------------- |
| `advertiserPubKey`       | `string`                                  |
| `audiences`              | \{ `id`: `string` ; `title`: `string` }[] |
| `description?`           | `string`                                  |
| `endTime`                | `Date`                                    |
| `id`                     | `string`                                  |
| `imageUrl?`              | `string`                                  |
| `offerLink?`             | `string`                                  |
| `pubKey`                 | `string`                                  |
| `publisherRewardAmount?` | `any`                                     |
| `publisherRewardToken?`  | `string`                                  |
| `publisherRewardType?`   | `string`                                  |
| `remainingConversions`   | `number`                                  |
| `startTime`              | `Date`                                    |
| `status`                 | `string`                                  |
| `targetLink?`            | `string`                                  |
| `title`                  | `string`                                  |
| `totalConversions`       | `number`                                  |
| `type`                   | `string`                                  |
| `userRewardAmount?`      | `any`                                     |
| `userRewardToken?`       | `string`                                  |

#### Defined in

[src/types/api.ts:57](https://github.com/torque-labs/torque-ts-sdk/blob/f017e3d354c17063da4ba8e079313e0799f76ecf/src/types/api.ts#L57)

---

### ApiIdentifyPayload

Ƭ **ApiIdentifyPayload**: `Object`

#### Type declaration

| Name                     | Type                                                                           |
| :----------------------- | :----------------------------------------------------------------------------- |
| `payload`                | \{ `expirationTime`: `string` ; `issuedAt`: `string` ; `statement`: `string` } |
| `payload.expirationTime` | `string`                                                                       |
| `payload.issuedAt`       | `string`                                                                       |
| `payload.statement`      | `string`                                                                       |

#### Defined in

[src/types/api.ts:124](https://github.com/torque-labs/torque-ts-sdk/blob/f017e3d354c17063da4ba8e079313e0799f76ecf/src/types/api.ts#L124)

---

### ApiInputLogin

Ƭ **ApiInputLogin**: \{ `authType`: `"siws"` ; `payload`: \{ `input`: `SolanaSignInInput` ; `output`: `SolanaSignInOutput` } ; `pubKey`: `string` } \| \{ `authType`: `"basic"` ; `payload`: \{ `input`: `string` ; `output`: `string` } ; `pubKey`: `string` }

#### Defined in

[src/types/api.ts:42](https://github.com/torque-labs/torque-ts-sdk/blob/f017e3d354c17063da4ba8e079313e0799f76ecf/src/types/api.ts#L42)

---

### ApiLinks

Ƭ **ApiLinks**: `Object`

#### Type declaration

| Name    | Type                                            |
| :------ | :---------------------------------------------- |
| `links` | \{ `campaignId`: `string` ; `url`: `string` }[] |

#### Defined in

[src/types/api.ts:132](https://github.com/torque-labs/torque-ts-sdk/blob/f017e3d354c17063da4ba8e079313e0799f76ecf/src/types/api.ts#L132)

---

### ApiResponse

Ƭ **ApiResponse**\<`T`\>: [`ApiResponseSuccess`](modules.md#apiresponsesuccess)\<`T`\> \| [`ApiResponseError`](modules.md#apiresponseerror)

#### Type parameters

| Name |
| :--- |
| `T`  |

#### Defined in

[src/types/api.ts:40](https://github.com/torque-labs/torque-ts-sdk/blob/f017e3d354c17063da4ba8e079313e0799f76ecf/src/types/api.ts#L40)

---

### ApiResponseError

Ƭ **ApiResponseError**: `Object`

#### Type declaration

| Name      | Type                                                                                    |
| :-------- | :-------------------------------------------------------------------------------------- |
| `message` | `string`                                                                                |
| `status`  | `Exclude`\<[`ApiStatus`](enums/ApiStatus.md), [`SUCCESS`](enums/ApiStatus.md#success)\> |

#### Defined in

[src/types/api.ts:35](https://github.com/torque-labs/torque-ts-sdk/blob/f017e3d354c17063da4ba8e079313e0799f76ecf/src/types/api.ts#L35)

---

### ApiResponseSuccess

Ƭ **ApiResponseSuccess**\<`T`\>: `Object`

#### Type parameters

| Name |
| :--- |
| `T`  |

#### Type declaration

| Name     | Type                                    |
| :------- | :-------------------------------------- |
| `data`   | `T`                                     |
| `status` | [`SUCCESS`](enums/ApiStatus.md#success) |

#### Defined in

[src/types/api.ts:30](https://github.com/torque-labs/torque-ts-sdk/blob/f017e3d354c17063da4ba8e079313e0799f76ecf/src/types/api.ts#L30)

---

### ApiShare

Ƭ **ApiShare**: `Object`

#### Type declaration

| Name                                | Type                                                                                                                                                                                                                                                      |
| :---------------------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `campaign`                          | \{ `advertiser`: \{ `profileImage?`: `string` \| `null` ; `twitter?`: `string` \| `null` ; `username`: `string` \| `null` } ; `endTime`: `Date` ; `id`: `string` ; `startTime`: `Date` ; `targetLink?`: `string` ; `title`: `string` ; `type`: `string` } |
| `campaign.advertiser`               | \{ `profileImage?`: `string` \| `null` ; `twitter?`: `string` \| `null` ; `username`: `string` \| `null` }                                                                                                                                                |
| `campaign.advertiser.profileImage?` | `string` \| `null`                                                                                                                                                                                                                                        |
| `campaign.advertiser.twitter?`      | `string` \| `null`                                                                                                                                                                                                                                        |
| `campaign.advertiser.username`      | `string` \| `null`                                                                                                                                                                                                                                        |
| `campaign.endTime`                  | `Date`                                                                                                                                                                                                                                                    |
| `campaign.id`                       | `string`                                                                                                                                                                                                                                                  |
| `campaign.startTime`                | `Date`                                                                                                                                                                                                                                                    |
| `campaign.targetLink?`              | `string`                                                                                                                                                                                                                                                  |
| `campaign.title`                    | `string`                                                                                                                                                                                                                                                  |
| `campaign.type`                     | `string`                                                                                                                                                                                                                                                  |
| `publisher`                         | \{ `profileImage?`: `string` \| `null` ; `twitter?`: `string` \| `null` ; `username`: `string` \| `null` }                                                                                                                                                |
| `publisher.profileImage?`           | `string` \| `null`                                                                                                                                                                                                                                        |
| `publisher.twitter?`                | `string` \| `null`                                                                                                                                                                                                                                        |
| `publisher.username`                | `string` \| `null`                                                                                                                                                                                                                                        |

#### Defined in

[src/types/api.ts:90](https://github.com/torque-labs/torque-ts-sdk/blob/f017e3d354c17063da4ba8e079313e0799f76ecf/src/types/api.ts#L90)

---

### ApiUser

Ƭ **ApiUser**: `Object`

#### Type declaration

| Name               | Type               |
| :----------------- | :----------------- |
| `isPublisher`      | `boolean`          |
| `profileImage?`    | `string`           |
| `pubKey`           | `string`           |
| `publisherPubKey?` | `string` \| `null` |
| `twitter?`         | `string`           |
| `username?`        | `string`           |

#### Defined in

[src/types/api.ts:111](https://github.com/torque-labs/torque-ts-sdk/blob/f017e3d354c17063da4ba8e079313e0799f76ecf/src/types/api.ts#L111)

---

### ApiVerifiedUser

Ƭ **ApiVerifiedUser**: [`ApiUser`](modules.md#apiuser) & \{ `verified`: `boolean` }

#### Defined in

[src/types/api.ts:120](https://github.com/torque-labs/torque-ts-sdk/blob/f017e3d354c17063da4ba8e079313e0799f76ecf/src/types/api.ts#L120)

---

### CampaignCreateInput

Ƭ **CampaignCreateInput**: `z.infer`\<typeof `CampaignCreateInputSchema`\>

#### Defined in

[src/types/transactions.ts:13](https://github.com/torque-labs/torque-ts-sdk/blob/f017e3d354c17063da4ba8e079313e0799f76ecf/src/types/transactions.ts#L13)

---

### CampaignEndInput

Ƭ **CampaignEndInput**: `z.infer`\<typeof `CampaignEndInputSchema`\>

#### Defined in

[src/types/transactions.ts:14](https://github.com/torque-labs/torque-ts-sdk/blob/f017e3d354c17063da4ba8e079313e0799f76ecf/src/types/transactions.ts#L14)

---

### PublisherCreateInput

Ƭ **PublisherCreateInput**: `z.infer`\<typeof `PublisherCreateInputSchema`\>

#### Defined in

[src/types/transactions.ts:16](https://github.com/torque-labs/torque-ts-sdk/blob/f017e3d354c17063da4ba8e079313e0799f76ecf/src/types/transactions.ts#L16)

---

### PublisherPayoutInput

Ƭ **PublisherPayoutInput**: `z.infer`\<typeof `PublisherPayoutInputSchema`\>

#### Defined in

[src/types/transactions.ts:15](https://github.com/torque-labs/torque-ts-sdk/blob/f017e3d354c17063da4ba8e079313e0799f76ecf/src/types/transactions.ts#L15)

---

### TorqueSDKOptions

Ƭ **TorqueSDKOptions**: `Object`

#### Type declaration

| Name               | Type                               |
| :----------------- | :--------------------------------- |
| `apiKey?`          | `string`                           |
| `publisherHandle?` | `string`                           |
| `signer`           | `SignerWalletAdapter` \| `Keypair` |

#### Defined in

[src/classes/sdk.ts:6](https://github.com/torque-labs/torque-ts-sdk/blob/f017e3d354c17063da4ba8e079313e0799f76ecf/src/classes/sdk.ts#L6)

---

### TxnExecute

Ƭ **TxnExecute**: `z.infer`\<typeof `TxnExecuteSchema`\>

#### Defined in

[src/types/transactions.ts:18](https://github.com/torque-labs/torque-ts-sdk/blob/f017e3d354c17063da4ba8e079313e0799f76ecf/src/types/transactions.ts#L18)

---

### TxnExecuteResponse

Ƭ **TxnExecuteResponse**: `Object`

#### Type declaration

| Name        | Type     |
| :---------- | :------- |
| `signature` | `string` |

#### Defined in

[src/types/transactions.ts:19](https://github.com/torque-labs/torque-ts-sdk/blob/f017e3d354c17063da4ba8e079313e0799f76ecf/src/types/transactions.ts#L19)

---

### TxnInput

Ƭ **TxnInput**: `z.infer`\<typeof `TxnInputSchema`\>

#### Defined in

[src/types/transactions.ts:17](https://github.com/torque-labs/torque-ts-sdk/blob/f017e3d354c17063da4ba8e079313e0799f76ecf/src/types/transactions.ts#L17)

## Variables

### AdminTransactionTypes

• `Const` **AdminTransactionTypes**: [`ApiTxnTypes`](enums/ApiTxnTypes.md)[]

#### Defined in

[src/types/api.ts:151](https://github.com/torque-labs/torque-ts-sdk/blob/f017e3d354c17063da4ba8e079313e0799f76ecf/src/types/api.ts#L151)

---

### TransactionType

• `Const` **TransactionType**: [`ApiTxnTypes`](enums/ApiTxnTypes.md)[]

#### Defined in

[src/types/api.ts:156](https://github.com/torque-labs/torque-ts-sdk/blob/f017e3d354c17063da4ba8e079313e0799f76ecf/src/types/api.ts#L156)

---

### UserTransactionTypes

• `Const` **UserTransactionTypes**: [`ApiTxnTypes`](enums/ApiTxnTypes.md)[]

#### Defined in

[src/types/api.ts:146](https://github.com/torque-labs/torque-ts-sdk/blob/f017e3d354c17063da4ba8e079313e0799f76ecf/src/types/api.ts#L146)

## Functions

### base64ToUint8Array

▸ **base64ToUint8Array**(`base64`): `Uint8Array`

Converts a Base64-encoded string to a Uint8Array.

#### Parameters

| Name     | Type     | Description                                                |
| :------- | :------- | :--------------------------------------------------------- |
| `base64` | `string` | The Base64-encoded string to be converted to a Uint8Array. |

#### Returns

`Uint8Array`

The Uint8Array representation of the input Base64 string.

#### Defined in

[src/utils.ts:8](https://github.com/torque-labs/torque-ts-sdk/blob/f017e3d354c17063da4ba8e079313e0799f76ecf/src/utils.ts#L8)

---

### uint8ArrayToBase64

▸ **uint8ArrayToBase64**(`bytes`): `string`

Converts a Uint8Array to a Base64-encoded string.

#### Parameters

| Name    | Type         | Description                                                |
| :------ | :----------- | :--------------------------------------------------------- |
| `bytes` | `Uint8Array` | The Uint8Array to be converted to a Base64-encoded string. |

#### Returns

`string`

The Base64-encoded string representation of the input Uint8Array.

#### Defined in

[src/utils.ts:25](https://github.com/torque-labs/torque-ts-sdk/blob/f017e3d354c17063da4ba8e079313e0799f76ecf/src/utils.ts#L25)
