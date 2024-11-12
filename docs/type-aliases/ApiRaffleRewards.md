[**@torque-labs/torque-ts-sdk**](../README.md) • **Docs**

***

[@torque-labs/torque-ts-sdk](../README.md) / ApiRaffleRewards

# Type Alias: ApiRaffleRewards

```ts
type ApiRaffleRewards: {
  winners: {
     amount: number;
     tokenAddress: string;
     userPubKey: string;
    }[];
};
```

Raffle rewards data.

## Type declaration

| Name | Type |
| ------ | ------ |
| `winners` | \{ `amount`: `number`; `tokenAddress`: `string`; `userPubKey`: `string`; \}[] |

## Defined in

[src/types/api.ts:302](https://github.com/torque-labs/torque-ts-sdk/blob/a30afeab92cb119627ec542f4c8aff2dd9faf383/src/types/api.ts#L302)
