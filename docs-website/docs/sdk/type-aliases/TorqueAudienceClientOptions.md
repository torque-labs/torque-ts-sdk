# Type alias: TorqueAudienceClientOptions

```ts
type TorqueAudienceClientOptions: {
  apiKey: string;
  apiUrl: string;
  appUrl: string;
  functionsUrl: string;
  signer: Adapter | Keypair;
  userClient: TorqueUserClient;
};
```

Options for the TorqueAudienceClient.

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

[src/classes/audience.ts:12](https://github.com/torque-labs/torque-ts-sdk/blob/4377d91cff1aa0b27936cb53a23174cb35cc6c04/src/classes/audience.ts#L12)
