import { TorqueRequestClient } from './request.js';
import { TORQUE_FUNCTIONS_ROUTES } from '../constants/index.js';
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
    client;
    userClient;
    /**
     * Create a new instance of the TorqueAdminClient class with the provided API key.
     *
     * @param {TorqueAudienceClientOptions} options - The options for the TorqueAudienceClient.
     */
    constructor(options) {
        const { signer, apiKey, userClient, apiUrl, appUrl, functionsUrl, connection } = options;
        this.client = new TorqueRequestClient({ signer, apiKey, apiUrl, appUrl, functionsUrl, connection });
        this.userClient = userClient;
    }
    async logout() {
        this.userClient = undefined;
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
    async buildAudience(options) {
        if (!this.client) {
            throw new Error('The client is not initialized.');
        }
        try {
            const result = await this.client.functionsFetch(TORQUE_FUNCTIONS_ROUTES.audience.build, {
                method: 'POST',
                body: JSON.stringify({ body: options }),
            });
            return result;
        }
        catch (error) {
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
    async verifyAudience(audience, publicKey) {
        if (!this.client) {
            throw new Error('The client is not initialized.');
        }
        try {
            const result = await this.client.functionsFetch(TORQUE_FUNCTIONS_ROUTES.audience.verify, {
                method: 'POST',
                body: JSON.stringify({
                    body: {
                        audience,
                        publicKey,
                    },
                }),
            });
            return result;
        }
        catch (error) {
            console.error(error);
            throw new Error('There was an error verifying the user with the audience.');
        }
    }
}
//# sourceMappingURL=audience.js.map