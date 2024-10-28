# Type alias: TorqueAdminClientOptions

```ts
type TorqueAdminClientOptions: {
  apiKey: string;
  apiUrl: string;
  appUrl: string;
  functionsUrl: string;
  network: Cluster;
  rpc: string;
  signTransaction: SignTransaction;
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

### network

```ts
network: Cluster;
```

The network for the client. Defaults to 'mainnet-beta'.

### rpc?

```ts
optional rpc: string;
```

RPC URL for the client.

### signTransaction?

```ts
optional signTransaction: SignTransaction;
```

The function used to sign transactions. If provided, it will override the default signing method.

### signer?

```ts
optional signer: Adapter | Keypair;
```

The signer used to sign transactions.

### userClient?

```ts
optional userClient: TorqueUserClient;
```

The user client for the user based API requests.

## Source

[src/classes/admin.ts:27](https://github.com/torque-labs/torque-ts-sdk/blob/4377d91cff1aa0b27936cb53a23174cb35cc6c04/src/classes/admin.ts#L27)
