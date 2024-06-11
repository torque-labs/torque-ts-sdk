"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TorqueAudienceClient = void 0;
const request_1 = require("./request");
const index_1 = require("../constants/index");
/**
 * The TorqueAudienceClient class is used to manage and verify audiencess for the Torque API.
 *
 * @example
 * const client = new TorqueAudienceClient(TorqueAudienceClientOptions);
 *
 * const audience = await client.buildAudience(<audienceData>);
 * const verified = await client.verifyAudience(audience);
 */
class TorqueAudienceClient {
    client;
    userClient;
    /**
     * Create a new instance of the TorqueAdminClient class with the provided API key.
     *
     * @param {TorqueAudienceClientOptions} options - The options for the TorqueAudienceClient.
     */
    constructor(options) {
        const { signer, apiKey, userClient } = options;
        this.client = new request_1.TorqueRequestClient(signer, apiKey);
        this.userClient = userClient;
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
            const result = await this.client.functionsFetch(index_1.TORQUE_FUNCTIONS_ROUTES.audience.build, {
                method: 'POST',
                body: JSON.stringify(options),
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
    async verifyAudience(audience) {
        if (!this.client) {
            throw new Error('The client is not initialized.');
        }
        try {
            const options = { audience, publicKey: this.userClient.publicKey };
            const result = await this.client.functionsFetch(index_1.TORQUE_FUNCTIONS_ROUTES.audience.verify, {
                method: 'POST',
                body: JSON.stringify(options),
            });
            return result;
        }
        catch (error) {
            console.error(error);
            throw new Error('There was an error verifying the user with the audience.');
        }
    }
}
exports.TorqueAudienceClient = TorqueAudienceClient;
