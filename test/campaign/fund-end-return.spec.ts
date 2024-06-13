import { PublicKey } from "@solana/web3.js";
import { TorqueSDK } from "../../src/classes/sdk";
import { pointsCampaign, publisherUserSOL, publisherUserSPL, raffleSOL, raffleSPL } from "../utils/campaign-configs";
import { CAMPAIGN_RENT_COST, GAS_COST, TEST_USER_PATHS, TOKEN_ACCOUNT_RENT_COST, loadBalances, loadCliWallet } from "../utils/helper";

describe("AUDIENCE BUILDER API", () => {
    let sdk: TorqueSDK;
    beforeAll(async () => {
        sdk = new TorqueSDK({
            apiKey: "advertiser1",
        });
        await sdk.initialize(loadCliWallet(TEST_USER_PATHS.advertiser2));
    });

    let campaignId: string;
    let startSol:number, endSol:number, startSpl:number, endSpl:number;
    describe("POINTS", () => {
        it("should create campaign", async () => {
            ({sol: startSol, spl: startSpl} = await loadBalances(new PublicKey(sdk!.user!.publicKey)));

            const result = await sdk.api?.createCampaign(pointsCampaign);
            expect(result).toBeDefined();
            console.log('-- create singature: ', result.signature);
            campaignId = result!.campaignId; 

            ({sol: endSol, spl: endSpl} = await loadBalances(new PublicKey(sdk!.user!.publicKey)));
            expect(endSol).toBe(startSol - GAS_COST - CAMPAIGN_RENT_COST);
        });

        it("should end campaign", async () => {
            ({sol: startSol, spl: startSpl} = await loadBalances(new PublicKey(sdk!.user!.publicKey)));

            const result = await sdk.api?.endCampaign({campaignId});
            console.log('-- end singature: ', result.signature);
            expect(result).toBeDefined();

            ({sol: endSol, spl: endSpl} = await loadBalances(new PublicKey(sdk!.user!.publicKey)));
            expect(endSol).toBe(startSol - GAS_COST + CAMPAIGN_RENT_COST);
        });
    });

    describe("SOL", () => {
        const totalReward = publisherUserSOL.conversionCount! * 
            (publisherUserSOL.publisherPayoutPerConversion + publisherUserSOL.userPayoutPerConversion!);
        it("should create campaign", async () => {
            ({sol: startSol, spl: startSpl} = await loadBalances(new PublicKey(sdk!.user!.publicKey)));

            const result = await sdk.api?.createCampaign(publisherUserSOL);
            expect(result).toBeDefined();
            console.log('-- create singature: ', result.signature);
            campaignId = result!.campaignId; 

            ({sol: endSol, spl: endSpl} = await loadBalances(new PublicKey(sdk!.user!.publicKey)));
            expect(endSol).toBe(startSol - GAS_COST - CAMPAIGN_RENT_COST - totalReward);
        });

        it("should end campaign", async () => {
            ({sol: startSol, spl: startSpl} = await loadBalances(new PublicKey(sdk!.user!.publicKey)));

            const result = await sdk.api?.endCampaign({campaignId});
            console.log('-- end singature: ', result.signature);
            expect(result).toBeDefined();

            ({sol: endSol, spl: endSpl} = await loadBalances(new PublicKey(sdk!.user!.publicKey)));
            expect(endSol).toBe(startSol - GAS_COST + CAMPAIGN_RENT_COST + totalReward);
        });

        describe("ASYMMETRIC REWARD", () => {
            const totalReward = raffleSOL.asymmetricRewards![0].amount;
            it("should create campaign", async () => {
                ({sol: startSol, spl: startSpl} = await loadBalances(new PublicKey(sdk!.user!.publicKey)));

                const result = await sdk.api?.createCampaign(raffleSOL);
                expect(result).toBeDefined();
                console.log('-- create singature: ', result.signature);
                campaignId = result!.campaignId; 

                ({sol: endSol, spl: endSpl} = await loadBalances(new PublicKey(sdk!.user!.publicKey)));
                expect(endSol).toBe(startSol - GAS_COST - CAMPAIGN_RENT_COST - totalReward);
            });

            it("should end campaign", async () => {
                ({sol: startSol, spl: startSpl} = await loadBalances(new PublicKey(sdk!.user!.publicKey)));

                const result = await sdk.api?.endCampaign({campaignId});
                console.log('-- end singature: ', result.signature);
                expect(result).toBeDefined();

                ({sol: endSol, spl: endSpl} = await loadBalances(new PublicKey(sdk!.user!.publicKey)));
                expect(endSol).toBe(startSol - GAS_COST + CAMPAIGN_RENT_COST + totalReward);
            });
        });
    });

    describe("SPL", () => {
        const totalReward = publisherUserSPL.conversionCount! * 
            (publisherUserSPL.publisherPayoutPerConversion + publisherUserSPL.userPayoutPerConversion!);
        it("should create campaign", async () => {
            ({sol: startSol, spl: startSpl} = await loadBalances(new PublicKey(sdk!.user!.publicKey)));

            const result = await sdk.api?.createCampaign(publisherUserSPL);
            expect(result).toBeDefined();
            console.log('-- create singature: ', result.signature);
            campaignId = result!.campaignId; 

            ({sol: endSol, spl: endSpl} = await loadBalances(new PublicKey(sdk!.user!.publicKey)));
            expect(endSol).toBe(startSol - GAS_COST - CAMPAIGN_RENT_COST - TOKEN_ACCOUNT_RENT_COST);
            expect(endSpl).toBe(startSpl - totalReward);
        });

        it("should end campaign", async () => {
            ({sol: startSol, spl: startSpl} = await loadBalances(new PublicKey(sdk!.user!.publicKey)));

            const result = await sdk.api?.endCampaign({campaignId});
            console.log('-- end singature: ', result.signature);
            expect(result).toBeDefined();

            ({sol: endSol, spl: endSpl} = await loadBalances(new PublicKey(sdk!.user!.publicKey)));
            expect(endSol).toBe(startSol - GAS_COST + CAMPAIGN_RENT_COST);
            expect(endSpl).toBe(startSpl + totalReward);
        });

        describe("ASYMMETRIC REWARD", () => {
            const totalReward = raffleSPL.asymmetricRewards![0].amount;
            it("should create campaign", async () => {
                ({sol: startSol, spl: startSpl} = await loadBalances(new PublicKey(sdk!.user!.publicKey)));

                const result = await sdk.api?.createCampaign(raffleSPL);
                expect(result).toBeDefined();
                console.log('-- create singature: ', result.signature);
                campaignId = result!.campaignId; 

                ({sol: endSol, spl: endSpl} = await loadBalances(new PublicKey(sdk!.user!.publicKey)));
                expect(endSpl).toBe(startSpl - totalReward);
                expect(endSol).toBe(startSol - GAS_COST - CAMPAIGN_RENT_COST);
            });

            it("should end campaign", async () => {
                ({sol: startSol, spl: startSpl} = await loadBalances(new PublicKey(sdk!.user!.publicKey)));

                const result = await sdk.api?.endCampaign({campaignId});
                console.log('-- end singature: ', result.signature);
                expect(result).toBeDefined();

                ({sol: endSol, spl: endSpl} = await loadBalances(new PublicKey(sdk!.user!.publicKey)));
                expect(endSpl).toBe(startSpl + totalReward);
                expect(endSol).toBe(startSol - GAS_COST + CAMPAIGN_RENT_COST);
            });
        });
    });
});
