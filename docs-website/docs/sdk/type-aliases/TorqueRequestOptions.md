# Type alias: TorqueRequestOptions

```ts
type TorqueRequestOptions: {
  apiKey: string;
  apiUrl: string;
  appUrl: string;
  connection: Connection;
  functionsUrl: string;
  signTransaction: SignTransaction;
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

### signTransaction?

```ts
optional signTransaction: SignTransaction;
```

The function used to sign transactions. If provided, it will override the default signing method.

### signer

```ts
signer: Adapter | Keypair;
```

The signer used to sign transactions.

## Source

[src/classes/request.ts:20](https://github.com/torque-labs/torque-ts-sdk/blob/06c96b69b43209c72870e94ce49516c9ed8e9158/src/classes/request.ts#L20)
