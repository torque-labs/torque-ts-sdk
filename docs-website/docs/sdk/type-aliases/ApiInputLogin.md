# Type alias: ApiInputLogin

```ts
type ApiInputLogin: {
  authType: "siws";
  payload: {
     input: SolanaSignInInput;
     output: SolanaSignInOutput;
    };
  pubKey: string;
 } | {
  authType: "basic";
  payload: {
     input: string;
     output: string;
    };
  pubKey: string;
};
```

Input login options for the API.

## Source

[src/types/api.ts:65](https://github.com/torque-labs/torque-ts-sdk/blob/c95828d99ae8c726ef550803d1dbba9bc4dfc9f3/src/types/api.ts#L65)
