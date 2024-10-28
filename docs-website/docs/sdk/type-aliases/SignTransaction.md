# Type alias: SignTransaction()

```ts
type SignTransaction: <T>(transaction) => Promise<T>;
```

Sign transaction function type

## Type parameters

| Type parameter |
| :------ |
| `T` *extends* `Transaction` \| `VersionedTransaction` |

## Parameters

| Parameter | Type |
| :------ | :------ |
| `transaction` | `T` |

## Returns

`Promise`\<`T`\>

## Source

[src/types/transactions.ts:57](https://github.com/torque-labs/torque-ts-sdk/blob/2e5f57950645ce53fe6b770ba8048e80e413132e/src/types/transactions.ts#L57)
