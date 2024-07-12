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

[src/types/api.ts:65](https://github.com/torque-labs/torque-ts-sdk/blob/60b058a1261e69e5eb8f4ad7130e050df24bb92d/src/types/api.ts#L65)
