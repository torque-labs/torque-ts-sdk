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

[src/types/api.ts:37](https://github.com/torque-labs/torque-ts-sdk/blob/06c96b69b43209c72870e94ce49516c9ed8e9158/src/types/api.ts#L37)
