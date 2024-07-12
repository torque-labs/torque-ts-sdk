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

[src/types/api.ts:44](https://github.com/torque-labs/torque-ts-sdk/blob/60b058a1261e69e5eb8f4ad7130e050df24bb92d/src/types/api.ts#L44)
