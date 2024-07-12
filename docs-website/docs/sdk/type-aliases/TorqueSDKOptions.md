# Type alias: TorqueSDKOptions

```ts
type TorqueSDKOptions: {
  apiKey: string;
  apiUrl: string;
  appUrl: string;
  functionsUrl: string;
  network: Cluster;
  publisherHandle: string;
  rpc: string;
  signer: Adapter | Keypair;
};
```

Options for the TorqueSDK.

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

### functionsUrl?

```ts
optional functionsUrl: string;
```

The functions URL for the client.

### network?

```ts
optional network: Cluster;
```

The network for the client. Defaults to 'mainnet-beta'. Only used if the RPC URL is not provided.

### publisherHandle?

```ts
optional publisherHandle: string;
```

The publisher handle for the client. Defaults to 'torqueprotocol'.

### rpc?

```ts
optional rpc: string;
```

The RPC URL for the client. Defaults to the Solana mainnet-beta cluster.

### signer?

```ts
optional signer: Adapter | Keypair;
```

The signer used to sign transactions.

## Source

[src/classes/sdk.ts:14](https://github.com/torque-labs/torque-ts-sdk/blob/c95828d99ae8c726ef550803d1dbba9bc4dfc9f3/src/classes/sdk.ts#L14)
