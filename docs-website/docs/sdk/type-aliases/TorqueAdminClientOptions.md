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

[src/classes/admin.ts:25](https://github.com/torque-labs/torque-ts-sdk/blob/06c96b69b43209c72870e94ce49516c9ed8e9158/src/classes/admin.ts#L25)
