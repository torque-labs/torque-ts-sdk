import { Adapter } from '@solana/wallet-adapter-base';
import { Connection, Keypair } from '@solana/web3.js';
import { TorqueUserClient } from './user.js';
import { Audience, AudienceBuild, AudienceBuildResponse } from '../types/index.js';
/**
 * Options for the TorqueAudienceClient.
 */
export type TorqueAudienceClientOptions = {
    signer: Adapter | Keypair;
    apiKey: string;
    userClient: TorqueUserClient;
    apiUrl?: string;
    appUrl?: string;
    functionsUrl?: string;
    connection?: Connection;
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
export declare class TorqueAudienceClient {
    private client;
    private userClient;
    /**
     * Create a new instance of the TorqueAdminClient class with the provided API key.
     *
     * @param {TorqueAudienceClientOptions} options - The options for the TorqueAudienceClient.
     */
    constructor(options: TorqueAudienceClientOptions);
    logout(): Promise<void>;
    /**
     * Builds an audience with the provided options.
     *
     * @param {BuildWorkerRequest} options - The options for the audience build.
     *
     * @returns {Promise<AudienceFunctionResponse>} The response from the API.
     *
     * @throws {Error} If there is an error building the audience.
     */
    buildAudience(options: AudienceBuild): Promise<AudienceBuildResponse>;
    /**
     * Verifies the current user with the provided audience.
     *
     * @param {Audience} audience - The options for the audience verification.
     *
     * @returns {Promise<boolean>} True if the user is verified with the audience, false otherwise.
     *
     * @throws {Error} If there is an error verifying the user with the audience.
     */
    verifyAudience(audience: Audience, publicKey?: string): Promise<boolean>;
}
//# sourceMappingURL=audience.d.ts.map