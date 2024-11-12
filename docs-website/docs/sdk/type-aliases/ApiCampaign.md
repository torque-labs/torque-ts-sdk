# Type Alias: ApiCampaign

```ts
type ApiCampaign: {
  advertiser: {
     profileImage: string | null;
     twitter: string | null;
     username: string | null;
    };
  advertiserPubKey: string;
  asymmetricRewards: AsymmetricReward[];
  audiences: {
     config: Audience[];
     id: string;
     title: string;
    }[];
  blinkOnly: boolean;
  content: string;
  description: string;
  endTime: Date;
  hideRewards: boolean;
  id: string;
  imageUrl: string;
  lootBoxRewards: LootBoxReward & {
     id: string;
    };
  offerBgImage: string;
  offerLink: string;
  offerTheme: OfferTheme;
  pendingConversions: number;
  pubKey: string;
  publisherRewardAmount: string;
  publisherRewardToken: string;
  publisherRewardType: ApiRewardType;
  remainingConversions: number;
  requirements: ApiRequirement[];
  startTime: Date;
  status: string;
  targetLink: string;
  title: string;
  totalConversions: number;
  type: string;
  userPayouts: {
     payoutTx: string | null;
     user: {
        profileImage: string | null;
        pubkey: string;
        twitter: string | null;
        username: string | null;
       };
    }[];
  userRewardAmount: string;
  userRewardToken: string;
  userRewardType: ApiRewardType;
};
```

Campaign data.

## Type declaration

<table>
<thead>
<tr>
<th>Name</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`advertiser`?

</td>
<td>

\{
  `profileImage`: `string` \| `null`;
  `twitter`: `string` \| `null`;
  `username`: `string` \| `null`;
 \}

</td>
</tr>
<tr>
<td>

`advertiser.profileImage`?

</td>
<td>

`string` \| `null`

</td>
</tr>
<tr>
<td>

`advertiser.twitter`?

</td>
<td>

`string` \| `null`

</td>
</tr>
<tr>
<td>

`advertiser.username`?

</td>
<td>

`string` \| `null`

</td>
</tr>
<tr>
<td>

`advertiserPubKey`

</td>
<td>

`string`

</td>
</tr>
<tr>
<td>

`asymmetricRewards`

</td>
<td>

`AsymmetricReward`[]

</td>
</tr>
<tr>
<td>

`audiences`

</td>
<td>

\{
  `config`: [`Audience`](Audience.md)[];
  `id`: `string`;
  `title`: `string`;
 \}[]

</td>
</tr>
<tr>
<td>

`blinkOnly`?

</td>
<td>

`boolean`

</td>
</tr>
<tr>
<td>

`content`?

</td>
<td>

`string`

</td>
</tr>
<tr>
<td>

`description`?

</td>
<td>

`string`

</td>
</tr>
<tr>
<td>

`endTime`

</td>
<td>

`Date`

</td>
</tr>
<tr>
<td>

`hideRewards`

</td>
<td>

`boolean`

</td>
</tr>
<tr>
<td>

`id`

</td>
<td>

`string`

</td>
</tr>
<tr>
<td>

`imageUrl`?

</td>
<td>

`string`

</td>
</tr>
<tr>
<td>

`lootBoxRewards`?

</td>
<td>

`LootBoxReward` & \{
  `id`: `string`;
 \}

</td>
</tr>
<tr>
<td>

`offerBgImage`?

</td>
<td>

`string`

</td>
</tr>
<tr>
<td>

`offerLink`?

</td>
<td>

`string`

</td>
</tr>
<tr>
<td>

`offerTheme`

</td>
<td>

`OfferTheme`

</td>
</tr>
<tr>
<td>

`pendingConversions`?

</td>
<td>

`number`

</td>
</tr>
<tr>
<td>

`pubKey`

</td>
<td>

`string`

</td>
</tr>
<tr>
<td>

`publisherRewardAmount`?

</td>
<td>

`string`

</td>
</tr>
<tr>
<td>

`publisherRewardToken`?

</td>
<td>

`string`

</td>
</tr>
<tr>
<td>

`publisherRewardType`?

</td>
<td>

[`ApiRewardType`](../enumerations/ApiRewardType.md)

</td>
</tr>
<tr>
<td>

`remainingConversions`

</td>
<td>

`number`

</td>
</tr>
<tr>
<td>

`requirements`

</td>
<td>

[`ApiRequirement`](ApiRequirement.md)[]

</td>
</tr>
<tr>
<td>

`startTime`

</td>
<td>

`Date`

</td>
</tr>
<tr>
<td>

`status`

</td>
<td>

`string`

</td>
</tr>
<tr>
<td>

`targetLink`?

</td>
<td>

`string`

</td>
</tr>
<tr>
<td>

`title`

</td>
<td>

`string`

</td>
</tr>
<tr>
<td>

`totalConversions`

</td>
<td>

`number`

</td>
</tr>
<tr>
<td>

`type`

</td>
<td>

`string`

</td>
</tr>
<tr>
<td>

`userPayouts`?

</td>
<td>

\{
  `payoutTx`: `string` \| `null`;
  `user`: \{
     `profileImage`: `string` \| `null`;
     `pubkey`: `string`;
     `twitter`: `string` \| `null`;
     `username`: `string` \| `null`;
    \};
 \}[]

</td>
</tr>
<tr>
<td>

`userRewardAmount`?

</td>
<td>

`string`

</td>
</tr>
<tr>
<td>

`userRewardToken`?

</td>
<td>

`string`

</td>
</tr>
<tr>
<td>

`userRewardType`?

</td>
<td>

[`ApiRewardType`](../enumerations/ApiRewardType.md)

</td>
</tr>
</tbody>
</table>

## Defined in

[torque-ts-sdk/src/types/api.ts:89](https://github.com/torque-labs/torque-ts-sdk/blob/e34efdf278512e8a58bacdba966e9cd90b1db20a/src/types/api.ts#L89)
