# Type alias: TorqueSDKOptions

```ts
type TorqueSDKOptions: {
  apiKey: string;
  publisherHandle: string;
  rpc: string;
  signer: SignerWalletAdapter | Keypair;
};
```

Options for the TorqueSDK.

## Type declaration

### apiKey?

```ts
optional apiKey: string;
```

### publisherHandle?

```ts
optional publisherHandle: string;
```

### rpc?

```ts
optional rpc: string;
```

### signer

```ts
signer: SignerWalletAdapter | Keypair;
```

## Source

[src/classes/sdk.ts:13](https://github.com/torque-labs/torque-ts-sdk/blob/e7e20c5519300f3127faf1f4bde402ef91d14a40/src/classes/sdk.ts#L13)
