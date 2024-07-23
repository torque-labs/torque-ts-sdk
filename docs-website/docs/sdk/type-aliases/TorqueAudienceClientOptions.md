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

[src/classes/audience.ts:12](https://github.com/torque-labs/torque-ts-sdk/blob/06c96b69b43209c72870e94ce49516c9ed8e9158/src/classes/audience.ts#L12)
