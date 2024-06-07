export interface Audience {
  operation: Operation;
  audiences: Audience[];
  targets: Target[];
}

export enum Operation {
  AND = 'AND',
  OR = 'OR',
}

/**
 * ACTIONS
 */
export enum ActionType {
  SWAP = 'SWAP',
  VOTE = 'VOTE',
  PROGRAM_INTERACTION = 'PROGRAM_INTERACTION',
  NFT_MINT = 'NFT_MINT',
  BRIDGE = 'BRIDGE',
}

/**
 * Action Requirements
 */
export type SwapAction = {
  inTokenAddress?: string;
  outTokenAddress?: string;
  minAmount: number;
};

export type BridgeAction = {
  direction: 'INBOUND' | 'OUTBOUND';
  mint: string;
  minAmount?: number;
  maxAmount?: number;
  withinDays?: number;
};

export type ProgramInteractionAction = {
  programAddresses: string[];
  interactions?: number;
  withinDays?: number;
};

export type VoteAction = {
  proposal: string;
  choice?: string;
};

export type NftMintAction = {
  collectionAddress: string;
};

export type SwapActionRequirements = {
  action: ActionType.SWAP;
  requirement: SwapAction;
};

export type VoteActionRequirements = {
  action: ActionType.VOTE;
  requirement: VoteAction;
};

export type ProgramInteractionActionRequirements = {
  action: ActionType.PROGRAM_INTERACTION;
  requirement: ProgramInteractionAction;
};
export type NftMintActionRequirements = {
  action: ActionType.NFT_MINT;
  requirement: NftMintAction;
};

export type BridgeActionRequirements = {
  action: ActionType.BRIDGE;
  requirement: BridgeAction;
};

export type ActionRequirementsInput =
  | SwapActionRequirements
  | VoteActionRequirements
  | ProgramInteractionActionRequirements
  | NftMintActionRequirements
  | BridgeActionRequirements;

export type StakedSolRequirementsInput = {
  validatorAddress?: string;
  minAmount: number;
  maxAmount?: number;
};

export type OpenPositionRequirementsInput = {
  tokenAddress: string;
  programAddress?: string;
  minAmount?: number;
  maxAmount?: number;
};

export type TokenHoldingRequirementsInput = {
  tokenAddress?: string;
  collectionAddress?: string;
  minAmount?: number;
  maxAmount?: number;
};

/**
 * TARGETS
 */

export enum TargetType {
  TOKEN_HOLDING = 'TOKEN_HOLDING',
  ACTION = 'ACTION',
  OPEN_POSITION = 'OPEN_POSITION',
  STAKED_SOL = 'STAKED_SOL',
}

export type TokenHoldingTarget = {
  targetType: TargetType.TOKEN_HOLDING;
  requirement: TokenHoldingRequirementsInput;
};

export type ActionTarget = {
  targetType: TargetType.ACTION;
  requirement: ActionRequirementsInput;
};

export type OpenPositionTarget = {
  targetType: TargetType.OPEN_POSITION;
  requirement: OpenPositionRequirementsInput;
};

export type StakedSolTarget = {
  targetType: TargetType.STAKED_SOL;
  requirement: StakedSolRequirementsInput;
};

export type Target = TokenHoldingTarget | ActionTarget | OpenPositionTarget | StakedSolTarget;

/**
 * REQUESTS
 */
export type AudienceFunctionResponse<T> = T;

export type AudienceBuild = {
  audience: Audience;
  skipCache?: boolean;
};

export type AudienceVerify = {
  audience: Audience;
};

export type AudienceBuildResponse = {
  message: string;
};
