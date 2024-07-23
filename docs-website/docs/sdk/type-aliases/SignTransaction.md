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

[src/types/transactions.ts:59](https://github.com/torque-labs/torque-ts-sdk/blob/06c96b69b43209c72870e94ce49516c9ed8e9158/src/types/transactions.ts#L59)
