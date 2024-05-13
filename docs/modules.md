[torque-ts-sdk](README.md) / Exports

# torque-ts-sdk

## Table of contents

### Enumerations

- [ApiStatus](enums/ApiStatus.md)

### Classes

- [TorqueClient](classes/TorqueClient.md)

### Type Aliases

- [ApiAudience](modules.md#apiaudience)
- [ApiCampaign](modules.md#apicampaign)
- [ApiIdentifyPayload](modules.md#apiidentifypayload)
- [ApiInputVerify](modules.md#apiinputverify)
- [ApiLinks](modules.md#apilinks)
- [ApiResponse](modules.md#apiresponse)
- [ApiResponseError](modules.md#apiresponseerror)
- [ApiResponseSuccess](modules.md#apiresponsesuccess)
- [ApiShare](modules.md#apishare)
- [ApiUser](modules.md#apiuser)
- [ApiVerifiedUser](modules.md#apiverifieduser)

## Type Aliases

### ApiAudience

Ƭ **ApiAudience**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `description?` | `string` |
| `id` | `string` |
| `imageUrl?` | `string` |
| `title` | `string` |

#### Defined in

[src/types.ts:68](https://github.com/torque-labs/torque-ts-sdk/blob/82c0f0054819300c00990cc3d24f1f60da91a74b/src/types.ts#L68)

___

### ApiCampaign

Ƭ **ApiCampaign**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `advertiserPubKey` | `string` |
| `audiences` | \{ `id`: `string` ; `title`: `string`  }[] |
| `description?` | `string` |
| `endTime` | `Date` |
| `id` | `string` |
| `imageUrl?` | `string` |
| `offerLink?` | `string` |
| `pubKey` | `string` |
| `publisherRewardAmount?` | `any` |
| `publisherRewardToken?` | `string` |
| `publisherRewardType?` | `string` |
| `remainingConversions` | `number` |
| `startTime` | `Date` |
| `status` | `string` |
| `targetLink?` | `string` |
| `title` | `string` |
| `totalConversions` | `number` |
| `type` | `string` |
| `userRewardAmount?` | `any` |
| `userRewardToken?` | `string` |

#### Defined in

[src/types.ts:42](https://github.com/torque-labs/torque-ts-sdk/blob/82c0f0054819300c00990cc3d24f1f60da91a74b/src/types.ts#L42)

___

### ApiIdentifyPayload

Ƭ **ApiIdentifyPayload**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `payload` | \{ `expirationTime`: `string` ; `issuedAt`: `string` ; `statement`: `string`  } |
| `payload.expirationTime` | `string` |
| `payload.issuedAt` | `string` |
| `payload.statement` | `string` |

#### Defined in

[src/types.ts:110](https://github.com/torque-labs/torque-ts-sdk/blob/82c0f0054819300c00990cc3d24f1f60da91a74b/src/types.ts#L110)

___

### ApiInputVerify

Ƭ **ApiInputVerify**: \{ `authType`: ``"siws"`` ; `payload`: \{ `input`: `SolanaSignInInput` ; `output`: `SolanaSignInOutput`  } ; `pubKey`: `string`  } \| \{ `authType`: ``"basic"`` ; `payload`: \{ `input`: `string` ; `output`: `string`  } ; `pubKey`: `string`  }

#### Defined in

[src/types.ts:27](https://github.com/torque-labs/torque-ts-sdk/blob/82c0f0054819300c00990cc3d24f1f60da91a74b/src/types.ts#L27)

___

### ApiLinks

Ƭ **ApiLinks**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `links` | \{ `campaignId`: `string` ; `url`: `string`  }[] |

#### Defined in

[src/types.ts:118](https://github.com/torque-labs/torque-ts-sdk/blob/82c0f0054819300c00990cc3d24f1f60da91a74b/src/types.ts#L118)

___

### ApiResponse

Ƭ **ApiResponse**\<`T`\>: [`ApiResponseSuccess`](modules.md#apiresponsesuccess)\<`T`\> \| [`ApiResponseError`](modules.md#apiresponseerror)

#### Type parameters

| Name |
| :------ |
| `T` |

#### Defined in

[src/types.ts:25](https://github.com/torque-labs/torque-ts-sdk/blob/82c0f0054819300c00990cc3d24f1f60da91a74b/src/types.ts#L25)

___

### ApiResponseError

Ƭ **ApiResponseError**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `message` | `string` |
| `status` | `Exclude`\<[`ApiStatus`](enums/ApiStatus.md), [`SUCCESS`](enums/ApiStatus.md#success)\> |

#### Defined in

[src/types.ts:20](https://github.com/torque-labs/torque-ts-sdk/blob/82c0f0054819300c00990cc3d24f1f60da91a74b/src/types.ts#L20)

___

### ApiResponseSuccess

Ƭ **ApiResponseSuccess**\<`T`\>: `Object`

#### Type parameters

| Name |
| :------ |
| `T` |

#### Type declaration

| Name | Type |
| :------ | :------ |
| `data` | `T` |
| `status` | [`SUCCESS`](enums/ApiStatus.md#success) |

#### Defined in

[src/types.ts:15](https://github.com/torque-labs/torque-ts-sdk/blob/82c0f0054819300c00990cc3d24f1f60da91a74b/src/types.ts#L15)

___

### ApiShare

Ƭ **ApiShare**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `campaign` | \{ `advertiser`: \{ `profileImage?`: `string` \| ``null`` ; `twitter?`: `string` \| ``null`` ; `username`: `string` \| ``null``  } ; `endTime`: `Date` ; `id`: `string` ; `startTime`: `Date` ; `targetLink?`: `string` ; `title`: `string` ; `type`: `string`  } |
| `campaign.advertiser` | \{ `profileImage?`: `string` \| ``null`` ; `twitter?`: `string` \| ``null`` ; `username`: `string` \| ``null``  } |
| `campaign.advertiser.profileImage?` | `string` \| ``null`` |
| `campaign.advertiser.twitter?` | `string` \| ``null`` |
| `campaign.advertiser.username` | `string` \| ``null`` |
| `campaign.endTime` | `Date` |
| `campaign.id` | `string` |
| `campaign.startTime` | `Date` |
| `campaign.targetLink?` | `string` |
| `campaign.title` | `string` |
| `campaign.type` | `string` |
| `publisher` | \{ `profileImage?`: `string` \| ``null`` ; `twitter?`: `string` \| ``null`` ; `username`: `string` \| ``null``  } |
| `publisher.profileImage?` | `string` \| ``null`` |
| `publisher.twitter?` | `string` \| ``null`` |
| `publisher.username` | `string` \| ``null`` |

#### Defined in

[src/types.ts:75](https://github.com/torque-labs/torque-ts-sdk/blob/82c0f0054819300c00990cc3d24f1f60da91a74b/src/types.ts#L75)

___

### ApiUser

Ƭ **ApiUser**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `isPublisher` | `boolean` |
| `profileImage?` | `string` |
| `pubKey` | `string` |
| `publisherPubKey?` | `string` \| ``null`` |
| `twitter?` | `string` |
| `username?` | `string` |

#### Defined in

[src/types.ts:96](https://github.com/torque-labs/torque-ts-sdk/blob/82c0f0054819300c00990cc3d24f1f60da91a74b/src/types.ts#L96)

___

### ApiVerifiedUser

Ƭ **ApiVerifiedUser**: [`ApiUser`](modules.md#apiuser) & \{ `token`: `string` ; `verified`: `boolean`  }

#### Defined in

[src/types.ts:105](https://github.com/torque-labs/torque-ts-sdk/blob/82c0f0054819300c00990cc3d24f1f60da91a74b/src/types.ts#L105)
