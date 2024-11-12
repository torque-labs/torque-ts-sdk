[**@torque-labs/torque-ts-sdk**](../README.md) • **Docs**

***

[@torque-labs/torque-ts-sdk](../README.md) / TorqueUserClient

# Class: TorqueUserClient

The TorqueUserClient class is used to authenticate a user with the Torque API.
The user client allows publishers to fetch campaigns and offers that are savailable for the current user.

## Example

```ts
const client = new TorqueUserClient(TorqueUserClientOptions);

// Check if the user is already logged in with API
const currentUser = await client.getCurrentUser();

const user = currentUser
  ? currentUser
  : await this.initializeUser(ApiInputLogin);
```

## Constructors

### new TorqueUserClient()

```ts
new TorqueUserClient(options): TorqueUserClient
```

Create a new instance of the TorqueUserClient class with the publisher's handle, if provided.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `options` | [`TorqueUserClientOptions`](../type-aliases/TorqueUserClientOptions.md) | The options for the TorqueUserClient. |

#### Returns

[`TorqueUserClient`](TorqueUserClient.md)

#### Throws

Throws an error if the user's wallet is not provided.

#### Defined in

[src/classes/user.ts:93](https://github.com/torque-labs/torque-ts-sdk/blob/a30afeab92cb119627ec542f4c8aff2dd9faf383/src/classes/user.ts#L93)

## Properties

| Property | Type |
| ------ | ------ |
| `apiUrl` | `string` |
| `appUrl` | `string` |
| `client` | [`TorqueRequestClient`](TorqueRequestClient.md) |
| `connection` | `Connection` |
| `initialized` | `boolean` |
| `publicKey` | `string` |
| `publisherHandle` | `string` |
| `signer` | `Adapter` \| `Keypair` |
| `user` | `undefined` \| [`ApiUser`](../type-aliases/ApiUser.md) |
| `PUBLISHER_ACCOUNT_SIZE` | `number` |

## Methods

### acceptCampaign()

```ts
acceptCampaign(campaignId, publisherHandle?): Promise<ApiUserJourney>
```

Initiate a user journey to accept a campaign for the current user.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `campaignId` | `string` | The ID of the campaign to accept. |
| `publisherHandle`? | `string` | The handle of the publisher to accept the campaign for. |

#### Returns

`Promise`\<[`ApiUserJourney`](../type-aliases/ApiUserJourney.md)\>

A Promise that resolves to the journey data for the campaign.

#### Throws

Throws an error if the client is not initialized or if there is an error accepting the campaign.

#### Defined in

[src/classes/user.ts:420](https://github.com/torque-labs/torque-ts-sdk/blob/a30afeab92cb119627ec542f4c8aff2dd9faf383/src/classes/user.ts#L420)

***

### authTelegram()

```ts
authTelegram(user): Promise<ApiTelegramAuth>
```

Links user's telegram account to their Torque account.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `user` | `object` |
| `user.auth_date` | `number` |
| `user.first_name` | `string` |
| `user.hash` | `string` |
| `user.id` | `number` |
| `user.photo_url` | `string` |
| `user.username` | `string` |

#### Returns

`Promise`\<[`ApiTelegramAuth`](../type-aliases/ApiTelegramAuth.md)\>

The data associated with the shared link if the request is successful.

#### Throws

Throws an error there was an error getting the shared link data.

#### Defined in

[src/classes/user.ts:939](https://github.com/torque-labs/torque-ts-sdk/blob/a30afeab92cb119627ec542f4c8aff2dd9faf383/src/classes/user.ts#L939)

***

### confirmActionSignature()

```ts
confirmActionSignature(
   campaignId, 
   index, 
encodedMessage): Promise<ActionPostResponse>
```

Sends a signed message to the Torque API to confirm the user's signature for a requirement.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `campaignId` | `string` | The ID of the campaign/offer to confirm the signature for. |
| `index` | `number` | The index of the offer requirement within the campaign. |
| `encodedMessage` | `string` | - |

#### Returns

`Promise`\<`ActionPostResponse`\>

A Solana action response that contains the next requirement.

#### Defined in

[src/classes/user.ts:692](https://github.com/torque-labs/torque-ts-sdk/blob/a30afeab92cb119627ec542f4c8aff2dd9faf383/src/classes/user.ts#L692)

***

### createCustomEvent()

```ts
createCustomEvent(customEvent): Promise<{
  id: string;
}>
```

Creates a new a custom event for the user's account which can be used for custom
event requirements during a campaign.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `customEvent` | `object` | The configuration of the custom event. |
| `customEvent.config` | `Record`\<`string`, `CustomEventFieldType`\> | - |
| `customEvent.name` | `string` | - |

#### Returns

`Promise`\<\{
  `id`: `string`;
 \}\>

A Promise that resolves to the id of the new custom event.

| Name | Type |
| ------ | ------ |
| `id` | `string` |

#### Defined in

[src/classes/user.ts:584](https://github.com/torque-labs/torque-ts-sdk/blob/a30afeab92cb119627ec542f4c8aff2dd9faf383/src/classes/user.ts#L584)

***

### getAllUserShareLinks()

```ts
getAllUserShareLinks(): Promise<{
  links: {
     campaignId: string;
     url: string;
    }[];
}>
```

Fetches all of the user's share links that they have previously created.

#### Returns

`Promise`\<\{
  `links`: \{
     `campaignId`: `string`;
     `url`: `string`;
    \}[];
 \}\>

A Promise resolving to the URLs of the user's share links.

| Name | Type |
| ------ | ------ |
| `links` | \{ `campaignId`: `string`; `url`: `string`; \}[] |

#### Throws

An error if the link fetch fails.

#### Defined in

[src/classes/user.ts:828](https://github.com/torque-labs/torque-ts-sdk/blob/a30afeab92cb119627ec542f4c8aff2dd9faf383/src/classes/user.ts#L828)

***

### getBountyStepAction()

```ts
getBountyStepAction(
   campaignId, 
   actionIndex, 
data): Promise<ActionPostResponse>
```

Get the Solana action for a specific bounty/requirement step.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `campaignId` | `string` | The ID of the campaign to retrieve the journey for. |
| `actionIndex` | `number` | The index of the offer requirement to retrieve the transaction for. |
| `data` | `Record`\<`string`, `string`\> | Additional data to be sent with the request. |

#### Returns

`Promise`\<`ActionPostResponse`\>

The Solana Action response which contains the transaction.

#### Defined in

[src/classes/user.ts:648](https://github.com/torque-labs/torque-ts-sdk/blob/a30afeab92cb119627ec542f4c8aff2dd9faf383/src/classes/user.ts#L648)

***

### getCampaignJourney()

```ts
getCampaignJourney(campaignId): Promise<undefined | ApiCampaignJourney>
```

Retrieves the user's campaign journey for the specified campaign.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `campaignId` | `string` | The ID of the campaign to retrieve the journey for. |

#### Returns

`Promise`\<`undefined` \| [`ApiCampaignJourney`](../type-aliases/ApiCampaignJourney.md)\>

A Promise that resolves to the user's campaign journey.

#### Throws

Throws an error if the client is not initialized or if there is an error getting the journey.

#### Defined in

[src/classes/user.ts:454](https://github.com/torque-labs/torque-ts-sdk/blob/a30afeab92cb119627ec542f4c8aff2dd9faf383/src/classes/user.ts#L454)

***

### getCurrentUser()

```ts
getCurrentUser(): Promise<undefined | ApiUser>
```

Checks to see if the user is already logged into the Torque API.

#### Returns

`Promise`\<`undefined` \| [`ApiUser`](../type-aliases/ApiUser.md)\>

A promise that resolves to the user if they are signed in, otherwise undefined.

#### Throws

Throws an error if checking the user's login status fails.

#### Defined in

[src/classes/user.ts:321](https://github.com/torque-labs/torque-ts-sdk/blob/a30afeab92cb119627ec542f4c8aff2dd9faf383/src/classes/user.ts#L321)

***

### getCustomEvents()

```ts
getCustomEvents(): Promise<{
  config: Record<string, CustomEventFieldType>;
  id: string;
  name: string;
}[]>
```

Fetches the user's custom events

#### Returns

`Promise`\<\{
  `config`: `Record`\<`string`, `CustomEventFieldType`\>;
  `id`: `string`;
  `name`: `string`;
 \}[]\>

A Promise that resolves to an array of custom events.

#### Throws

If the client is not initialized or there was an error fetching the custom events.

#### Defined in

[src/classes/user.ts:556](https://github.com/torque-labs/torque-ts-sdk/blob/a30afeab92cb119627ec542f4c8aff2dd9faf383/src/classes/user.ts#L556)

***

### getJourneys()

```ts
getJourneys(): Promise<undefined | ApiCampaignJourney[]>
```

Retrieves the user's campaign journeys

#### Returns

`Promise`\<`undefined` \| [`ApiCampaignJourney`](../type-aliases/ApiCampaignJourney.md)[]\>

A Promise that resolves to the user's campaign journey.

#### Throws

Throws an error if the client is not initialized or if there is an error getting the journey.

#### Defined in

[src/classes/user.ts:490](https://github.com/torque-labs/torque-ts-sdk/blob/a30afeab92cb119627ec542f4c8aff2dd9faf383/src/classes/user.ts#L490)

***

### getMaxTransferableSpl()

```ts
getMaxTransferableSpl(token): Promise<number>
```

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `token` | `PublicKey` |

#### Returns

`Promise`\<`number`\>

#### Defined in

[src/classes/user.ts:782](https://github.com/torque-labs/torque-ts-sdk/blob/a30afeab92cb119627ec542f4c8aff2dd9faf383/src/classes/user.ts#L782)

***

### getOffers()

```ts
getOffers(profileSlug?): Promise<{
  campaigns: ApiCampaign[];
}>
```

Retrieves a list of active campaigns from the Torque API that the user is eligible to participate in.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `profileSlug`? | `string` |

#### Returns

`Promise`\<\{
  `campaigns`: [`ApiCampaign`](../type-aliases/ApiCampaign.md)[];
 \}\>

A Promise resolving to an array of `ApiCampaign` objects representing the active campaigns.

| Name | Type |
| ------ | ------ |
| `campaigns` | [`ApiCampaign`](../type-aliases/ApiCampaign.md)[] |

#### Throws

An error if the fetch operation fails, or if the API returns a status other than "SUCCESS".

#### Defined in

[src/classes/user.ts:385](https://github.com/torque-labs/torque-ts-sdk/blob/a30afeab92cb119627ec542f4c8aff2dd9faf383/src/classes/user.ts#L385)

***

### getPublisherBalance()

```ts
getPublisherBalance(): Promise<number>
```

Get the balance of the publisher PDA for the current user.

#### Returns

`Promise`\<`number`\>

The balance of the publisher PDA for the current user in lamports.

#### Defined in

[src/classes/user.ts:805](https://github.com/torque-labs/torque-ts-sdk/blob/a30afeab92cb119627ec542f4c8aff2dd9faf383/src/classes/user.ts#L805)

***

### getPublisherPda()

```ts
getPublisherPda(): undefined | PublicKey
```

Get the publisher PDA for the current user.

#### Returns

`undefined` \| `PublicKey`

The publisher PDA for the current user.

#### Defined in

[src/classes/user.ts:769](https://github.com/torque-labs/torque-ts-sdk/blob/a30afeab92cb119627ec542f4c8aff2dd9faf383/src/classes/user.ts#L769)

***

### getSharedLinkData()

```ts
getSharedLinkData(campaignId, handle): Promise<ApiShare>
```

Retrieves the data for an offer link for a specific campaign and handle.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `campaignId` | `string` | The unique identifier for the campaign. |
| `handle` | `string` | The specific handle associated with the shared link. |

#### Returns

`Promise`\<[`ApiShare`](../type-aliases/ApiShare.md)\>

The data associated with the shared link if the request is successful.

#### Throws

Throws an error there was an error getting the shared link data.

#### Defined in

[src/classes/user.ts:870](https://github.com/torque-labs/torque-ts-sdk/blob/a30afeab92cb119627ec542f4c8aff2dd9faf383/src/classes/user.ts#L870)

***

### getUserHandle()

```ts
getUserHandle(): undefined | string
```

Retrieves the user's handle.

#### Returns

`undefined` \| `string`

The user's handle or `undefined` if no handle is available.

#### Defined in

[src/classes/user.ts:359](https://github.com/torque-labs/torque-ts-sdk/blob/a30afeab92cb119627ec542f4c8aff2dd9faf383/src/classes/user.ts#L359)

***

### getUserPayout()

```ts
getUserPayout(): Promise<ApiUserPayout>
```

Retrieves user's payout history from conversions.

#### Returns

`Promise`\<[`ApiUserPayout`](../type-aliases/ApiUserPayout.md)\>

The data associated with the shared link if the request is successful.

#### Throws

Throws an error there was an error getting the shared link data.

#### Defined in

[src/classes/user.ts:906](https://github.com/torque-labs/torque-ts-sdk/blob/a30afeab92cb119627ec542f4c8aff2dd9faf383/src/classes/user.ts#L906)

***

### getUserShareLink()

```ts
getUserShareLink(campaignId): string
```

Generates a URL for a user's shared link for a specific campaign.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `campaignId` | `string` | The unique identifier for the campaign. |

#### Returns

`string`

A promise that resolves to the URL string of the user's shared link for the campaign.

#### Throws

Throws an error if the user is not a publisher or does not have a handle.

#### Defined in

[src/classes/user.ts:751](https://github.com/torque-labs/torque-ts-sdk/blob/a30afeab92cb119627ec542f4c8aff2dd9faf383/src/classes/user.ts#L751)

***

### initializeUser()

```ts
initializeUser(userAuth?): Promise<ApiUser>
```

Initializes the TorqueUserClient with the provided options.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `userAuth`? | [`ApiInputLogin`](../type-aliases/ApiInputLogin.md) | User signature object that is required to authenticate a user with Torque. |

#### Returns

`Promise`\<[`ApiUser`](../type-aliases/ApiUser.md)\>

A Promise that resolves when the initialization is complete.

#### Throws

If user was not verified.

#### Defined in

[src/classes/user.ts:133](https://github.com/torque-labs/torque-ts-sdk/blob/a30afeab92cb119627ec542f4c8aff2dd9faf383/src/classes/user.ts#L133)

***

### isPublisher()

```ts
isPublisher(): boolean
```

Checks to see if the user is a publisher.

#### Returns

`boolean`

True if the user is a publisher, false otherwise.

#### Throws

Throws an error if the user is not signed in.

#### Defined in

[src/classes/user.ts:734](https://github.com/torque-labs/torque-ts-sdk/blob/a30afeab92cb119627ec542f4c8aff2dd9faf383/src/classes/user.ts#L734)

***

### login()

```ts
private login(loginOptions): Promise<ApiUser>
```

Authenticate the user with the torque API with the provided user signature object.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `loginOptions` | [`ApiInputLogin`](../type-aliases/ApiInputLogin.md) | The verification object that is required to authenticate a user with Torque. |

#### Returns

`Promise`\<[`ApiUser`](../type-aliases/ApiUser.md)\>

A Promise that resolves to an object containing the user information.

#### Throws

Throws an error if there is an error authenticating the user.

#### Defined in

[src/classes/user.ts:222](https://github.com/torque-labs/torque-ts-sdk/blob/a30afeab92cb119627ec542f4c8aff2dd9faf383/src/classes/user.ts#L222)

***

### logout()

```ts
logout(): Promise<{
  cleared: boolean;
}>
```

Logout the user from the Torque API.

#### Returns

`Promise`\<\{
  `cleared`: `boolean`;
 \}\>

| Name | Type |
| ------ | ------ |
| `cleared` | `boolean` |

#### Throws

Throws an error if the client is not initialized or if there is an error logging out the user.

#### Defined in

[src/classes/user.ts:247](https://github.com/torque-labs/torque-ts-sdk/blob/a30afeab92cb119627ec542f4c8aff2dd9faf383/src/classes/user.ts#L247)

***

### refreshUser()

```ts
refreshUser(): Promise<undefined | ApiUser>
```

Rereshes the user's information from the Torque API.

#### Returns

`Promise`\<`undefined` \| [`ApiUser`](../type-aliases/ApiUser.md)\>

A promise that resolves to the user if they are signed in, otherwise undefined.

#### Defined in

[src/classes/user.ts:283](https://github.com/torque-labs/torque-ts-sdk/blob/a30afeab92cb119627ec542f4c8aff2dd9faf383/src/classes/user.ts#L283)

***

### setUserPublisher()

```ts
setUserPublisher(): void
```

#### Returns

`void`

#### Defined in

[src/classes/user.ts:852](https://github.com/torque-labs/torque-ts-sdk/blob/a30afeab92cb119627ec542f4c8aff2dd9faf383/src/classes/user.ts#L852)

***

### updateCustomEvent()

```ts
updateCustomEvent(customEvent): Promise<{
  id: string;
}>
```

Updates an existing custom event for the user's account.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `customEvent` | `object` | The updated configuration of the custom event. |
| `customEvent.config` | `Record`\<`string`, `CustomEventFieldType`\> | - |
| `customEvent.id` | `string` | - |
| `customEvent.name` | `string` | - |

#### Returns

`Promise`\<\{
  `id`: `string`;
 \}\>

A Promise that resolves to the id of the updated custom event.

| Name | Type |
| ------ | ------ |
| `id` | `string` |

#### Defined in

[src/classes/user.ts:615](https://github.com/torque-labs/torque-ts-sdk/blob/a30afeab92cb119627ec542f4c8aff2dd9faf383/src/classes/user.ts#L615)

***

### verifyCampaignAudience()

```ts
verifyCampaignAudience(campaignId): Promise<boolean>
```

Verifies that the user is part of the audience for a specific campaign.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `campaignId` | `string` | The ID of the campaign to verify the audience for. |

#### Returns

`Promise`\<`boolean`\>

A Promise that resolves to true if the user is part of the audience for the campaign, false otherwise.

#### Defined in

[src/classes/user.ts:524](https://github.com/torque-labs/torque-ts-sdk/blob/a30afeab92cb119627ec542f4c8aff2dd9faf383/src/classes/user.ts#L524)
