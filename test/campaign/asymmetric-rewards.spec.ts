import { Keypair, PublicKey } from "@solana/web3.js";
import { TorqueSDK } from "../../src/classes/sdk";
import {  raffle1Winner } from "../utils/campaign-configs";
import {  TEST_USER_PATHS, loadBalances, loadCliWallet, triggerUserPayouts } from "../utils/helper";

describe('Asymmetric Rewards', () => {
    let advSdk: TorqueSDK, pub1Sdk: TorqueSDK;
    let user1SDK: TorqueSDK, user2SDK: TorqueSDK, user3SDK: TorqueSDK;
    beforeAll(async () => {
        advSdk = new TorqueSDK({apiKey: "advertiser1"});
        pub1Sdk = new TorqueSDK({apiKey: "publisher1"});
        const user1 = Keypair.generate();
        const user2 = Keypair.generate();
        const user3 = Keypair.generate();
        user1SDK = new TorqueSDK({apiKey: "user1"});
        user2SDK = new TorqueSDK({apiKey: "user2"});
        user3SDK = new TorqueSDK({apiKey: "user3"});

        await advSdk.initialize(loadCliWallet(TEST_USER_PATHS.advertiser1));
        await pub1Sdk.initialize(loadCliWallet(TEST_USER_PATHS.publisher1));
        await user1SDK.initialize(user1);
        await user2SDK.initialize(user2);
        await user3SDK.initialize(user3);
    });
    let campaignId: string;
    it("create swap campaign", async () => {
        const result = await advSdk.api?.createCampaign(raffle1Winner);
        expect(result).toBeDefined();
        campaignId = result!.campaignId;
        console.log('-- create singature: ', result.signature);
        console.log('-- campaign ID: ', result.campaignId); 
    });

    it('should convert all 3 users', async () => {
        const pubHandle = pub1Sdk.user?.getUserHandle();
        await pub1Sdk.user?.getSharedLinkData(campaignId, pubHandle!);

        const results = await Promise.all([
            user1SDK.user?.acceptCampaign(campaignId, pubHandle!),
            user2SDK.user?.acceptCampaign(campaignId, pubHandle!),
            user3SDK.user?.acceptCampaign(campaignId, pubHandle!)
        ]);
        results.forEach(result => {
            expect(result).toBeDefined();
            expect(result?.status).toEqual("STARTED"); // TODO should be "CONVERTED"
        });
    });

    it("should end campaign", async () => {
        const result = await advSdk.api?.endCampaign({campaignId});
        expect(result).toBeDefined();
        console.log('-- end singature: ', result.signature);

        const preBalances = await Promise.all([
            loadBalances(new PublicKey(user1SDK.user?.publicKey!)), 
            loadBalances(new PublicKey(user2SDK.user?.publicKey!)),
            loadBalances(new PublicKey(user3SDK.user?.publicKey!)),
        ]);

        await triggerUserPayouts();

        const postBalances = await Promise.all([
            loadBalances(new PublicKey(user1SDK.user?.publicKey!)), 
            loadBalances(new PublicKey(user2SDK.user?.publicKey!)),
            loadBalances(new PublicKey(user3SDK.user?.publicKey!)),
        ]);
        
        let payouts = 0;
        for (let i = 0; i < 3; i++) {
            if (postBalances[i].spl === (raffle1Winner.asymmetricRewards![0].amount + preBalances[i].spl)) {
                payouts++;
            }
        }
        expect(payouts).toBe(raffle1Winner.asymmetricRewards!.length);
    });

    // TODO add test for multiple raffle winners

    // TODO add tests for start finish restrictions

    // TODO add test for one conversion with raffle, end -> run raffle

});