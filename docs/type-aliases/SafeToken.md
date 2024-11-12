[**@torque-labs/torque-ts-sdk**](../README.md) • **Docs**

***

[@torque-labs/torque-ts-sdk](../README.md) / SafeToken

# Type Alias: SafeToken

```ts
type SafeToken: {
  address: string;
  chainId: number;
  decimals: number;
  extensions: {
     coingeckoId: string;
    };
  logoURI: string;
  name: string;
  symbol: string;
  tags: string[];
};
```

## Type declaration

| Name | Type |
| ------ | ------ |
| `address` | `string` |
| `chainId` | `number` |
| `decimals` | `number` |
| `extensions` | \{ `coingeckoId`: `string`; \} |
| `extensions.coingeckoId` | `string` |
| `logoURI` | `string` |
| `name` | `string` |
| `symbol` | `string` |
| `tags` | `string`[] |

## Defined in

[src/types/chain.ts:1](https://github.com/torque-labs/torque-ts-sdk/blob/a30afeab92cb119627ec542f4c8aff2dd9faf383/src/types/chain.ts#L1)
