[**@torque-labs/torque-ts-sdk**](../README.md) • **Docs**

***

[@torque-labs/torque-ts-sdk](../README.md) / ApiResponseSuccess

# Type Alias: ApiResponseSuccess\<T\>

```ts
type ApiResponseSuccess<T>: {
  data: T;
  status: ApiStatus.SUCCESS;
};
```

Generic success response for the API.

## Type Parameters

| Type Parameter |
| ------ |
| `T` |

## Type declaration

| Name | Type |
| ------ | ------ |
| `data` | `T` |
| `status` | `ApiStatus.SUCCESS` |

## Defined in

[src/types/api.ts:50](https://github.com/torque-labs/torque-ts-sdk/blob/a30afeab92cb119627ec542f4c8aff2dd9faf383/src/types/api.ts#L50)
