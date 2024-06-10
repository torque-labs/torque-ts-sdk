# Torque Client TypeScript SDK

The official Torque Client TypeScript SDK.

## API Index

### Enumerations

| Enumeration | Description |
| :------ | :------ |
| [ActionType](enumerations/ActionType.md) | The type of action that will be used to filter the addresses for a target. |
| [ApiEventType](enumerations/ApiEventType.md) | On-chain event types for the API. |
| [ApiRewardType](enumerations/ApiRewardType.md) | The rewards type of a campaign. |
| [ApiStatus](enumerations/ApiStatus.md) | The API response success type. |
| [ApiTxnTypes](enumerations/ApiTxnTypes.md) | Torque functions that require a wallet signature. |
| [Operation](enumerations/Operation.md) | The operation type of an audience. |
| [TargetType](enumerations/TargetType.md) | The target type of an audience. |

### Classes

| Class | Description |
| :------ | :------ |
| [TorqueAdminClient](classes/TorqueAdminClient.md) | The TorqueAdminClient class is used to manage admin actions in the Torque API. |
| [TorqueAudienceClient](classes/TorqueAudienceClient.md) | The TorqueAudienceClient class is used to manage and verify audiencess for the Torque API. |
| [TorqueRequestClient](classes/TorqueRequestClient.md) | The TorqueRequestClient class is used to make requests to the Torque API. It provides methods for performing API requests and handling responses. |
| [TorqueSDK](classes/TorqueSDK.md) | The official Torque Typescript SDK. |
| [TorqueUserClient](classes/TorqueUserClient.md) | The TorqueUserClient class is used to authenticate a user with the Torque API. The user client allows publishers to fetch campaigns and offers that are savailable for the current user. |

### Type Aliases

| Type alias | Description |
| :------ | :------ |
| [ActionRequirementsInput](type-aliases/ActionRequirementsInput.md) | Action requirements input. |
| [ActionTarget](type-aliases/ActionTarget.md) | An action target for an audience. |
| [ApiAudience](type-aliases/ApiAudience.md) | Audience data. |
| [ApiCampaign](type-aliases/ApiCampaign.md) | Campaign data. |
| [ApiCampaignLeaderboard](type-aliases/ApiCampaignLeaderboard.md) | Campaign leaderboard data. |
| [ApiIdentifyPayload](type-aliases/ApiIdentifyPayload.md) | Payload returned from the API as a sample payload for sign in. |
| [ApiInputLogin](type-aliases/ApiInputLogin.md) | Input login options for the API. |
| [ApiLinks](type-aliases/ApiLinks.md) | An array of the user's share links. |
| [ApiRaffleRewards](type-aliases/ApiRaffleRewards.md) | Raffle rewards data. |
| [ApiResponse](type-aliases/ApiResponse.md) | Generic response for an API request. |
| [ApiResponseError](type-aliases/ApiResponseError.md) | Generic error response for the API. |
| [ApiResponseSuccess](type-aliases/ApiResponseSuccess.md) | Generic success response for the API. |
| [ApiShare](type-aliases/ApiShare.md) | Share link data. |
| [ApiUser](type-aliases/ApiUser.md) | A Torque user. |
| [ApiUserJourney](type-aliases/ApiUserJourney.md) | A user's journey data. |
| [ApiVerifiedUser](type-aliases/ApiVerifiedUser.md) | A verified Torque user. |
| [Audience](type-aliases/Audience.md) | Audiences are used to define the conditions under which a user can participate in a campaign. |
| [AudienceBuild](type-aliases/AudienceBuild.md) | Build audience request options. |
| [AudienceBuildResponse](type-aliases/AudienceBuildResponse.md) | Build audience response. |
| [AudienceFunctionResponse](type-aliases/AudienceFunctionResponse.md) | Generic response for an audience request. |
| [BridgeAction](type-aliases/BridgeAction.md) | Parameters for a bridge action. |
| [BridgeActionRequirements](type-aliases/BridgeActionRequirements.md) | Bridge action requirements. |
| [CampaignCreateInput](type-aliases/CampaignCreateInput.md) | Campaign create input. |
| [CampaignEndInput](type-aliases/CampaignEndInput.md) | Campaign end input. |
| [NftMintAction](type-aliases/NftMintAction.md) | Parameters for a NFT mint action. |
| [NftMintActionRequirements](type-aliases/NftMintActionRequirements.md) | Nft mint action requirements. |
| [OpenPositionRequirementsInput](type-aliases/OpenPositionRequirementsInput.md) | Open position requirements input. |
| [OpenPositionTarget](type-aliases/OpenPositionTarget.md) | An open position target for an audience. |
| [ProgramInteractionAction](type-aliases/ProgramInteractionAction.md) | Parameters for a program interaction action. |
| [ProgramInteractionActionRequirements](type-aliases/ProgramInteractionActionRequirements.md) | Program interaction action requirements. |
| [PublisherCreateInput](type-aliases/PublisherCreateInput.md) | Publisher create input. |
| [PublisherPayoutInput](type-aliases/PublisherPayoutInput.md) | Publisher payout input. |
| [StakedSolRequirementsInput](type-aliases/StakedSolRequirementsInput.md) | Staked sol requirements input. |
| [StakedSolTarget](type-aliases/StakedSolTarget.md) | A staked sol target for an audience. |
| [SwapAction](type-aliases/SwapAction.md) | Parameters for a swap action. |
| [SwapActionRequirements](type-aliases/SwapActionRequirements.md) | Swap action requirements. |
| [Target](type-aliases/Target.md) | The target of an audience. |
| [TokenHoldingRequirementsInput](type-aliases/TokenHoldingRequirementsInput.md) | Token holding requirements input. |
| [TokenHoldingTarget](type-aliases/TokenHoldingTarget.md) | A token holding target for an audience. |
| [TorqueAdminClientOptions](type-aliases/TorqueAdminClientOptions.md) | Options for the TorqueAdminClient. |
| [TorqueAudienceClientOptions](type-aliases/TorqueAudienceClientOptions.md) | Options for the TorqueAudienceClient. |
| [TorqueSDKOptions](type-aliases/TorqueSDKOptions.md) | Options for the TorqueSDK. |
| [TorqueUserClientOptions](type-aliases/TorqueUserClientOptions.md) | Options for the TorqueUserClient. |
| [TxnExecute](type-aliases/TxnExecute.md) | On-chain transaction execute input. |
| [TxnExecuteResponse](type-aliases/TxnExecuteResponse.md) | On-chain transaction execute response. |
| [TxnInput](type-aliases/TxnInput.md) | On-chain transaction build input |
| [VoteAction](type-aliases/VoteAction.md) | Parameters for a vote action. |
| [VoteActionRequirements](type-aliases/VoteActionRequirements.md) | Vote action requirements. |
