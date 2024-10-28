# Class: TorqueSDK

The official Torque Typescript SDK.

The TorqueSDK class is used to manage the user and api clients for the Torque API.

## Example

```ts
const sdk = new TorqueSDK({
  signer: <wallet adapter or keypair>,
  apiKey: "<your-api-key>",
  publisherHandle: "<your-publisher-handle>",
  rpc: "<RPC URL>",
});

// See if user is already logged in
const currentUser = await sdk.user.getCurrentUser();

// Authenticate the user if not logged in
const user = currentUser
  ? currentUser
  : await sdk.user.initializeUser();
```

## Constructors

### new TorqueSDK()

```ts
new TorqueSDK(options): TorqueSDK
```

Initializes the TorqueSDK with the provided options.

#### Parameters

| Parameter | Type | Description |
| :------ | :------ | :------ |
| `options` | [`TorqueSDKOptions`](../type-aliases/TorqueSDKOptions.md) | The options for the TorqueSDK. |

#### Returns

[`TorqueSDK`](TorqueSDK.md)

#### Throws

Throws an error if the there is no api key or publisher handle provided.

#### Source

[src/classes/sdk.ts:92](https://github.com/torque-labs/torque-ts-sdk/blob/2e5f57950645ce53fe6b770ba8048e80e413132e/src/classes/sdk.ts#L92)

## Properties

| Property | Modifier | Type | Default value |
| :------ | :------ | :------ | :------ |
| `api` | `public` | `undefined` \| [`TorqueAdminClient`](TorqueAdminClient.md) | `undefined` |
| `apiKey` | `private` | `undefined` \| `string` | `undefined` |
| `apiUrl` | `private` | `undefined` \| `string` | `undefined` |
| `appUrl` | `private` | `undefined` \| `string` | `undefined` |
| `audience` | `public` | `undefined` \| [`TorqueAudienceClient`](TorqueAudienceClient.md) | `undefined` |
| `functionsUrl` | `private` | `undefined` \| `string` | `undefined` |
| `initialized` | `private` | `boolean` | `false` |
| `network` | `private` | `Cluster` | `undefined` |
| `publisherHandle` | `private` | `undefined` \| `string` | `undefined` |
| `rpc` | `private` | `undefined` \| `string` | `undefined` |
| `user` | `public` | `undefined` \| [`TorqueUserClient`](TorqueUserClient.md) | `undefined` |

## Methods

### initialize()

```ts
initialize(
   signer, 
   signTransaction?, 
ApiInputLogin?): Promise<void>
```

Initializes the TorqueSDK with the provided options.

#### Parameters

| Parameter | Type | Description |
| :------ | :------ | :------ |
| `signer` | `Adapter` \| `Keypair` | The signer used to sign transactions. |
| `signTransaction`? | [`SignTransaction`](../type-aliases/SignTransaction.md) | The function used to sign transactions. If provided, it will override the default signing method. |
| `ApiInputLogin`? | [`ApiInputLogin`](../type-aliases/ApiInputLogin.md) | The login options for the user. |

#### Returns

`Promise`\<`void`\>

#### Throws

Throws an error if the there is no api key or publisher handle provided.

#### Source

[src/classes/sdk.ts:115](https://github.com/torque-labs/torque-ts-sdk/blob/2e5f57950645ce53fe6b770ba8048e80e413132e/src/classes/sdk.ts#L115)

***

### logout()

```ts
logout(): Promise<void>
```

Logout the user from the Torque API.

#### Returns

`Promise`\<`void`\>

#### Throws

Throws an error if the client is not initialized or if there is an error logging out the user.

#### Source

[src/classes/sdk.ts:170](https://github.com/torque-labs/torque-ts-sdk/blob/2e5f57950645ce53fe6b770ba8048e80e413132e/src/classes/sdk.ts#L170)

***

### constructLoginBody()

```ts
static constructLoginBody(params): {
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

[src/classes/sdk.ts:276](https://github.com/torque-labs/torque-ts-sdk/blob/2e5f57950645ce53fe6b770ba8048e80e413132e/src/classes/sdk.ts#L276)

***

### getLoginPayload()

```ts
static getLoginPayload(apiUrl): Promise<ApiIdentifyPayload>
```

Retrieves a sample SIWS payload for l ogging into the Torque API.

#### Parameters

| Parameter | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `apiUrl` | `string` | `'https://api.torque.so'` | The API URL to use for the payload. Defaults to the Torque API URL. |

#### Returns

`Promise` \<[`ApiIdentifyPayload`](../type-aliases/ApiIdentifyPayload.md)\>

A Promise that resolves to the payload containing the identification statement, issued at time, and expiration time.

#### Throws

Throws an error if the API request is unsuccessful.

#### Source

[src/classes/sdk.ts:244](https://github.com/torque-labs/torque-ts-sdk/blob/2e5f57950645ce53fe6b770ba8048e80e413132e/src/classes/sdk.ts#L244)

***

### verifyLogin()

```ts
static verifyLogin(loginOptions, apiUrl): Promise<ApiUser>
```

Static method to verify the login options with the Torque API.

#### Parameters

| Parameter | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `loginOptions` | [`ApiInputLogin`](../type-aliases/ApiInputLogin.md) | `undefined` | The verification object that is required to authenticate a user with Torque. |
| `apiUrl` | `string` | `'https://api.torque.so'` | The API URL to use for the verification. Defaults to the Torque API URL. |

#### Returns

`Promise` \<[`ApiUser`](../type-aliases/ApiUser.md)\>

A Promise that resolves to an object containing the user information.

#### Throws

Throws an error if there is an error authenticating the user.

#### Source

[src/classes/sdk.ts:201](https://github.com/torque-labs/torque-ts-sdk/blob/2e5f57950645ce53fe6b770ba8048e80e413132e/src/classes/sdk.ts#L201)
