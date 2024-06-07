/**
 * Audiences are used to define the conditions under which a user can participate in a campaign.
 */
export type Audience = {
  operation: Operation;
  audiences: Audience[];
  targets: Target[];
};

/**
 * The operation type of an audience.
 */
export enum Operation {
  AND = 'AND',
  OR = 'OR',
}

/**
 * The type of action that will be used to filter the addresses for a target.
 */
export enum ActionType {
  SWAP = 'SWAP',
  VOTE = 'VOTE',
  PROGRAM_INTERACTION = 'PROGRAM_INTERACTION',
  NFT_MINT = 'NFT_MINT',
  BRIDGE = 'BRIDGE',
}

/**
 * Parameters for a swap action.
 */
export type SwapAction = {
  inTokenAddress?: string;
  outTokenAddress?: string;
  minAmount: number;
};

/**
 * Parameters for a bridge action.
 */
export type BridgeAction = {
  direction: 'INBOUND' | 'OUTBOUND';
  mint: string;
  minAmount?: number;
  maxAmount?: number;
  withinDays?: number;
};

/**
 * Parameters for a program interaction action.
 */
export type ProgramInteractionAction = {
  programAddresses: string[];
  interactions?: number;
  withinDays?: number;
};

/**
 * Parameters for a vote action.
 */
export type VoteAction = {
  proposal: string;
  choice?: string;
};

/**
 * Parameters for a NFT mint action.
 */
export type NftMintAction = {
  collectionAddress: string;
};

/**
 * Swap action requirements.
 */
export type SwapActionRequirements = {
  action: ActionType.SWAP;
  requirement: SwapAction;
};

/**
 * Vote action requirements.
 */
export type VoteActionRequirements = {
  action: ActionType.VOTE;
  requirement: VoteAction;
};

/**
 * Program interaction action requirements.
 */
export type ProgramInteractionActionRequirements = {
  action: ActionType.PROGRAM_INTERACTION;
  requirement: ProgramInteractionAction;
};

/**
 * Nft mint action requirements.
 */
export type NftMintActionRequirements = {
  action: ActionType.NFT_MINT;
  requirement: NftMintAction;
};

/**
 * Bridge action requirements.
 */
export type BridgeActionRequirements = {
  action: ActionType.BRIDGE;
  requirement: BridgeAction;
};

/**
 * Action requirements input.
 */
export type ActionRequirementsInput =
  | SwapActionRequirements
  | VoteActionRequirements
  | ProgramInteractionActionRequirements
  | NftMintActionRequirements
  | BridgeActionRequirements;

/**
 * Staked sol requirements input.
 */
export type StakedSolRequirementsInput = {
  validatorAddress?: string;
  minAmount: number;
  maxAmount?: number;
};

/**
 * Open position requirements input.
 */
export type OpenPositionRequirementsInput = {
  tokenAddress: string;
  programAddress?: string;
  minAmount?: number;
  maxAmount?: number;
};

/**
 * Token holding requirements input.
 */
export type TokenHoldingRequirementsInput = {
  tokenAddress?: string;
  collectionAddress?: string;
  minAmount?: number;
  maxAmount?: number;
};

/**
 * TARGETS
 */

/**
 * The target type of an audience.
 */
export enum TargetType {
  TOKEN_HOLDING = 'TOKEN_HOLDING',
  ACTION = 'ACTION',
  OPEN_POSITION = 'OPEN_POSITION',
  STAKED_SOL = 'STAKED_SOL',
}

/**
 * A token holding target for an audience.
 */
export type TokenHoldingTarget = {
  targetType: TargetType.TOKEN_HOLDING;
  requirement: TokenHoldingRequirementsInput;
};

/**
 * An action target for an audience.
 */
export type ActionTarget = {
  targetType: TargetType.ACTION;
  requirement: ActionRequirementsInput;
};

/**
 * An open position target for an audience.
 */
export type OpenPositionTarget = {
  targetType: TargetType.OPEN_POSITION;
  requirement: OpenPositionRequirementsInput;
};

/**
 * A staked sol target for an audience.
 */
export type StakedSolTarget = {
  targetType: TargetType.STAKED_SOL;
  requirement: StakedSolRequirementsInput;
};

/**
 * The target of an audience.
 */
export type Target = TokenHoldingTarget | ActionTarget | OpenPositionTarget | StakedSolTarget;

/**
 * REQUESTS
 */

/**
 * Generic response for an audience request.
 */
export type AudienceFunctionResponse<T> = T;

/**
 * Build audience request options.
 */
export type AudienceBuild = {
  audience: Audience;
  skipCache?: boolean;
};

/**
 * Build audience response.
 */
export type AudienceBuildResponse = {
  message: string;
};
