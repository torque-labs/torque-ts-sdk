# Type alias: TorqueUserClientOptions

```ts
type TorqueUserClientOptions: {
  apiUrl: string;
  appUrl: string;
  functionsUrl: string;
  network: Cluster;
  publisherHandle: string;
  rpc: string;
  signTransaction: SignTransaction;
  signer: Adapter | Keypair;
};
```

Options for the TorqueUserClient.

## Type declaration

### apiUrl?

```ts
optional apiUrl: string;
```

API URL for the client.

### appUrl?

```ts
optional appUrl: string;
```

App URL for the client.

### functionsUrl?

```ts
optional functionsUrl: string;
```

Functions URL for the client.

### network

```ts
network: Cluster;
```

The network for the client. Defaults to 'mainnet-beta'.

### publisherHandle?

```ts
optional publisherHandle: string;
```

The publisher handle for the client. Defaults to 'torqueprotocol'.

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

## Source

[src/classes/user.ts:26](https://github.com/torque-labs/torque-ts-sdk/blob/4377d91cff1aa0b27936cb53a23174cb35cc6c04/src/classes/user.ts#L26)
