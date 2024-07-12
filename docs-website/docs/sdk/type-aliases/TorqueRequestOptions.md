# Type alias: TorqueRequestOptions

```ts
type TorqueRequestOptions: {
  apiKey: string;
  apiUrl: string;
  appUrl: string;
  connection: Connection;
  functionsUrl: string;
  signer: Adapter | Keypair;
};
```

Options for the TorqueRequestClient.

## Type declaration

### apiKey?

```ts
optional apiKey: string;
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

### connection?

```ts
optional connection: Connection;
```

The connection for the client.

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

## Source

[src/classes/request.ts:19](https://github.com/torque-labs/torque-ts-sdk/blob/c95828d99ae8c726ef550803d1dbba9bc4dfc9f3/src/classes/request.ts#L19)
