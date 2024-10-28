# Type alias: ApiResponseSuccess\<T\>

```ts
type ApiResponseSuccess<T>: {
  data: T;
  status: ApiStatus.SUCCESS;
};
```

Generic success response for the API.

## Type parameters

| Type parameter |
| :------ |
| `T` |

## Type declaration

### data

```ts
data: T;
```

### status

```ts
status: ApiStatus.SUCCESS;
```

## Source

[src/types/api.ts:49](https://github.com/torque-labs/torque-ts-sdk/blob/2e5f57950645ce53fe6b770ba8048e80e413132e/src/types/api.ts#L49)
