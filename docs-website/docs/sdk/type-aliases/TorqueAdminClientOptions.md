# Type alias: TorqueAdminClientOptions

```ts
type TorqueAdminClientOptions: {
  apiKey: string;
  apiUrl: string;
  appUrl: string;
  functionsUrl: string;
  signer: Adapter | Keypair;
  userClient: TorqueUserClient;
};
```

Options for the TorqueAdminClient.

## Type declaration

### apiKey

```ts
apiKey: string;
```

The API key for the client.

### apiUrl?

```ts
optional apiUrl: string;
```

The API URL for the client.

### appUrl?

```ts
optional appUrl: string;
```

The app URL for the client.

### functionsUrl?

```ts
optional functionsUrl: string;
```

The functions URL for the client.

### signer

```ts
signer: Adapter | Keypair;
```

The signer used to sign transactions.

### userClient

```ts
userClient: TorqueUserClient;
```

The user client for the user based API requests.

## Source

[src/classes/admin.ts:24](https://github.com/torque-labs/torque-ts-sdk/blob/c95828d99ae8c726ef550803d1dbba9bc4dfc9f3/src/classes/admin.ts#L24)
