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

[src/types/transactions.ts:57](https://github.com/torque-labs/torque-ts-sdk/blob/4377d91cff1aa0b27936cb53a23174cb35cc6c04/src/types/transactions.ts#L57)
