[**@torque-labs/torque-ts-sdk**](../README.md) • **Docs**

***

[@torque-labs/torque-ts-sdk](../README.md) / ApiResponseError

# Type Alias: ApiResponseError

```ts
type ApiResponseError: {
  message: string;
  status: Exclude<ApiStatus, ApiStatus.SUCCESS>;
};
```

Generic error response for the API.

## Type declaration

| Name | Type |
| ------ | ------ |
| `message` | `string` |
| `status` | `Exclude`\<[`ApiStatus`](../enumerations/ApiStatus.md), `ApiStatus.SUCCESS`\> |

## Defined in

[src/types/api.ts:58](https://github.com/torque-labs/torque-ts-sdk/blob/a30afeab92cb119627ec542f4c8aff2dd9faf383/src/types/api.ts#L58)
