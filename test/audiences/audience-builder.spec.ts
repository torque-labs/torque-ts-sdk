import { TorqueSDK } from "../../src/classes/sdk";
import { TEST_USER_PATHS, loadCliWallet } from "../utils/helper";
import { smbOrMadLadHolder } from "../utils/audience-configs";

describe("AUDIENCE BUILDER API", () => {
    let sdk: TorqueSDK;
    beforeAll(async () => {
        sdk = new TorqueSDK({
            apiKey: "advertiser1",
        });
        await sdk.initialize(loadCliWallet(TEST_USER_PATHS.advertiser1));
    });

    it("should initate building an audience", async () => {
        const result = await sdk.audience?.buildAudience({audience: smbOrMadLadHolder});
        expect(result).toBeDefined();
        expect(result?.message).toBe("Success. Your audience is being built.");
    });

    describe("should verify audience memebers", () => {
        const validHolder = '5W4NgrfLu4jSf7VomXjnSHV5ArWmk88ZKzg5XpTSXB29';
        const invalidHolder = '5W4NgrfLu4jSf7VomXjnSHV5ArWmk88ZKzg5XpTSXB28';
        it("valid", async () => {
            const result = await sdk.audience?.verifyAudience(smbOrMadLadHolder, validHolder);
            expect(result).toBe(true);
        }); 

        it("invalid", async () => {
            const result = await sdk.audience?.verifyAudience(smbOrMadLadHolder, invalidHolder);
            expect(result).toBe(false);
        });
    });
});
