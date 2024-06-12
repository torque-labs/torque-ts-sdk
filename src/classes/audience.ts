import { Adapter } from '@solana/wallet-adapter-base';
import { Keypair } from '@solana/web3.js';

import { TorqueRequestClient } from './request.js';
import { TorqueUserClient } from './user.js';
import { TORQUE_API_ROUTES, TORQUE_FUNCTIONS_ROUTES } from '../constants/index.js';
import {
  AggreggationCreateInput,
  AndOperator,
  ApiAudienceCreateInput,
  ApiAudienceResponse,
  Audience,
  AudienceBuild,
  AudienceBuildResponse,
  Condition,
  Operation,
  Operator,
  OrOperator,
} from '../types/index.js';
import { getObjectIdHash } from '../utils.js';

/**
 * Options for the TorqueAudienceClient.
 */
export type TorqueAudienceClientOptions = {
  signer: Adapter | Keypair;
  apiKey: string;
  userClient: TorqueUserClient;
};

/**
 * The TorqueAudienceClient class is used to manage and verify audiencess for the Torque API.
 *
 * @example
 * const client = new TorqueAudienceClient(TorqueAudienceClientOptions);
 *
 * const audience = await client.buildAudience(<audienceData>);
 * const verified = await client.verifyAudience(audience);
 */
export class TorqueAudienceClient {
  private client: TorqueRequestClient;
  private userClient: TorqueUserClient;

  /**
   * Create a new instance of the TorqueAdminClient class with the provided API key.
   *
   * @param {TorqueAudienceClientOptions} options - The options for the TorqueAudienceClient.
   */
  constructor(options: TorqueAudienceClientOptions) {
    const { signer, apiKey, userClient } = options;
    this.client = new TorqueRequestClient(signer, apiKey);
    this.userClient = userClient;
  }

  /**
   * Save an audience to the Torque API.
   *
   * @param {ApiAudienceCreateInput} options - The options for the audience creation.
   *
   * @returns {Promise<ApiAudienceResponse>} Returns the ID of the saved audience.
   *
   * @throws {Error} If there is an error saving the audience to the API.
   */
  public async saveAudience(options: ApiAudienceCreateInput) {
    if (!this.client) {
      throw new Error('The client is not initialized.');
    }

    try {
      const result = await this.client.apiFetch<ApiAudienceResponse>(
        TORQUE_API_ROUTES.audiencesCustom,
        {
          method: 'POST',
          body: JSON.stringify(options),
        },
      );

      return result;
    } catch (error) {
      console.error(error);

      throw new Error('There was an error saving the audience.');
    }
  }

  /**
   * Builds an audience with the provided options.
   *
   * @param {BuildWorkerRequest} options - The options for the audience build.
   *
   * @returns {Promise<AudienceFunctionResponse>} The response from the API.
   *
   * @throws {Error} If there is an error building the audience.
   */
  public async buildAudience(options: AudienceBuild) {
    if (!this.client) {
      throw new Error('The client is not initialized.');
    }

    try {
      const result = await this.client.functionsFetch<AudienceBuildResponse>(
        TORQUE_FUNCTIONS_ROUTES.audience.build,
        {
          method: 'POST',
          body: JSON.stringify(options),
        },
      );

      return result;
    } catch (error) {
      console.error(error);

      throw new Error('There was an error building the audience.');
    }
  }

  /**
   * Verifies the current user with the provided audience.
   *
   * @param {Audience} audience - The options for the audience verification.
   *
   * @returns {Promise<boolean>} True if the user is verified with the audience, false otherwise.
   *
   * @throws {Error} If there is an error verifying the user with the audience.
   */
  public async verifyAudience(audience: Audience) {
    if (!this.client) {
      throw new Error('The client is not initialized.');
    }

    try {
      const options = { audience, publicKey: this.userClient.publicKey };

      const result = await this.client.functionsFetch<boolean>(
        TORQUE_FUNCTIONS_ROUTES.audience.verify,
        {
          method: 'POST',
          body: JSON.stringify(options),
        },
      );

      return result;
    } catch (error) {
      console.error(error);

      throw new Error('There was an error verifying the user with the audience.');
    }
  }

  /**
   * Build aggregation query for MongoDB to filter users by target conditions.
   *
   * @param {AggreggationCreateInput} data - The list of target conditions to filter by
   *
   * @returns {object[]} The MongoDB aggregation query
   */
  public static buildAggregation(data: AggreggationCreateInput): object[] {
    // Create a string of the logical operations
    const logicalOperationsString = data.targets.reduce((acc, target, idx) => {
      const targetMd5 = getObjectIdHash(target);

      if (idx === 0) {
        return targetMd5;
      } else {
        return `${acc} ${data.operation} ${targetMd5}`;
      }
    }, '');

    // Setup the stack and operators
    const stack: (Condition | Operator)[] = [];
    const operators: { [key: string]: Operator } = {
      and: { $and: [] },
      or: { $or: [] },
    };

    // Tokenize
    const tokens = logicalOperationsString.replace(/\s+/g, '').split(/(?=[A-Z]+)/);

    for (const token of tokens) {
      if (token === Operation.AND) {
        const operator = operators.and;
        let topOperator = stack[stack.length - 1] as Operator | undefined;

        // If the top operator has lower precedence than the current operator
        if (topOperator && (topOperator as OrOperator).$or) {
          const newAndOperator: AndOperator = operators.and as AndOperator;
          newAndOperator.$and.push(topOperator);
          stack.pop();
          stack.push(newAndOperator);
          topOperator = newAndOperator;
        }

        stack.push(operator);
      } else if (token === Operation.OR) {
        const operator = operators.or;

        stack.push(operator);
      } else {
        const condition: Condition = { targetId: token };
        const top = stack[stack.length - 1] as Operator | undefined;

        if (top && (top as AndOperator).$and) {
          (top as AndOperator).$and.push(condition);
        } else if (top && (top as OrOperator).$or) {
          (top as OrOperator).$or.push(condition);
        } else {
          stack.push(condition);
        }
      }
    }

    // Return the aggregation query
    const aggregationQuery: object[] = [
      {
        $match: stack.length === 1 ? stack[0] : { $and: stack },
      },
      {
        $project: {
          _id: 0,
          walletAddress: 1,
          targetId: 1,
        },
      },
    ];

    return aggregationQuery;
  }
}
