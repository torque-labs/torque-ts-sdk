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

[src/classes/user.ts:61](https://github.com/torque-labs/torque-ts-sdk/blob/35180ea2561c531d50df4b23b7bd32172a5fdc80/src/classes/user.ts#L61)

## Properties

| Property | Modifier | Type | Default value |
| :------ | :------ | :------ | :------ |
| `client` | `private` | [`TorqueRequestClient`](TorqueRequestClient.md) | `undefined` |
| `connection` | `private` | `Connection` | `undefined` |
| `initialized` | `public` | `boolean` | `false` |
| `publicKey` | `public` | `string` | `undefined` |
| `publisherHandle` | `public` | `undefined` \| `string` | `undefined` |
| `signer` | `private` | `SignerWalletAdapter` \| `Keypair` | `undefined` |
| `user` | `private` | `undefined` \| [`ApiVerifiedUser`](../type-aliases/ApiVerifiedUser.md) | `undefined` |

## Methods

### acceptCampaign()

```ts
acceptCampaign(campaignId, publisherHandle?): Promise<ApiUserJourney>
```

Accepts a campaign for the current user.

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

[src/classes/user.ts:371](https://github.com/torque-labs/torque-ts-sdk/blob/35180ea2561c531d50df4b23b7bd32172a5fdc80/src/classes/user.ts#L371)

***

### constructLoginBody()

```ts
constructLoginBody(params): {
  authType: "siws";
  payload: {
     input: payload.input;
     output: SolanaSignInOutput;
    };
  pubKey: string;
 } | {
  authType: "basic";
  payload: {
     input: payload.input;
     output: payload.output;
    };
  pubKey: string;
}
```

Constructs the body for the login API request based on the authentication type.

#### Parameters

| Parameter | Type | Description |
| :------ | :------ | :------ |
| `params` | [`ApiInputLogin`](../type-aliases/ApiInputLogin.md) | The parameters for constructing the login body. |

#### Returns

\{
  `authType`: `"siws"`;
  `payload`: \{
     `input`: `payload.input`;
     `output`: `SolanaSignInOutput`;
    \};
  `pubKey`: `string`;
 \} \| \{
  `authType`: `"basic"`;
  `payload`: \{
     `input`: `payload.input`;
     `output`: `payload.output`;
    \};
  `pubKey`: `string`;
 \}

The constructed body for the verify API request, formatted based on the authentication type.

#### Source

[src/classes/user.ts:289](https://github.com/torque-labs/torque-ts-sdk/blob/35180ea2561c531d50df4b23b7bd32172a5fdc80/src/classes/user.ts#L289)

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

[src/classes/user.ts:474](https://github.com/torque-labs/torque-ts-sdk/blob/35180ea2561c531d50df4b23b7bd32172a5fdc80/src/classes/user.ts#L474)

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

[src/classes/user.ts:333](https://github.com/torque-labs/torque-ts-sdk/blob/35180ea2561c531d50df4b23b7bd32172a5fdc80/src/classes/user.ts#L333)

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

[src/classes/user.ts:208](https://github.com/torque-labs/torque-ts-sdk/blob/35180ea2561c531d50df4b23b7bd32172a5fdc80/src/classes/user.ts#L208)

***

### getLoginPayload()

```ts
getLoginPayload(): Promise<ApiIdentifyPayload>
```

Retrieves a sample SIWS payload for l ogging into the Torque API.

#### Returns

`Promise` \<[`ApiIdentifyPayload`](../type-aliases/ApiIdentifyPayload.md)\>

A Promise that resolves to the payload containing the identification statement, issued at time, and expiration time.

#### Throws

Throws an error if the API request is unsuccessful.

#### Source

[src/classes/user.ts:264](https://github.com/torque-labs/torque-ts-sdk/blob/35180ea2561c531d50df4b23b7bd32172a5fdc80/src/classes/user.ts#L264)

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

[src/classes/user.ts:455](https://github.com/torque-labs/torque-ts-sdk/blob/35180ea2561c531d50df4b23b7bd32172a5fdc80/src/classes/user.ts#L455)

***

### getPublisherPda()

```ts
getPublisherPda(): PublicKey
```

Get the publisher PDA for the current user.

#### Returns

`PublicKey`

The publisher PDA for the current user.

#### Source

[src/classes/user.ts:439](https://github.com/torque-labs/torque-ts-sdk/blob/35180ea2561c531d50df4b23b7bd32172a5fdc80/src/classes/user.ts#L439)

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

[src/classes/user.ts:516](https://github.com/torque-labs/torque-ts-sdk/blob/35180ea2561c531d50df4b23b7bd32172a5fdc80/src/classes/user.ts#L516)

***

### getUserHandle()

```ts
getUserHandle(): undefined | null | string
```

Retrieves the user's handle.

#### Returns

`undefined` \| `null` \| `string`

The user's handle or `undefined` if no handle is available.

#### Source

[src/classes/user.ts:246](https://github.com/torque-labs/torque-ts-sdk/blob/35180ea2561c531d50df4b23b7bd32172a5fdc80/src/classes/user.ts#L246)

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

[src/classes/user.ts:423](https://github.com/torque-labs/torque-ts-sdk/blob/35180ea2561c531d50df4b23b7bd32172a5fdc80/src/classes/user.ts#L423)

***

### initializeUser()

```ts
initializeUser(userAuth): Promise<ApiVerifiedUser>
```

Initializes the TorqueUserClient with the provided options.

#### Parameters

| Parameter | Type | Description |
| :------ | :------ | :------ |
| `userAuth` | [`ApiInputLogin`](../type-aliases/ApiInputLogin.md) | User signature object that is required to authenticate a user with Torque. |

#### Returns

`Promise` \<[`ApiVerifiedUser`](../type-aliases/ApiVerifiedUser.md)\>

A Promise that resolves when the initialization is complete.

#### Throws

If user was not verified.

#### Source

[src/classes/user.ts:90](https://github.com/torque-labs/torque-ts-sdk/blob/35180ea2561c531d50df4b23b7bd32172a5fdc80/src/classes/user.ts#L90)

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

[src/classes/user.ts:406](https://github.com/torque-labs/torque-ts-sdk/blob/35180ea2561c531d50df4b23b7bd32172a5fdc80/src/classes/user.ts#L406)

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

[src/classes/user.ts:116](https://github.com/torque-labs/torque-ts-sdk/blob/35180ea2561c531d50df4b23b7bd32172a5fdc80/src/classes/user.ts#L116)

***

### logout()

```ts
private logout(): void
```

Logout the user from the Torque API.

#### Returns

`void`

#### Throws

Throws an error if the client is not initialized or if there is an error logging out the user.

#### Source

[src/classes/user.ts:141](https://github.com/torque-labs/torque-ts-sdk/blob/35180ea2561c531d50df4b23b7bd32172a5fdc80/src/classes/user.ts#L141)

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

[src/classes/user.ts:169](https://github.com/torque-labs/torque-ts-sdk/blob/35180ea2561c531d50df4b23b7bd32172a5fdc80/src/classes/user.ts#L169)

***

### setUserPublisher()

```ts
setUserPublisher(): void
```

#### Returns

`void`

#### Source

[src/classes/user.ts:498](https://github.com/torque-labs/torque-ts-sdk/blob/35180ea2561c531d50df4b23b7bd32172a5fdc80/src/classes/user.ts#L498)
