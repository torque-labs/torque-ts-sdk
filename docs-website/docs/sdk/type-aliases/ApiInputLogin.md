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

[src/types/api.ts:70](https://github.com/torque-labs/torque-ts-sdk/blob/4377d91cff1aa0b27936cb53a23174cb35cc6c04/src/types/api.ts#L70)
