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

[src/types/api.ts:58](https://github.com/torque-labs/torque-ts-sdk/blob/06c96b69b43209c72870e94ce49516c9ed8e9158/src/types/api.ts#L58)
