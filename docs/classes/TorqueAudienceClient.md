[**@torque-labs/torque-ts-sdk**](../README.md) • **Docs**

***

[@torque-labs/torque-ts-sdk](../globals.md) / TorqueAudienceClient

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

> **new TorqueAudienceClient**(`options`): [`TorqueAudienceClient`](TorqueAudienceClient.md)

Create a new instance of the TorqueAdminClient class with the provided API key.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `options` | [`TorqueAudienceClientOptions`](../type-aliases/TorqueAudienceClientOptions.md) | The options for the TorqueAudienceClient. |

#### Returns

[`TorqueAudienceClient`](TorqueAudienceClient.md)

#### Defined in

[src/classes/audience.ts:57](https://github.com/torque-labs/torque-ts-sdk/blob/e34efdf278512e8a58bacdba966e9cd90b1db20a/src/classes/audience.ts#L57)

## Properties

| Property | Type |
| ------ | ------ |
| `client` | [`TorqueRequestClient`](TorqueRequestClient.md) |
| `userClient` | `undefined` \| [`TorqueUserClient`](TorqueUserClient.md) |

## Methods

### buildAudience()

> **buildAudience**(`options`): `Promise`\<[`AudienceBuildResponse`](../type-aliases/AudienceBuildResponse.md)\>

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

[src/classes/audience.ts:77](https://github.com/torque-labs/torque-ts-sdk/blob/e34efdf278512e8a58bacdba966e9cd90b1db20a/src/classes/audience.ts#L77)

***

### logout()

> **logout**(): `Promise`\<`void`\>

#### Returns

`Promise`\<`void`\>

#### Defined in

[src/classes/audience.ts:64](https://github.com/torque-labs/torque-ts-sdk/blob/e34efdf278512e8a58bacdba966e9cd90b1db20a/src/classes/audience.ts#L64)

***

### verifyAudience()

> **verifyAudience**(`audience`, `publicKey`?): `Promise`\<`boolean`\>

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

[src/classes/audience.ts:108](https://github.com/torque-labs/torque-ts-sdk/blob/e34efdf278512e8a58bacdba966e9cd90b1db20a/src/classes/audience.ts#L108)
