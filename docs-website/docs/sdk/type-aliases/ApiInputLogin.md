# Type Alias: ApiInputLogin

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

## Defined in

[torque-ts-sdk/src/types/api.ts:71](https://github.com/torque-labs/torque-ts-sdk/blob/e34efdf278512e8a58bacdba966e9cd90b1db20a/src/types/api.ts#L71)
