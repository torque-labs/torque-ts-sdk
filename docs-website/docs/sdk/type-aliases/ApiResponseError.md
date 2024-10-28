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

[src/types/api.ts:57](https://github.com/torque-labs/torque-ts-sdk/blob/4377d91cff1aa0b27936cb53a23174cb35cc6c04/src/types/api.ts#L57)
