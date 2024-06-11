import { Keypair, PublicKey } from "@solana/web3.js";
import { TorqueSDK } from "../../src/classes/sdk";
import { swapBonkCampaignSpl } from "../utils/campaign-configs";
import { Balances, GAS_COST, TEST_SPL, TEST_USER_PATHS, airdrop, loadBalances, loadCliWallet, sendShyftEvent, triggerUserPayouts } from "../utils/helper";
import { TORQUE_API_ROUTES, TORQUE_FUNCTIONS_URL } from "../../src/constants";
import { BONK_SWAP_EVENT } from "../utils/event-configs";


describe("SWAP CONVERSION", () => {
    let advertiserSdk: TorqueSDK, pub1SDK: TorqueSDK;
    let user1SDK: TorqueSDK, user2SDK: TorqueSDK, user3SDK: TorqueSDK;
    beforeAll(async () => {
        advertiserSdk = new TorqueSDK({apiKey: "advertiser1"});
        pub1SDK = new TorqueSDK({apiKey: "publisher1"});
        const user1 = Keypair.generate();
        const user2 = Keypair.generate();
        const user3 = Keypair.generate();
        user1SDK = new TorqueSDK({apiKey: "user1"});
        user2SDK = new TorqueSDK({apiKey: "user2"});
        user3SDK = new TorqueSDK({apiKey: "user3"});

        await advertiserSdk.initialize(loadCliWallet(TEST_USER_PATHS.advertiser1));
        await pub1SDK.initialize(loadCliWallet(TEST_USER_PATHS.publisher1));
        await user1SDK.initialize(user1);
        await user2SDK.initialize(user2);
        await user3SDK.initialize(user3);
    });
    let campaignId: string;
    it("create swap campaign", async () => {
        const result = await advertiserSdk.api?.createCampaign(swapBonkCampaignSpl);
        expect(result).toBeDefined();
        campaignId = result!.campaignId;
        console.log('-- create singature: ', result.signature);
    });

    it('should convert all 3 users', async () => {
        const pub1Handle = pub1SDK.user?.getUserHandle();
        await pub1SDK.user?.getSharedLinkData(campaignId, pub1Handle!);

        const results = await Promise.all([
            user1SDK.user?.acceptCampaign(campaignId, pub1Handle!),
            user2SDK.user?.acceptCampaign(campaignId, pub1Handle!),
            user3SDK.user?.acceptCampaign(campaignId, pub1Handle!)
        ]);
        results.forEach(result => {
            expect(result).toBeDefined();
            expect(result?.status).toEqual("STARTED");
        });
    });

    it("should send event to SHYFT handler", async () => {
        const preBalances = await Promise.all([
            loadBalances(new PublicKey(user1SDK.user?.publicKey!)), 
            loadBalances(new PublicKey(user2SDK.user?.publicKey!)),
            loadBalances(new PublicKey(user3SDK.user?.publicKey!)),
        ]);

        const results = await Promise.all([
            sendShyftEvent(BONK_SWAP_EVENT, user1SDK.user?.publicKey!),
            sendShyftEvent(BONK_SWAP_EVENT, user2SDK.user?.publicKey!),
            sendShyftEvent(BONK_SWAP_EVENT, user3SDK.user?.publicKey!)
        ]);
        results.forEach(result => {
            expect(result).toBeDefined();
            expect(result.message).toEqual('Event sent to Torque server.');
            expect(result.eventResponse.status).toEqual("SUCCESS");
            expect(result.eventResponse.data.transaction).toBeDefined();
        });

        await triggerUserPayouts(); 

        const postBalances = await Promise.all([
            loadBalances(new PublicKey(user1SDK.user?.publicKey!)), 
            loadBalances(new PublicKey(user2SDK.user?.publicKey!)),
            loadBalances(new PublicKey(user3SDK.user?.publicKey!)),
        ]);
        for (let i = 0; i < 3; i++) {
            expect(preBalances[i].spl).toEqual(postBalances[i].spl - swapBonkCampaignSpl.userPayoutPerConversion!);
        }
    });

    it.only("should end campaign", async () => {
        const result = await advertiserSdk.api?.endCampaign({campaignId});
        expect(result).toBeDefined();
        console.log('-- end singature: ', result.signature);
    });
});