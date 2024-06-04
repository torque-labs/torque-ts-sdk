[torque-ts-sdk](../README.md) / [Exports](../modules.md) / TorqueAdminClient

# Class: TorqueAdminClient

The TorqueAdminClient class is used to manage admin actions in the Torque API.

**`Example`**

```ts
const client = new TorqueAdminClient(<apiKey>);

const result = await client.createCampaign(<campaignData>);
const result = await client.endCampaign(<campaignData>);
```

## Table of contents

### Constructors

- [constructor](TorqueAdminClient.md#constructor)

### Properties

- [client](TorqueAdminClient.md#client)

### Methods

- [createCampaign](TorqueAdminClient.md#createcampaign)
- [endCampaign](TorqueAdminClient.md#endcampaign)
- [initPublisher](TorqueAdminClient.md#initpublisher)
- [payoutPublisher](TorqueAdminClient.md#payoutpublisher)

## Constructors

### constructor

• **new TorqueAdminClient**(`signer`, `apiKey`): [`TorqueAdminClient`](TorqueAdminClient.md)

Create a new instance of the TorqueAdminClient class with the provided API key.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `signer` | `SignerWalletAdapter` \| `Keypair` | The signer used to sign transactions. |
| `apiKey` | `string` | The API key for the admin client. |

#### Returns

[`TorqueAdminClient`](TorqueAdminClient.md)

#### Defined in

[src/classes/admin.ts:24](https://github.com/torque-labs/torque-ts-sdk/blob/f017e3d354c17063da4ba8e079313e0799f76ecf/src/classes/admin.ts#L24)

## Properties

### client

• `Private` **client**: `undefined` \| [`TorqueRequestClient`](TorqueRequestClient.md)

#### Defined in

[src/classes/admin.ts:16](https://github.com/torque-labs/torque-ts-sdk/blob/f017e3d354c17063da4ba8e079313e0799f76ecf/src/classes/admin.ts#L16)

## Methods

### createCampaign

▸ **createCampaign**(`data`): `Promise`\<\{ `signature`: `string`  } & `Omit`\<\{ `serializedTx`: `string`  }, ``"serializedTx"``\>\>

Create a new campaign with the provided data.

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | `Object` |
| `data.audience?` | ``null`` \| `string` |
| `data.campaignName` | `string` |
| `data.campaignType` | `string` |
| `data.conversionCount?` | ``null`` \| `number` |
| `data.endTime` | `number` |
| `data.eventProgramAddress?` | `string` |
| `data.eventTokenAddress?` | `string` |
| `data.eventType` | [`ApiEventType`](../enums/ApiEventType.md) |
| `data.landingPage` | `string` |
| `data.minAmount?` | ``null`` \| `number` |
| `data.proposal?` | ``null`` \| `string` |
| `data.publisherPayoutPerConversion` | `number` |
| `data.publisherRewardType` | [`ApiRewardType`](../enums/ApiRewardType.md) |
| `data.publisherTokenAddress?` | `string` |
| `data.startTime` | `number` |
| `data.userPayoutPerConversion?` | `number` |
| `data.userRewardType?` | [`POINTS`](../enums/ApiRewardType.md#points) \| [`TOKENS`](../enums/ApiRewardType.md#tokens) |
| `data.userTokenAddress?` | `string` |

#### Returns

`Promise`\<\{ `signature`: `string`  } & `Omit`\<\{ `serializedTx`: `string`  }, ``"serializedTx"``\>\>

#### Defined in

[src/classes/admin.ts:39](https://github.com/torque-labs/torque-ts-sdk/blob/f017e3d354c17063da4ba8e079313e0799f76ecf/src/classes/admin.ts#L39)

___

### endCampaign

▸ **endCampaign**(`data`): `Promise`\<\{ `signature`: `string`  } & `Omit`\<\{ `serializedTx`: `string`  }, ``"serializedTx"``\>\>

End a campaign using the provided campaign ID.

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | `Object` |
| `data.campaignId` | `string` |

#### Returns

`Promise`\<\{ `signature`: `string`  } & `Omit`\<\{ `serializedTx`: `string`  }, ``"serializedTx"``\>\>

**`Throws`**

Throws an error if the client is not initialized or if there is an error ending the campaign.

#### Defined in

[src/classes/admin.ts:66](https://github.com/torque-labs/torque-ts-sdk/blob/f017e3d354c17063da4ba8e079313e0799f76ecf/src/classes/admin.ts#L66)

___

### initPublisher

▸ **initPublisher**(): `Promise`\<`string`\>

Initialize a publisher account for the current user.

#### Returns

`Promise`\<`string`\>

A promise that resolves to the signature of the transaction.

**`Throws`**

Throws an error if there was an error creating the publisher.

#### Defined in

[src/classes/admin.ts:99](https://github.com/torque-labs/torque-ts-sdk/blob/f017e3d354c17063da4ba8e079313e0799f76ecf/src/classes/admin.ts#L99)

___

### payoutPublisher

▸ **payoutPublisher**(`data`): `Promise`\<`string`\>

Process a publisher payout fpr the current user, if eligible.

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | `Object` |
| `data.amount` | `number` |
| `data.token` | `string` |

#### Returns

`Promise`\<`string`\>

A promise that resolves to the signature of the transaction.

**`Throws`**

Throws an error if there was an error paying out the publisher.

#### Defined in

[src/classes/admin.ts:125](https://github.com/torque-labs/torque-ts-sdk/blob/f017e3d354c17063da4ba8e079313e0799f76ecf/src/classes/admin.ts#L125)
