# Class: TorqueAudienceClient

The TorqueAudienceClient class is used to manage and verify audiencess for the Torque API.

## Example

```ts
const client = new TorqueAudienceClient(TorqueAudienceClientOptions);

const audience = await client.buildAudience(<audienceData>);
const verified = await client.verifyAudience(audience);
```

## Constructors

### new TorqueAudienceClient()

```ts
new TorqueAudienceClient(options): TorqueAudienceClient
```

Create a new instance of the TorqueAdminClient class with the provided API key.

#### Parameters

| Parameter | Type | Description |
| :------ | :------ | :------ |
| `options` | [`TorqueAudienceClientOptions`](../type-aliases/TorqueAudienceClientOptions.md) | The options for the TorqueAudienceClient. |

#### Returns

[`TorqueAudienceClient`](TorqueAudienceClient.md)

#### Source

[src/classes/audience.ts:46](https://github.com/torque-labs/torque-ts-sdk/blob/60b058a1261e69e5eb8f4ad7130e050df24bb92d/src/classes/audience.ts#L46)

## Properties

| Property | Modifier | Type |
| :------ | :------ | :------ |
| `client` | `private` | [`TorqueRequestClient`](TorqueRequestClient.md) |
| `userClient` | `private` | `undefined` \| [`TorqueUserClient`](TorqueUserClient.md) |

## Methods

### buildAudience()

```ts
buildAudience(options): Promise<AudienceBuildResponse>
```

Builds an audience with the provided options.

#### Parameters

| Parameter | Type | Description |
| :------ | :------ | :------ |
| `options` | [`AudienceBuild`](../type-aliases/AudienceBuild.md) | The options for the audience build. |

#### Returns

`Promise` \<[`AudienceBuildResponse`](../type-aliases/AudienceBuildResponse.md)\>

The response from the API.

#### Throws

If there is an error building the audience.

#### Source

[src/classes/audience.ts:66](https://github.com/torque-labs/torque-ts-sdk/blob/60b058a1261e69e5eb8f4ad7130e050df24bb92d/src/classes/audience.ts#L66)

***

### logout()

```ts
logout(): Promise<void>
```

#### Returns

`Promise`\<`void`\>

#### Source

[src/classes/audience.ts:53](https://github.com/torque-labs/torque-ts-sdk/blob/60b058a1261e69e5eb8f4ad7130e050df24bb92d/src/classes/audience.ts#L53)

***

### verifyAudience()

```ts
verifyAudience(audience, publicKey?): Promise<boolean>
```

Verifies the current user with the provided audience.

#### Parameters

| Parameter | Type | Description |
| :------ | :------ | :------ |
| `audience` | [`Audience`](../type-aliases/Audience.md) | The options for the audience verification. |
| `publicKey`? | `string` | - |

#### Returns

`Promise`\<`boolean`\>

True if the user is verified with the audience, false otherwise.

#### Throws

If there is an error verifying the user with the audience.

#### Source

[src/classes/audience.ts:97](https://github.com/torque-labs/torque-ts-sdk/blob/60b058a1261e69e5eb8f4ad7130e050df24bb92d/src/classes/audience.ts#L97)
