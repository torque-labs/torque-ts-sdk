[torque-ts-sdk](README.md) / Exports

# torque-ts-sdk

## Table of contents

### Enumerations

- [ApiEventType](enums/ApiEventType.md)
- [ApiRewardType](enums/ApiRewardType.md)
- [ApiStatus](enums/ApiStatus.md)
- [ApiTxnTypes](enums/ApiTxnTypes.md)

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
- [CampaignCreateInput](modules.md#campaigncreateinput)
- [CampaignEndInput](modules.md#campaignendinput)
- [PublisherCreateInput](modules.md#publishercreateinput)
- [PublisherPayoutInput](modules.md#publisherpayoutinput)
- [TxnExecute](modules.md#txnexecute)
- [TxnExecuteResponse](modules.md#txnexecuteresponse)
- [TxnInput](modules.md#txninput)

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

[src/types/api.ts:83](https://github.com/torque-labs/torque-ts-sdk/blob/1602bd47e891aa1e511323dd58a1c41afe6a5380/src/types/api.ts#L83)

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

[src/types/api.ts:57](https://github.com/torque-labs/torque-ts-sdk/blob/1602bd47e891aa1e511323dd58a1c41afe6a5380/src/types/api.ts#L57)

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

[src/types/api.ts:125](https://github.com/torque-labs/torque-ts-sdk/blob/1602bd47e891aa1e511323dd58a1c41afe6a5380/src/types/api.ts#L125)

___

### ApiInputVerify

Ƭ **ApiInputVerify**: \{ `authType`: ``"siws"`` ; `payload`: \{ `input`: `SolanaSignInInput` ; `output`: `SolanaSignInOutput`  } ; `pubKey`: `string`  } \| \{ `authType`: ``"basic"`` ; `payload`: \{ `input`: `string` ; `output`: `string`  } ; `pubKey`: `string`  }

#### Defined in

[src/types/api.ts:42](https://github.com/torque-labs/torque-ts-sdk/blob/1602bd47e891aa1e511323dd58a1c41afe6a5380/src/types/api.ts#L42)

___

### ApiLinks

Ƭ **ApiLinks**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `links` | \{ `campaignId`: `string` ; `url`: `string`  }[] |

#### Defined in

[src/types/api.ts:133](https://github.com/torque-labs/torque-ts-sdk/blob/1602bd47e891aa1e511323dd58a1c41afe6a5380/src/types/api.ts#L133)

___

### ApiResponse

Ƭ **ApiResponse**\<`T`\>: [`ApiResponseSuccess`](modules.md#apiresponsesuccess)\<`T`\> \| [`ApiResponseError`](modules.md#apiresponseerror)

#### Type parameters

| Name |
| :------ |
| `T` |

#### Defined in

[src/types/api.ts:40](https://github.com/torque-labs/torque-ts-sdk/blob/1602bd47e891aa1e511323dd58a1c41afe6a5380/src/types/api.ts#L40)

___

### ApiResponseError

Ƭ **ApiResponseError**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `message` | `string` |
| `status` | `Exclude`\<[`ApiStatus`](enums/ApiStatus.md), [`SUCCESS`](enums/ApiStatus.md#success)\> |

#### Defined in

[src/types/api.ts:35](https://github.com/torque-labs/torque-ts-sdk/blob/1602bd47e891aa1e511323dd58a1c41afe6a5380/src/types/api.ts#L35)

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

[src/types/api.ts:30](https://github.com/torque-labs/torque-ts-sdk/blob/1602bd47e891aa1e511323dd58a1c41afe6a5380/src/types/api.ts#L30)

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

[src/types/api.ts:90](https://github.com/torque-labs/torque-ts-sdk/blob/1602bd47e891aa1e511323dd58a1c41afe6a5380/src/types/api.ts#L90)

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

[src/types/api.ts:111](https://github.com/torque-labs/torque-ts-sdk/blob/1602bd47e891aa1e511323dd58a1c41afe6a5380/src/types/api.ts#L111)

___

### ApiVerifiedUser

Ƭ **ApiVerifiedUser**: [`ApiUser`](modules.md#apiuser) & \{ `token`: `string` ; `verified`: `boolean`  }

#### Defined in

[src/types/api.ts:120](https://github.com/torque-labs/torque-ts-sdk/blob/1602bd47e891aa1e511323dd58a1c41afe6a5380/src/types/api.ts#L120)

___

### CampaignCreateInput

Ƭ **CampaignCreateInput**: `z.infer`\<typeof `CampaignCreateInputSchema`\>

#### Defined in

[src/types/transactions.ts:13](https://github.com/torque-labs/torque-ts-sdk/blob/1602bd47e891aa1e511323dd58a1c41afe6a5380/src/types/transactions.ts#L13)

___

### CampaignEndInput

Ƭ **CampaignEndInput**: `z.infer`\<typeof `CampaignEndInputSchema`\>

#### Defined in

[src/types/transactions.ts:14](https://github.com/torque-labs/torque-ts-sdk/blob/1602bd47e891aa1e511323dd58a1c41afe6a5380/src/types/transactions.ts#L14)

___

### PublisherCreateInput

Ƭ **PublisherCreateInput**: `z.infer`\<typeof `PublisherCreateInputSchema`\>

#### Defined in

[src/types/transactions.ts:16](https://github.com/torque-labs/torque-ts-sdk/blob/1602bd47e891aa1e511323dd58a1c41afe6a5380/src/types/transactions.ts#L16)

___

### PublisherPayoutInput

Ƭ **PublisherPayoutInput**: `z.infer`\<typeof `PublisherPayoutInputSchema`\>

#### Defined in

[src/types/transactions.ts:15](https://github.com/torque-labs/torque-ts-sdk/blob/1602bd47e891aa1e511323dd58a1c41afe6a5380/src/types/transactions.ts#L15)

___

### TxnExecute

Ƭ **TxnExecute**: `z.infer`\<typeof `TxnExecuteSchema`\>

#### Defined in

[src/types/transactions.ts:18](https://github.com/torque-labs/torque-ts-sdk/blob/1602bd47e891aa1e511323dd58a1c41afe6a5380/src/types/transactions.ts#L18)

___

### TxnExecuteResponse

Ƭ **TxnExecuteResponse**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `signature` | `string` |

#### Defined in

[src/types/transactions.ts:19](https://github.com/torque-labs/torque-ts-sdk/blob/1602bd47e891aa1e511323dd58a1c41afe6a5380/src/types/transactions.ts#L19)

___

### TxnInput

Ƭ **TxnInput**: `z.infer`\<typeof `TxnInputSchema`\>

#### Defined in

[src/types/transactions.ts:17](https://github.com/torque-labs/torque-ts-sdk/blob/1602bd47e891aa1e511323dd58a1c41afe6a5380/src/types/transactions.ts#L17)
