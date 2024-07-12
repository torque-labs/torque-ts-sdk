# Type alias: ApiResponseError

```ts
type ApiResponseError: {
  message: string;
  status: Exclude<ApiStatus, ApiStatus.SUCCESS>;
};
```

Generic error response for the API.

## Type declaration

### message

```ts
message: string;
```

### status

```ts
status: Exclude<ApiStatus, ApiStatus.SUCCESS>;
```

## Source

[src/types/api.ts:52](https://github.com/torque-labs/torque-ts-sdk/blob/60b058a1261e69e5eb8f4ad7130e050df24bb92d/src/types/api.ts#L52)
