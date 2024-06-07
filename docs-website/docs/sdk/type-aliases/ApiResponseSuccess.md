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

[src/types/api.ts:39](https://github.com/torque-labs/torque-ts-sdk/blob/35180ea2561c531d50df4b23b7bd32172a5fdc80/src/types/api.ts#L39)
