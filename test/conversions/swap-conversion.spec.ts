import { Keypair, PublicKey } from "@solana/web3.js";
import { TorqueSDK } from "../../src/classes/sdk";
import { swapBonkCampaignSpl } from "../utils/campaign-configs";
import { TEST_USER_PATHS, loadBalances, loadCliWallet, sendShyftEvent, triggerUserPayouts } from "../utils/helper";
import { BONK_SWAP_EVENT } from "../utils/event-configs";


describe("SWAP CONVERSION", () => {
    let advSdk: TorqueSDK, pubSdk: TorqueSDK;
    let use1Sdk: TorqueSDK, use2Sdk: TorqueSDK, use3Sdk: TorqueSDK;
    beforeAll(async () => {
        advSdk = new TorqueSDK({ apiKey: "advertiser1" });
        await advSdk.initialize(loadCliWallet(TEST_USER_PATHS.advertiser1));

        pubSdk = new TorqueSDK({ apiKey: "publisher1" });
        await pubSdk.initialize(loadCliWallet(TEST_USER_PATHS.publisher1));

        const user1 = Keypair.generate();
        const user2 = Keypair.generate();
        const user3 = Keypair.generate();
        use1Sdk = new TorqueSDK({ apiKey: "user1" });
        use2Sdk = new TorqueSDK({ apiKey: "user2" });
        use3Sdk = new TorqueSDK({ apiKey: "user3" });
        await use1Sdk.initialize(user1);
        await use2Sdk.initialize(user2);
        await use3Sdk.initialize(user3);
    });
    let campaignId: string;
    it("create swap campaign", async () => {
        const result = await advSdk.api?.createCampaign(swapBonkCampaignSpl);
        expect(result).toBeDefined();
        campaignId = result!.campaignId;
        console.log('-- create singature: ', result.signature);
        console.log('-- campaign ID: ', result.campaignId);
    });

    it('should accept offer as all 3 users', async () => {
        const pub1Handle = pubSdk.user?.getUserHandle();
        await pubSdk.user?.getSharedLinkData(campaignId, pub1Handle!);

        const results = await Promise.all([
            use1Sdk.user?.acceptCampaign(campaignId, pub1Handle!),
            use2Sdk.user?.acceptCampaign(campaignId, pub1Handle!),
            use3Sdk.user?.acceptCampaign(campaignId, pub1Handle!)
        ]);
        results.forEach(result => {
            expect(result).toBeDefined();
            expect(result?.status).toEqual("STARTED");
        });
    });

    it("should send event to SHYFT handler converting all 3 users", async () => {
        const preBalances = await Promise.all([
            loadBalances(new PublicKey(use1Sdk.user?.publicKey!)),
            loadBalances(new PublicKey(use2Sdk.user?.publicKey!)),
            loadBalances(new PublicKey(use3Sdk.user?.publicKey!)),
        ]);

        const results = await Promise.all([
            sendShyftEvent(BONK_SWAP_EVENT, use1Sdk.user?.publicKey!),
            sendShyftEvent(BONK_SWAP_EVENT, use2Sdk.user?.publicKey!),
            sendShyftEvent(BONK_SWAP_EVENT, use3Sdk.user?.publicKey!)
        ]);
        results.forEach(result => {
            expect(result).toBeDefined();
            expect(result.message).toEqual('Event sent to Torque server.');
            expect(result.eventResponse.status).toEqual("SUCCESS");
            expect(result.eventResponse.data.transaction).toBeDefined();
        });

        await triggerUserPayouts();

        const postBalances = await Promise.all([
            loadBalances(new PublicKey(use1Sdk.user?.publicKey!)),
            loadBalances(new PublicKey(use2Sdk.user?.publicKey!)),
            loadBalances(new PublicKey(use3Sdk.user?.publicKey!)),
        ]);
        for (let i = 0; i < 3; i++) {
            expect(preBalances[i].spl).toEqual(postBalances[i].spl - swapBonkCampaignSpl.userPayoutPerConversion!);
        }
    });

    it("should end campaign", async () => {
        const result = await advSdk.api?.endCampaign({ campaignId });
        expect(result).toBeDefined();
        console.log('-- end singature: ', result.signature);
    });
});