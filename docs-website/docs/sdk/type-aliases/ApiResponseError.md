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

[src/types/api.ts:47](https://github.com/torque-labs/torque-ts-sdk/blob/e7e20c5519300f3127faf1f4bde402ef91d14a40/src/types/api.ts#L47)
