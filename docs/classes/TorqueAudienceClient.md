[**@torque-labs/torque-ts-sdk**](../README.md) • **Docs**

***

[@torque-labs/torque-ts-sdk](../README.md) / TorqueAudienceClient

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
| ------ | ------ | ------ |
| `options` | [`TorqueAudienceClientOptions`](../type-aliases/TorqueAudienceClientOptions.md) | The options for the TorqueAudienceClient. |

#### Returns

[`TorqueAudienceClient`](TorqueAudienceClient.md)

#### Defined in

[src/classes/audience.ts:57](https://github.com/torque-labs/torque-ts-sdk/blob/a30afeab92cb119627ec542f4c8aff2dd9faf383/src/classes/audience.ts#L57)

## Properties

| Property | Type |
| ------ | ------ |
| `client` | [`TorqueRequestClient`](TorqueRequestClient.md) |
| `userClient` | `undefined` \| [`TorqueUserClient`](TorqueUserClient.md) |

## Methods

### buildAudience()

```ts
buildAudience(options): Promise<AudienceBuildResponse>
```

Builds an audience with the provided options.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `options` | [`AudienceBuild`](../type-aliases/AudienceBuild.md) | The options for the audience build. |

#### Returns

`Promise`\<[`AudienceBuildResponse`](../type-aliases/AudienceBuildResponse.md)\>

The response from the API.

#### Throws

If there is an error building the audience.

#### Defined in

[src/classes/audience.ts:77](https://github.com/torque-labs/torque-ts-sdk/blob/a30afeab92cb119627ec542f4c8aff2dd9faf383/src/classes/audience.ts#L77)

***

### logout()

```ts
logout(): Promise<void>
```

#### Returns

`Promise`\<`void`\>

#### Defined in

[src/classes/audience.ts:64](https://github.com/torque-labs/torque-ts-sdk/blob/a30afeab92cb119627ec542f4c8aff2dd9faf383/src/classes/audience.ts#L64)

***

### verifyAudience()

```ts
verifyAudience(audience, publicKey?): Promise<boolean>
```

Verifies the current user with the provided audience.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `audience` | [`Audience`](../type-aliases/Audience.md) | The options for the audience verification. |
| `publicKey`? | `string` | - |

#### Returns

`Promise`\<`boolean`\>

True if the user is verified with the audience, false otherwise.

#### Throws

If there is an error verifying the user with the audience.

#### Defined in

[src/classes/audience.ts:108](https://github.com/torque-labs/torque-ts-sdk/blob/a30afeab92cb119627ec542f4c8aff2dd9faf383/src/classes/audience.ts#L108)
