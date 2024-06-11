import { LAMPORTS_PER_SOL, PublicKey } from "@solana/web3.js";
import { TorqueSDK } from "../../src/classes/sdk";
import { clickRaffleCampaign, pointsCampaign } from "../utils/campaign-configs";
import { TEST_USER_PATHS, airdrop, loadBalances, loadCliWallet } from "../utils/helper";

describe("AUDIENCE BUILDER API", () => {
    let sdk: TorqueSDK;
    beforeAll(async () => {
        sdk = new TorqueSDK({
            apiKey: "advertiser1",
        });
        await sdk.initialize(loadCliWallet(TEST_USER_PATHS.advertiser2));
        await sdk.user?.initializeUser();
        await airdrop(new PublicKey(sdk!.user!.publicKey), LAMPORTS_PER_SOL / 10);
    });

    describe.only("POINTS", () => {
        let campaignId: string;
        it.only("should create campaign", async () => {
            const result = await sdk.api?.createCampaign(clickRaffleCampaign);
            console.log('-- create singature: ', result);
            expect(result).toBeDefined();

            const campaigns = await sdk.api?.getCampaigns();
            console.log('-- campaigns: ', campaigns);
            expect(campaigns?.campaigns.length).toBeGreaterThan(0);
            campaignId = campaigns!.campaigns[0].id;
        });

        it("should end campaign", async () => {
            const result = await sdk.api?.endCampaign({campaignId});
            console.log('-- end singature: ', result);
            expect(result).toBeDefined();
        });
    });

    describe("SOL", () => {
        it("should create campaign", async () => {
            // create 

            // validate funds sent
            // validate database 
        });

        it("should create campaign", async () => {
            // end 

            // validate funds returned
            // validate database 
        });
    });

    describe("SPL", () => {
        it("should create campaign", async () => {
            // create 
            
            // validate funds sent
            // validate database 
        });

        it("should create campaign", async () => {
            // end 

            // validate funds returned
            // validate database 
        });
    });
});
