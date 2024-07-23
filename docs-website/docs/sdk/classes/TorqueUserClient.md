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
| :------ | :------ | :------ |
| `options` | [`TorqueUserClientOptions`](../type-aliases/TorqueUserClientOptions.md) | The options for the TorqueUserClient. |

#### Returns

[`TorqueUserClient`](TorqueUserClient.md)

#### Throws

Throws an error if the user's wallet is not provided.

#### Source

[src/classes/user.ts:90](https://github.com/torque-labs/torque-ts-sdk/blob/06c96b69b43209c72870e94ce49516c9ed8e9158/src/classes/user.ts#L90)

## Properties

| Property | Modifier | Type | Default value |
| :------ | :------ | :------ | :------ |
| `apiUrl` | `private` | `string` | `undefined` |
| `appUrl` | `private` | `string` | `undefined` |
| `client` | `private` | [`TorqueRequestClient`](TorqueRequestClient.md) | `undefined` |
| `connection` | `private` | `Connection` | `undefined` |
| `initialized` | `public` | `boolean` | `false` |
| `publicKey` | `public` | `string` | `undefined` |
| `publisherHandle` | `public` | `string` | `undefined` |
| `signer` | `private` | `Adapter` \| `Keypair` | `undefined` |
| `user` | `public` | `undefined` \| [`ApiVerifiedUser`](../type-aliases/ApiVerifiedUser.md) | `undefined` |
| `PUBLISHER_ACCOUNT_SIZE` | `static` | `number` | `41` |

## Methods

### acceptCampaign()

```ts
acceptCampaign(campaignId, publisherHandle?): Promise<ApiUserJourney>
```

Initiate a user journey to accept a campaign for the current user.

#### Parameters

| Parameter | Type | Description |
| :------ | :------ | :------ |
| `campaignId` | `string` | The ID of the campaign to accept. |
| `publisherHandle`? | `string` | The handle of the publisher to accept the campaign for. |

#### Returns

`Promise` \<[`ApiUserJourney`](../type-aliases/ApiUserJourney.md)\>

A Promise that resolves to the journey data for the campaign.

#### Throws

Throws an error if the client is not initialized or if there is an error accepting the campaign.

#### Source

[src/classes/user.ts:416](https://github.com/torque-labs/torque-ts-sdk/blob/06c96b69b43209c72870e94ce49516c9ed8e9158/src/classes/user.ts#L416)

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

##### links

```ts
links: {
  campaignId: string;
  url: string;
 }[];
```

#### Throws

An error if the link fetch fails.

#### Source

[src/classes/user.ts:584](https://github.com/torque-labs/torque-ts-sdk/blob/06c96b69b43209c72870e94ce49516c9ed8e9158/src/classes/user.ts#L584)

***

### getCampaignJourney()

```ts
getCampaignJourney(campaignId): Promise<undefined | ApiCampaignJourney>
```

Retrieves the user's campaign journey for the specified campaign.

#### Parameters

| Parameter | Type | Description |
| :------ | :------ | :------ |
| `campaignId` | `string` | The ID of the campaign to retrieve the journey for. |

#### Returns

`Promise`\<`undefined` \| [`ApiCampaignJourney`](../type-aliases/ApiCampaignJourney.md)\>

A Promise that resolves to the user's campaign journey.

#### Throws

Throws an error if the client is not initialized or if there is an error getting the journey.

#### Source

[src/classes/user.ts:450](https://github.com/torque-labs/torque-ts-sdk/blob/06c96b69b43209c72870e94ce49516c9ed8e9158/src/classes/user.ts#L450)

***

### getCampaigns()

```ts
getCampaigns(): Promise<{
  campaigns: ApiCampaign[];
}>
```

Retrieves a list of active campaigns from the Torque API that the user is eligible to participate in.

#### Returns

`Promise`\<\{
  `campaigns`: [`ApiCampaign`](../type-aliases/ApiCampaign.md)[];
 \}\>

A Promise resolving to an array of `ApiCampaign` objects representing the active campaigns.

##### campaigns

```ts
campaigns: ApiCampaign[];
```

#### Throws

An error if the fetch operation fails, or if the API returns a status other than "SUCCESS".

#### Source

[src/classes/user.ts:385](https://github.com/torque-labs/torque-ts-sdk/blob/06c96b69b43209c72870e94ce49516c9ed8e9158/src/classes/user.ts#L385)

***

### getCurrentUser()

```ts
getCurrentUser(): Promise<undefined | ApiVerifiedUser>
```

Checks to see if the user is already logged into the Torque API.

#### Returns

`Promise`\<`undefined` \| [`ApiVerifiedUser`](../type-aliases/ApiVerifiedUser.md)\>

A promise that resolves to the user if they are signed in, otherwise undefined.

#### Throws

Throws an error if checking the user's login status fails.

#### Source

[src/classes/user.ts:322](https://github.com/torque-labs/torque-ts-sdk/blob/06c96b69b43209c72870e94ce49516c9ed8e9158/src/classes/user.ts#L322)

***

### getMaxTransferableSpl()

```ts
getMaxTransferableSpl(token): Promise<number>
```

#### Parameters

| Parameter | Type |
| :------ | :------ |
| `token` | `PublicKey` |

#### Returns

`Promise`\<`number`\>

#### Source

[src/classes/user.ts:538](https://github.com/torque-labs/torque-ts-sdk/blob/06c96b69b43209c72870e94ce49516c9ed8e9158/src/classes/user.ts#L538)

***

### getPublisherBalance()

```ts
getPublisherBalance(): Promise<number>
```

Get the balance of the publisher PDA for the current user.

#### Returns

`Promise`\<`number`\>

The balance of the publisher PDA for the current user in lamports.

#### Source

[src/classes/user.ts:561](https://github.com/torque-labs/torque-ts-sdk/blob/06c96b69b43209c72870e94ce49516c9ed8e9158/src/classes/user.ts#L561)

***

### getPublisherPda()

```ts
getPublisherPda(): undefined | PublicKey
```

Get the publisher PDA for the current user.

#### Returns

`undefined` \| `PublicKey`

The publisher PDA for the current user.

#### Source

[src/classes/user.ts:525](https://github.com/torque-labs/torque-ts-sdk/blob/06c96b69b43209c72870e94ce49516c9ed8e9158/src/classes/user.ts#L525)

***

### getSharedLinkData()

```ts
getSharedLinkData(campaignId, handle): Promise<ApiShare>
```

Retrieves the data for an offer link for a specific campaign and handle.

#### Parameters

| Parameter | Type | Description |
| :------ | :------ | :------ |
| `campaignId` | `string` | The unique identifier for the campaign. |
| `handle` | `string` | The specific handle associated with the shared link. |

#### Returns

`Promise` \<[`ApiShare`](../type-aliases/ApiShare.md)\>

The data associated with the shared link if the request is successful.

#### Throws

Throws an error there was an error getting the shared link data.

#### Source

[src/classes/user.ts:626](https://github.com/torque-labs/torque-ts-sdk/blob/06c96b69b43209c72870e94ce49516c9ed8e9158/src/classes/user.ts#L626)

***

### getUserHandle()

```ts
getUserHandle(): undefined | string
```

Retrieves the user's handle.

#### Returns

`undefined` \| `string`

The user's handle or `undefined` if no handle is available.

#### Source

[src/classes/user.ts:361](https://github.com/torque-labs/torque-ts-sdk/blob/06c96b69b43209c72870e94ce49516c9ed8e9158/src/classes/user.ts#L361)

***

### getUserPayout()

```ts
getUserPayout(): Promise<ApiUserPayout>
```

Retrieves user's payout history from conversions.

#### Returns

`Promise` \<[`ApiUserPayout`](../type-aliases/ApiUserPayout.md)\>

The data associated with the shared link if the request is successful.

#### Throws

Throws an error there was an error getting the shared link data.

#### Source

[src/classes/user.ts:662](https://github.com/torque-labs/torque-ts-sdk/blob/06c96b69b43209c72870e94ce49516c9ed8e9158/src/classes/user.ts#L662)

***

### getUserShareLink()

```ts
getUserShareLink(campaignId): string
```

Generates a URL for a user's shared link for a specific campaign.

#### Parameters

| Parameter | Type | Description |
| :------ | :------ | :------ |
| `campaignId` | `string` | The unique identifier for the campaign. |

#### Returns

`string`

A promise that resolves to the URL string of the user's shared link for the campaign.

#### Throws

Throws an error if the user is not a publisher or does not have a handle.

#### Source

[src/classes/user.ts:507](https://github.com/torque-labs/torque-ts-sdk/blob/06c96b69b43209c72870e94ce49516c9ed8e9158/src/classes/user.ts#L507)

***

### initializeUser()

```ts
initializeUser(userAuth?): Promise<ApiVerifiedUser>
```

Initializes the TorqueUserClient with the provided options.

#### Parameters

| Parameter | Type | Description |
| :------ | :------ | :------ |
| `userAuth`? | [`ApiInputLogin`](../type-aliases/ApiInputLogin.md) | User signature object that is required to authenticate a user with Torque. |

#### Returns

`Promise` \<[`ApiVerifiedUser`](../type-aliases/ApiVerifiedUser.md)\>

A Promise that resolves when the initialization is complete.

#### Throws

If user was not verified.

#### Source

[src/classes/user.ts:130](https://github.com/torque-labs/torque-ts-sdk/blob/06c96b69b43209c72870e94ce49516c9ed8e9158/src/classes/user.ts#L130)

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

#### Source

[src/classes/user.ts:490](https://github.com/torque-labs/torque-ts-sdk/blob/06c96b69b43209c72870e94ce49516c9ed8e9158/src/classes/user.ts#L490)

***

### login()

```ts
private login(loginOptions): Promise<ApiVerifiedUser>
```

Authenticate the user with the torque API with the provided user signature object.

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

[src/classes/user.ts:219](https://github.com/torque-labs/torque-ts-sdk/blob/06c96b69b43209c72870e94ce49516c9ed8e9158/src/classes/user.ts#L219)

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

##### cleared

```ts
cleared: boolean;
```

#### Throws

Throws an error if the client is not initialized or if there is an error logging out the user.

#### Source

[src/classes/user.ts:244](https://github.com/torque-labs/torque-ts-sdk/blob/06c96b69b43209c72870e94ce49516c9ed8e9158/src/classes/user.ts#L244)

***

### refreshUser()

```ts
refreshUser(): Promise<undefined | ApiVerifiedUser>
```

Rereshes the user's information from the Torque API.

#### Returns

`Promise`\<`undefined` \| [`ApiVerifiedUser`](../type-aliases/ApiVerifiedUser.md)\>

A promise that resolves to the user if they are signed in, otherwise undefined.

#### Source

[src/classes/user.ts:280](https://github.com/torque-labs/torque-ts-sdk/blob/06c96b69b43209c72870e94ce49516c9ed8e9158/src/classes/user.ts#L280)

***

### setUserPublisher()

```ts
setUserPublisher(): void
```

#### Returns

`void`

#### Source

[src/classes/user.ts:608](https://github.com/torque-labs/torque-ts-sdk/blob/06c96b69b43209c72870e94ce49516c9ed8e9158/src/classes/user.ts#L608)
