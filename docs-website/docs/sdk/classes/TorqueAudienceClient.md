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

[src/classes/audience.ts:36](https://github.com/torque-labs/torque-ts-sdk/blob/3bb7686d9ca1711cb29a16a45efd25d459673e82/src/classes/audience.ts#L36)

## Properties

| Property | Modifier | Type |
| :------ | :------ | :------ |
| `client` | `private` | [`TorqueRequestClient`](TorqueRequestClient.md) |
| `userClient` | `private` | [`TorqueUserClient`](TorqueUserClient.md) |

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

[src/classes/audience.ts:51](https://github.com/torque-labs/torque-ts-sdk/blob/3bb7686d9ca1711cb29a16a45efd25d459673e82/src/classes/audience.ts#L51)

***

### verifyAudience()

```ts
verifyAudience(audience): Promise<boolean>
```

Verifies the current user with the provided audience.

#### Parameters

| Parameter | Type | Description |
| :------ | :------ | :------ |
| `audience` | [`Audience`](../type-aliases/Audience.md) | The options for the audience verification. |

#### Returns

`Promise`\<`boolean`\>

True if the user is verified with the audience, false otherwise.

#### Throws

If there is an error verifying the user with the audience.

#### Source

[src/classes/audience.ts:82](https://github.com/torque-labs/torque-ts-sdk/blob/3bb7686d9ca1711cb29a16a45efd25d459673e82/src/classes/audience.ts#L82)
