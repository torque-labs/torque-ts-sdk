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
| ------ | ------ | ------ |
| `options` | [`TorqueAdminClientOptions`](../type-aliases/TorqueAdminClientOptions.md) | The options for the TorqueAdminClient. |

#### Returns

[`TorqueAdminClient`](TorqueAdminClient.md)

#### Defined in

[torque-ts-sdk/src/classes/admin.ts:86](https://github.com/torque-labs/torque-ts-sdk/blob/e34efdf278512e8a58bacdba966e9cd90b1db20a/src/classes/admin.ts#L86)

## Properties

| Property | Modifier | Type |
| ------ | ------ | ------ |
| `tokenList` | `static` | `undefined` \| [`SafeToken`](../type-aliases/SafeToken.md)[] |

## Methods

### createCampaign()

```ts
createCampaign(data): Promise<SignatureField>
```

Create a new campaign with the provided data.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `data` | `CreateCampaignInput` | The data for the campaign to create. |

#### Returns

`Promise`\<`SignatureField`\>

A promise that resolves with the signature of the transaction.

#### Defined in

[torque-ts-sdk/src/classes/admin.ts:226](https://github.com/torque-labs/torque-ts-sdk/blob/e34efdf278512e8a58bacdba966e9cd90b1db20a/src/classes/admin.ts#L226)

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
| ------ | ------ | ------ |
| `id` | `string` | The ID of the audience to delete. |

#### Returns

`Promise`\<\{
  `audienceId`: `string`;
 \}\>

A promise that resolves to the deleted audience.

| Name | Type |
| ------ | ------ |
| `audienceId` | `string` |

#### Throws

If the client is not initialized or if there was an error deleting the audience.

#### Defined in

[torque-ts-sdk/src/classes/admin.ts:691](https://github.com/torque-labs/torque-ts-sdk/blob/e34efdf278512e8a58bacdba966e9cd90b1db20a/src/classes/admin.ts#L691)

***

### endCampaign()

```ts
endCampaign(data): Promise<SignatureField>
```

End a campaign using the provided campaign ID.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `data` | `object` | The ID of the campaign to end. |
| `data.campaignId` | `string` | - |

#### Returns

`Promise`\<`SignatureField`\>

A promise that resolves to the signature of the transaction.

#### Throws

Throws an error if the client is not initialized or if there is an error ending the campaign.

#### Defined in

[torque-ts-sdk/src/classes/admin.ts:261](https://github.com/torque-labs/torque-ts-sdk/blob/e34efdf278512e8a58bacdba966e9cd90b1db20a/src/classes/admin.ts#L261)

***

### getActiveCampaigns()

```ts
getActiveCampaigns(params?): Promise<{
  campaigns: ApiCampaign[];
}>
```

Get a list of all currently active campaigns.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `params`? | `object` |
| `params.advertiserPubKey`? | `string` |
| `params.limit`? | `number` |
| `params.page`? | `number` |
| `params.status`? | `string` |

#### Returns

`Promise`\<\{
  `campaigns`: [`ApiCampaign`](../type-aliases/ApiCampaign.md)[];
 \}\>

A promise that resolves to an array of ApiCampaign objects.

| Name | Type |
| ------ | ------ |
| `campaigns` | [`ApiCampaign`](../type-aliases/ApiCampaign.md)[] |

#### Throws

If the client is not initialized or there was an error getting the list of campaigns.

#### Defined in

[torque-ts-sdk/src/classes/admin.ts:131](https://github.com/torque-labs/torque-ts-sdk/blob/e34efdf278512e8a58bacdba966e9cd90b1db20a/src/classes/admin.ts#L131)

***

### getAudience()

```ts
getAudience(id): Promise<ApiAudience>
```

Get an audience by ID.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `id` | `string` | The ID of the audience to fetch. |

#### Returns

`Promise`\<[`ApiAudience`](../type-aliases/ApiAudience.md)\>

A promise that resolves to an array of Audiences.

#### Throws

If the client is not initialized or there was an error getting the audience.

#### Defined in

[torque-ts-sdk/src/classes/admin.ts:523](https://github.com/torque-labs/torque-ts-sdk/blob/e34efdf278512e8a58bacdba966e9cd90b1db20a/src/classes/admin.ts#L523)

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

| Name | Type |
| ------ | ------ |
| `audiences` | [`ApiAudience`](../type-aliases/ApiAudience.md)[] |

#### Throws

If the client is not initialized or there was an error getting the audiences.

#### Defined in

[torque-ts-sdk/src/classes/admin.ts:559](https://github.com/torque-labs/torque-ts-sdk/blob/e34efdf278512e8a58bacdba966e9cd90b1db20a/src/classes/admin.ts#L559)

***

### getCampaign()

```ts
getCampaign(campaignId): Promise<ApiCampaign>
```

Get the details of a specific campaign.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `campaignId` | `string` | The ID of the campaign to retrieve. |

#### Returns

`Promise`\<[`ApiCampaign`](../type-aliases/ApiCampaign.md)\>

A Promise that resolves to the campaign data.

#### Throws

Throws an error if a fetching a campaign failed.

#### Defined in

[torque-ts-sdk/src/classes/admin.ts:198](https://github.com/torque-labs/torque-ts-sdk/blob/e34efdf278512e8a58bacdba966e9cd90b1db20a/src/classes/admin.ts#L198)

***

### getCampaignAnalytics()

```ts
getCampaignAnalytics(campaignId): Promise<CampaignAnalytics>
```

Get the analytics data for a specific campaign.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `campaignId` | `string` | The ID of the campaign to retrieve the analytics for. |

#### Returns

`Promise`\<[`CampaignAnalytics`](../type-aliases/CampaignAnalytics.md)\>

A Promise that resolves to the analytics data for the campaign.

#### Throws

Throws an error if a fetching a campaign failed.

#### Defined in

[torque-ts-sdk/src/classes/admin.ts:487](https://github.com/torque-labs/torque-ts-sdk/blob/e34efdf278512e8a58bacdba966e9cd90b1db20a/src/classes/admin.ts#L487)

***

### getCampaigns()

```ts
getCampaigns(params?, includeHistoric?): Promise<{
  campaigns: ApiCampaign[];
}>
```

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `params`? | `object` |
| `params.advertiserPubKey`? | `string` |
| `params.limit`? | `number` |
| `params.page`? | `number` |
| `params.status`? | `string` |
| `includeHistoric`? | `boolean` |

#### Returns

`Promise`\<\{
  `campaigns`: [`ApiCampaign`](../type-aliases/ApiCampaign.md)[];
 \}\>

| Name | Type |
| ------ | ------ |
| `campaigns` | [`ApiCampaign`](../type-aliases/ApiCampaign.md)[] |

#### Defined in

[torque-ts-sdk/src/classes/admin.ts:150](https://github.com/torque-labs/torque-ts-sdk/blob/e34efdf278512e8a58bacdba966e9cd90b1db20a/src/classes/admin.ts#L150)

***

### getHistoricCampaigns()

```ts
getHistoricCampaigns(params?): Promise<{
  campaigns: ApiCampaign[];
}>
```

Get a list of all historic campaigns.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `params`? | `object` |
| `params.advertiserPubKey`? | `string` |
| `params.limit`? | `number` |
| `params.page`? | `number` |
| `params.status`? | `string` |

#### Returns

`Promise`\<\{
  `campaigns`: [`ApiCampaign`](../type-aliases/ApiCampaign.md)[];
 \}\>

A promise that resolves to an array of ApiCampaign objects.

| Name | Type |
| ------ | ------ |
| `campaigns` | [`ApiCampaign`](../type-aliases/ApiCampaign.md)[] |

#### Throws

If the client is not initialized or there was an error getting the list of campaigns.

#### Defined in

[torque-ts-sdk/src/classes/admin.ts:142](https://github.com/torque-labs/torque-ts-sdk/blob/e34efdf278512e8a58bacdba966e9cd90b1db20a/src/classes/admin.ts#L142)

***

### getLeaderboard()

```ts
getLeaderboard(campaignId): Promise<ApiCampaignLeaderboard>
```

Get the leaderboard for a specific campaign.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `campaignId` | `string` | The ID of the campaign to get the leaderboard for. |

#### Returns

`Promise`\<[`ApiCampaignLeaderboard`](../type-aliases/ApiCampaignLeaderboard.md)\>

A Promise that resolves to the leaderboard data for the campaign.

#### Throws

Throws an error if the client is not initialized or if there is an error getting the leaderboard.

#### Defined in

[torque-ts-sdk/src/classes/admin.ts:295](https://github.com/torque-labs/torque-ts-sdk/blob/e34efdf278512e8a58bacdba966e9cd90b1db20a/src/classes/admin.ts#L295)

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

#### Defined in

[torque-ts-sdk/src/classes/admin.ts:361](https://github.com/torque-labs/torque-ts-sdk/blob/e34efdf278512e8a58bacdba966e9cd90b1db20a/src/classes/admin.ts#L361)

***

### logout()

```ts
logout(): Promise<void>
```

#### Returns

`Promise`\<`void`\>

#### Defined in

[torque-ts-sdk/src/classes/admin.ts:114](https://github.com/torque-labs/torque-ts-sdk/blob/e34efdf278512e8a58bacdba966e9cd90b1db20a/src/classes/admin.ts#L114)

***

### payoutPublisher()

```ts
payoutPublisher(data): Promise<string>
```

Process a publisher payout for the current user, if eligible.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `data` | `object` |
| `data.amount` | `number` |
| `data.token` | `string` |

#### Returns

`Promise`\<`string`\>

A promise that resolves to the signature of the transaction.

#### Throws

Throws an error if there was an error paying out the publisher.

#### Defined in

[torque-ts-sdk/src/classes/admin.ts:397](https://github.com/torque-labs/torque-ts-sdk/blob/e34efdf278512e8a58bacdba966e9cd90b1db20a/src/classes/admin.ts#L397)

***

### raffleRewards()

```ts
raffleRewards(campaignId): Promise<ApiRaffleRewards>
```

Get the raffle rewards for a specific campaign.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `campaignId` | `string` | The ID of the campaign to get the raffle rewards for. |

#### Returns

`Promise`\<[`ApiRaffleRewards`](../type-aliases/ApiRaffleRewards.md)\>

#### Throws

Throws an error if the client is not initialized or if there is an error getting the raffle rewards.

#### Defined in

[torque-ts-sdk/src/classes/admin.ts:325](https://github.com/torque-labs/torque-ts-sdk/blob/e34efdf278512e8a58bacdba966e9cd90b1db20a/src/classes/admin.ts#L325)

***

### saveAudience()

```ts
saveAudience(metadata, config?): Promise<{
  audienceId: string;
}>
```

Save an audience to the user's account.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `metadata` | [`ApiAudienceMetadata`](../type-aliases/ApiAudienceMetadata.md) | The metadata of the audience. |
| `config`? | [`Audience`](../type-aliases/Audience.md) | The configuration of the audience to save. |

#### Returns

`Promise`\<\{
  `audienceId`: `string`;
 \}\>

A promise that resolves to the id of the saved audience.

| Name | Type |
| ------ | ------ |
| `audienceId` | `string` |

#### Throws

If the client is not initialized or there was an error saving the audience.

#### Defined in

[torque-ts-sdk/src/classes/admin.ts:598](https://github.com/torque-labs/torque-ts-sdk/blob/e34efdf278512e8a58bacdba966e9cd90b1db20a/src/classes/admin.ts#L598)

***

### updateAudience()

```ts
updateAudience(
   id, 
   metadata?, 
   config?): Promise<{
  audienceId: string;
}>
```

Update an existing audience with the provided configuration.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `id` | `string` | The ID of the audience to update. |
| `metadata`? | [`ApiAudienceMetadata`](../type-aliases/ApiAudienceMetadata.md) | The metadata of the audience. |
| `config`? | [`Audience`](../type-aliases/Audience.md) | The configuration of the audience to update. |

#### Returns

`Promise`\<\{
  `audienceId`: `string`;
 \}\>

A promise that resolves to the updated audience.

| Name | Type |
| ------ | ------ |
| `audienceId` | `string` |

#### Throws

If the client is not initialized or if there was an error updating the audience.

#### Defined in

[torque-ts-sdk/src/classes/admin.ts:645](https://github.com/torque-labs/torque-ts-sdk/blob/e34efdf278512e8a58bacdba966e9cd90b1db20a/src/classes/admin.ts#L645)

***

### getSafeTokenList()

```ts
static getSafeTokenList(filter?, apiUrl?): Promise<SafeToken[]>
```

Retrieves the list of safe tokens from the Jupiter ag.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `filter`? | `string` | An optional filter to filter the tokens by text. |
| `apiUrl`? | `string` | - |

#### Returns

`Promise`\<[`SafeToken`](../type-aliases/SafeToken.md)[]\>

A promise that resolves to an array of SafeToken objects.

#### Throws

If the client is not initialized or there was an error fetching the safe token list.

#### Defined in

[torque-ts-sdk/src/classes/admin.ts:439](https://github.com/torque-labs/torque-ts-sdk/blob/e34efdf278512e8a58bacdba966e9cd90b1db20a/src/classes/admin.ts#L439)
