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

[src/types/api.ts:49](https://github.com/torque-labs/torque-ts-sdk/blob/4377d91cff1aa0b27936cb53a23174cb35cc6c04/src/types/api.ts#L49)
