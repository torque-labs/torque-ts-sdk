# Class: TorqueAdminClient

The TorqueAdminClient class is used to manage admin actions in the Torque API.

## Example

```ts
const client = new TorqueAdminClient(TorqueAdminClientOptions);

const result = await client.createCampaign(<campaignData>);
const result = await client.endCampaign(<campaignData>);
```

## Constructors

### new TorqueAdminClient()

```ts
new TorqueAdminClient(options): TorqueAdminClient
```

Create a new instance of the TorqueAdminClient class with the provided API key.

#### Parameters

| Parameter | Type | Description |
| :------ | :------ | :------ |
| `options` | [`TorqueAdminClientOptions`](../type-aliases/TorqueAdminClientOptions.md) | The options for the TorqueAdminClient. |

#### Returns

[`TorqueAdminClient`](TorqueAdminClient.md)

#### Source

[src/classes/admin.ts:43](https://github.com/torque-labs/torque-ts-sdk/blob/e7e20c5519300f3127faf1f4bde402ef91d14a40/src/classes/admin.ts#L43)

## Properties

| Property | Modifier | Type |
| :------ | :------ | :------ |
| `client` | `private` | [`TorqueRequestClient`](TorqueRequestClient.md) |
| `userClient` | `private` | [`TorqueUserClient`](TorqueUserClient.md) |

## Methods

### createCampaign()

```ts
createCampaign(data): Promise<{
  signature: string;
 } & Omit<{
  serializedTx: string;
}, "serializedTx">>
```

Create a new campaign with the provided data.

#### Parameters

| Parameter | Type | Description |
| :------ | :------ | :------ |
| `data` | `object` | The data for the campaign to create. |
| `data.audience`? | `null` \| `string` | - |
| `data.campaignName` | `string` | - |
| `data.campaignType` | `string` | - |
| `data.conversionCount`? | `null` \| `number` | - |
| `data.endTime` | `number` | - |
| `data.eventProgramAddress`? | `string` | - |
| `data.eventTokenAddress`? | `string` | - |
| `data.eventType` | [`ApiEventType`](../enumerations/ApiEventType.md) | - |
| `data.landingPage` | `string` | - |
| `data.minAmount`? | `null` \| `number` | - |
| `data.proposal`? | `null` \| `string` | - |
| `data.publisherPayoutPerConversion` | `number` | - |
| `data.publisherRewardType` | [`ApiRewardType`](../enumerations/ApiRewardType.md) | - |
| `data.publisherTokenAddress`? | `string` | - |
| `data.startTime` | `number` | - |
| `data.userPayoutPerConversion`? | `number` | - |
| `data.userRewardType`? | `POINTS` \| `TOKENS` | - |
| `data.userTokenAddress`? | `string` | - |

#### Returns

`Promise`\<\{
  `signature`: `string`;
 \} & `Omit`\<\{
  `serializedTx`: `string`;
 \}, `"serializedTx"`\>\>

A promise that resolves to the signature of the transaction.

#### Source

[src/classes/admin.ts:93](https://github.com/torque-labs/torque-ts-sdk/blob/e7e20c5519300f3127faf1f4bde402ef91d14a40/src/classes/admin.ts#L93)

***

### endCampaign()

```ts
endCampaign(data): Promise<{
  signature: string;
 } & Omit<{
  serializedTx: string;
}, "serializedTx">>
```

End a campaign using the provided campaign ID.

#### Parameters

| Parameter | Type | Description |
| :------ | :------ | :------ |
| `data` | `object` | The ID of the campaign to end. |
| `data.campaignId` | `string` | - |

#### Returns

`Promise`\<\{
  `signature`: `string`;
 \} & `Omit`\<\{
  `serializedTx`: `string`;
 \}, `"serializedTx"`\>\>

A promise that resolves to the signature of the transaction.

#### Throws

Throws an error if the client is not initialized or if there is an error ending the campaign.

#### Source

[src/classes/admin.ts:122](https://github.com/torque-labs/torque-ts-sdk/blob/e7e20c5519300f3127faf1f4bde402ef91d14a40/src/classes/admin.ts#L122)

***

### getCampaigns()

```ts
getCampaigns(): Promise<{
  campaigns: ApiCampaign[];
}>
```

Get a list of all currently active campaigns.

#### Returns

`Promise`\<\{
  `campaigns`: [`ApiCampaign`](../type-aliases/ApiCampaign.md)[];
 \}\>

i

##### campaigns

```ts
campaigns: ApiCampaign[];
```

#### Source

[src/classes/admin.ts:61](https://github.com/torque-labs/torque-ts-sdk/blob/e7e20c5519300f3127faf1f4bde402ef91d14a40/src/classes/admin.ts#L61)

***

### getLeaderboard()

```ts
getLeaderboard(campaignId): Promise<ApiCampaignLeaderboard>
```

Get the leaderboard for a specific campaign.

#### Parameters

| Parameter | Type | Description |
| :------ | :------ | :------ |
| `campaignId` | `string` | The ID of the campaign to get the leaderboard for. |

#### Returns

`Promise` \<[`ApiCampaignLeaderboard`](../type-aliases/ApiCampaignLeaderboard.md)\>

A Promise that resolves to the leaderboard data for the campaign.

#### Throws

Throws an error if the client is not initialized or if there is an error getting the leaderboard.

#### Source

[src/classes/admin.ts:151](https://github.com/torque-labs/torque-ts-sdk/blob/e7e20c5519300f3127faf1f4bde402ef91d14a40/src/classes/admin.ts#L151)

***

### initPublisher()

```ts
initPublisher(): Promise<string>
```

Initialize a publisher account for the current user.

#### Returns

`Promise`\<`string`\>

A promise that resolves to the signature of the transaction.

#### Throws

Throws an error if there was an error creating the publisher.

#### Source

[src/classes/admin.ts:217](https://github.com/torque-labs/torque-ts-sdk/blob/e7e20c5519300f3127faf1f4bde402ef91d14a40/src/classes/admin.ts#L217)

***

### payoutPublisher()

```ts
payoutPublisher(data): Promise<string>
```

Process a publisher payout for the current user, if eligible.

#### Parameters

| Parameter | Type |
| :------ | :------ |
| `data` | `object` |
| `data.amount` | `number` |
| `data.token` | `string` |

#### Returns

`Promise`\<`string`\>

A promise that resolves to the signature of the transaction.

#### Throws

Throws an error if there was an error paying out the publisher.

#### Source

[src/classes/admin.ts:245](https://github.com/torque-labs/torque-ts-sdk/blob/e7e20c5519300f3127faf1f4bde402ef91d14a40/src/classes/admin.ts#L245)

***

### raffleRewards()

```ts
raffleRewards(campaignId): Promise<ApiRaffleRewards>
```

Get the raffle rewards for a specific campaign.

#### Parameters

| Parameter | Type | Description |
| :------ | :------ | :------ |
| `campaignId` | `string` | The ID of the campaign to get the raffle rewards for. |

#### Returns

`Promise` \<[`ApiRaffleRewards`](../type-aliases/ApiRaffleRewards.md)\>

#### Throws

Throws an error if the client is not initialized or if there is an error getting the raffle rewards.

#### Source

[src/classes/admin.ts:181](https://github.com/torque-labs/torque-ts-sdk/blob/e7e20c5519300f3127faf1f4bde402ef91d14a40/src/classes/admin.ts#L181)
