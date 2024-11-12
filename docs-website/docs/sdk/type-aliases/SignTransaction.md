# Type Alias: SignTransaction()

```ts
type SignTransaction: <T>(transaction) => Promise<T>;
```

Sign transaction function type

## Type Parameters

| Type Parameter |
| ------ |
| `T` *extends* `Transaction` \| `VersionedTransaction` |

## Parameters

| Parameter | Type |
| ------ | ------ |
| `transaction` | `T` |

## Returns

`Promise`\<`T`\>

## Defined in

[torque-ts-sdk/src/types/transactions.ts:57](https://github.com/torque-labs/torque-ts-sdk/blob/e34efdf278512e8a58bacdba966e9cd90b1db20a/src/types/transactions.ts#L57)
