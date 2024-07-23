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

[src/classes/admin.ts:84](https://github.com/torque-labs/torque-ts-sdk/blob/06c96b69b43209c72870e94ce49516c9ed8e9158/src/classes/admin.ts#L84)

## Properties

| Property | Modifier | Type |
| :------ | :------ | :------ |
| `client` | `private` | [`TorqueRequestClient`](TorqueRequestClient.md) |
| `connection` | `private` | `Connection` |
| `userClient` | `private` | `undefined` \| [`TorqueUserClient`](TorqueUserClient.md) |
| `tokenList` | `static` | `undefined` \| [`SafeToken`](../type-aliases/SafeToken.md)[] |

## Methods

### createCampaign()

```ts
createCampaign(data): Promise<SignatureField>
```

Create a new campaign with the provided data.

#### Parameters

| Parameter | Type | Description |
| :------ | :------ | :------ |
| `data` | `object` | The data for the campaign to create. |
| `data.asymmetricRewards`? | `null` \| \{ `amount`: `number`; `tokenAddress`: `string`; \}[] | - |
| `data.audience`? | `null` \| `string` | - |
| `data.campaignName` | `string` | - |
| `data.campaignType` | `string` | - |
| `data.conversionCount`? | `null` \| `number` | - |
| `data.endTime` | `number` | - |
| `data.eventProgramAddress`? | `string` | - |
| `data.eventTokenAddress`? | `string` | - |
| `data.eventType` | `EventType` | - |
| `data.landingPage` | `string` | - |
| `data.minAmount`? | `null` \| `number` | - |
| `data.proposal`? | `null` \| `string` | - |
| `data.publisherPayoutPerConversion` | `number` | - |
| `data.publisherRewardType` | [`ApiRewardType`](../enumerations/ApiRewardType.md) | - |
| `data.publisherTokenAddress`? | `string` | - |
| `data.startTime` | `number` | - |
| `data.userPayoutPerConversion`? | `number` | - |
| `data.userRewardType`? | `POINTS` \| `TOKENS` \| `ASYMMETRIC_REWARDS` | - |
| `data.userTokenAddress`? | `string` | - |

#### Returns

`Promise`\<`SignatureField`\>

A promise that resolves with the signature of the transaction.

#### Source

[src/classes/admin.ts:160](https://github.com/torque-labs/torque-ts-sdk/blob/06c96b69b43209c72870e94ce49516c9ed8e9158/src/classes/admin.ts#L160)

***

### deleteAudience()

```ts
deleteAudience(id): Promise<{
  audienceId: string;
}>
```

Delete an existing audience.

#### Parameters

| Parameter | Type | Description |
| :------ | :------ | :------ |
| `id` | `string` | The ID of the audience to delete. |

#### Returns

`Promise`\<\{
  `audienceId`: `string`;
 \}\>

A promise that resolves to the deleted audience.

##### audienceId

```ts
audienceId: string;
```

#### Throws

If the client is not initialized or if there was an error deleting the audience.

#### Source

[src/classes/admin.ts:585](https://github.com/torque-labs/torque-ts-sdk/blob/06c96b69b43209c72870e94ce49516c9ed8e9158/src/classes/admin.ts#L585)

***

### endCampaign()

```ts
endCampaign(data): Promise<SignatureField>
```

End a campaign using the provided campaign ID.

#### Parameters

| Parameter | Type | Description |
| :------ | :------ | :------ |
| `data` | `object` | The ID of the campaign to end. |
| `data.campaignId` | `string` | - |

#### Returns

`Promise`\<`SignatureField`\>

A promise that resolves to the signature of the transaction.

#### Throws

Throws an error if the client is not initialized or if there is an error ending the campaign.

#### Source

[src/classes/admin.ts:195](https://github.com/torque-labs/torque-ts-sdk/blob/06c96b69b43209c72870e94ce49516c9ed8e9158/src/classes/admin.ts#L195)

***

### getAudience()

```ts
getAudience(id): Promise<ApiAudience>
```

Get an audience by ID.

#### Parameters

| Parameter | Type | Description |
| :------ | :------ | :------ |
| `id` | `string` | The ID of the audience to fetch. |

#### Returns

`Promise` \<[`ApiAudience`](../type-aliases/ApiAudience.md)\>

A promise that resolves to an array of Audiences.

#### Throws

If the client is not initialized or there was an error getting the audience.

#### Source

[src/classes/admin.ts:421](https://github.com/torque-labs/torque-ts-sdk/blob/06c96b69b43209c72870e94ce49516c9ed8e9158/src/classes/admin.ts#L421)

***

### getAudiences()

```ts
getAudiences(): Promise<{
  audiences: ApiAudience[];
}>
```

Get a list of the user's saved audiences.

#### Returns

`Promise`\<\{
  `audiences`: [`ApiAudience`](../type-aliases/ApiAudience.md)[];
 \}\>

A promise that resolves to an array of Audiences.

##### audiences

```ts
audiences: ApiAudience[];
```

#### Throws

If the client is not initialized or there was an error getting the audiences.

#### Source

[src/classes/admin.ts:457](https://github.com/torque-labs/torque-ts-sdk/blob/06c96b69b43209c72870e94ce49516c9ed8e9158/src/classes/admin.ts#L457)

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

A promise that resolves to an array of ApiCampaign objects.

##### campaigns

```ts
campaigns: ApiCampaign[];
```

#### Throws

If the client is not initialized or there was an error getting the list of campaigns.

#### Source

[src/classes/admin.ts:128](https://github.com/torque-labs/torque-ts-sdk/blob/06c96b69b43209c72870e94ce49516c9ed8e9158/src/classes/admin.ts#L128)

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

[src/classes/admin.ts:229](https://github.com/torque-labs/torque-ts-sdk/blob/06c96b69b43209c72870e94ce49516c9ed8e9158/src/classes/admin.ts#L229)

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

[src/classes/admin.ts:295](https://github.com/torque-labs/torque-ts-sdk/blob/06c96b69b43209c72870e94ce49516c9ed8e9158/src/classes/admin.ts#L295)

***

### logout()

```ts
logout(): Promise<void>
```

#### Returns

`Promise`\<`void`\>

#### Source

[src/classes/admin.ts:111](https://github.com/torque-labs/torque-ts-sdk/blob/06c96b69b43209c72870e94ce49516c9ed8e9158/src/classes/admin.ts#L111)

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

[src/classes/admin.ts:331](https://github.com/torque-labs/torque-ts-sdk/blob/06c96b69b43209c72870e94ce49516c9ed8e9158/src/classes/admin.ts#L331)

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

[src/classes/admin.ts:259](https://github.com/torque-labs/torque-ts-sdk/blob/06c96b69b43209c72870e94ce49516c9ed8e9158/src/classes/admin.ts#L259)

***

### saveAudience()

```ts
saveAudience(
   config, 
   title, 
   description?): Promise<{
  audienceId: string;
}>
```

Save an audience to the user's account.

#### Parameters

| Parameter | Type | Description |
| :------ | :------ | :------ |
| `config` | [`Audience`](../type-aliases/Audience.md) | The configuration of the audience to save. |
| `title` | `string` | The title of the audience. |
| `description`? | `string` | An optional description of the audience. |

#### Returns

`Promise`\<\{
  `audienceId`: `string`;
 \}\>

A promise that resolves to the id of the saved audience.

##### audienceId

```ts
audienceId: string;
```

#### Throws

If the client is not initialized or there was an error saving the audience.

#### Source

[src/classes/admin.ts:497](https://github.com/torque-labs/torque-ts-sdk/blob/06c96b69b43209c72870e94ce49516c9ed8e9158/src/classes/admin.ts#L497)

***

### updateAudience()

```ts
updateAudience(
   id, 
   config, 
   title?, 
   description?): Promise<{
  audienceId: string;
}>
```

Update an existing audience with the provided configuration.

#### Parameters

| Parameter | Type | Description |
| :------ | :------ | :------ |
| `id` | `string` | The ID of the audience to update. |
| `config` | [`Audience`](../type-aliases/Audience.md) | The configuration of the audience to update. |
| `title`? | `string` | The title of the audience. |
| `description`? | `string` | The description of the audience. |

#### Returns

`Promise`\<\{
  `audienceId`: `string`;
 \}\>

A promise that resolves to the updated audience.

##### audienceId

```ts
audienceId: string;
```

#### Throws

If the client is not initialized or if there was an error updating the audience.

#### Source

[src/classes/admin.ts:542](https://github.com/torque-labs/torque-ts-sdk/blob/06c96b69b43209c72870e94ce49516c9ed8e9158/src/classes/admin.ts#L542)

***

### getSafeTokenList()

```ts
static getSafeTokenList(filter?, apiUrl?): Promise<SafeToken[]>
```

Retrieves the list of safe tokens from the Jupiter ag.

#### Parameters

| Parameter | Type | Description |
| :------ | :------ | :------ |
| `filter`? | `string` | An optional filter to filter the tokens by text. |
| `apiUrl`? | `string` | - |

#### Returns

`Promise` \<[`SafeToken`](../type-aliases/SafeToken.md)[]\>

A promise that resolves to an array of SafeToken objects.

#### Throws

If the client is not initialized or there was an error fetching the safe token list.

#### Source

[src/classes/admin.ts:373](https://github.com/torque-labs/torque-ts-sdk/blob/06c96b69b43209c72870e94ce49516c9ed8e9158/src/classes/admin.ts#L373)
