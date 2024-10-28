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

[src/types/api.ts:57](https://github.com/torque-labs/torque-ts-sdk/blob/2e5f57950645ce53fe6b770ba8048e80e413132e/src/types/api.ts#L57)
