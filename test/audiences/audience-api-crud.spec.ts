import { TorqueSDK } from "../../src/classes/sdk";
import { TEST_USER_PATHS, loadCliWallet } from "../utils/helper";
import { smbAndMadLadHolder } from "../utils/audience-configs";

describe("AUDIENCE CRUD API", () => {
    let sdk: TorqueSDK;
    let audiences: any; 
    beforeAll(async () => {
        sdk = new TorqueSDK({
            apiKey: "advertiser2",
        });
        await sdk.initialize(loadCliWallet(TEST_USER_PATHS.advertiser2));
        await sdk.user?.initializeUser();
    });

    it("should create an audience", async () => {
        const result = await sdk.api?.saveAudience(smbAndMadLadHolder, 'smbANDmadlad');
        expect(result).toBeUndefined();
    });

    it("should get an audience", async () => {
        const result = await sdk.api?.getAudience();
        expect(result?.audiences).toBeDefined();
        expect(result?.audiences.length).toBeGreaterThan(0);
        expect(result?.audiences[0].config).toMatchObject(smbAndMadLadHolder);
        audiences = result?.audiences!;
    });

    it("should update an audience", async () => {
        const result = await sdk.api?.updateAudience(audiences[0].id, 'updated', 'updated description');
        expect(result).toBeUndefined();
        const newAudiences = await sdk.api?.getAudience();
        expect(newAudiences?.audiences.length).toBe(audiences.length);
        expect(newAudiences?.audiences[0].title).toBe('updated');  
        expect(newAudiences?.audiences[0].description).toBe('updated description');
    });

    it("should delete an audience", async () => {
        const result = await sdk.api?.deleteAudience(audiences[0].id);
        expect(result).toBeUndefined();
        const newAudiences = await sdk.api?.getAudience();
        expect(newAudiences?.audiences.length).toBe(0);
    });
});
