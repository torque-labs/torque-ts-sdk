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

[src/types/api.ts:47](https://github.com/torque-labs/torque-ts-sdk/blob/3bb7686d9ca1711cb29a16a45efd25d459673e82/src/types/api.ts#L47)
