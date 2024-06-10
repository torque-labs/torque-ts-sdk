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

[src/types/api.ts:47](https://github.com/torque-labs/torque-ts-sdk/blob/35180ea2561c531d50df4b23b7bd32172a5fdc80/src/types/api.ts#L47)
