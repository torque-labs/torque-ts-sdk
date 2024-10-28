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

## Source

[src/classes/sdk.ts:20](https://github.com/torque-labs/torque-ts-sdk/blob/4377d91cff1aa0b27936cb53a23174cb35cc6c04/src/classes/sdk.ts#L20)
