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

[src/types/api.ts:60](https://github.com/torque-labs/torque-ts-sdk/blob/e7e20c5519300f3127faf1f4bde402ef91d14a40/src/types/api.ts#L60)
