# Type alias: TorqueUserClientOptions

```ts
type TorqueUserClientOptions: {
  apiUrl: string;
  appUrl: string;
  functionsUrl: string;
  network: Cluster;
  publisherHandle: string;
  rpc: string;
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

### signer

```ts
signer: Adapter | Keypair;
```

The signer used to sign transactions.

## Source

[src/classes/user.ts:22](https://github.com/torque-labs/torque-ts-sdk/blob/c95828d99ae8c726ef550803d1dbba9bc4dfc9f3/src/classes/user.ts#L22)
