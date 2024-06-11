import { Keypair, PublicKey } from "@solana/web3.js";
import { TorqueSDK } from "../../src/classes/sdk";
import { clickRaffleCampaignSol, clickRaffleCampaignSpl } from "../utils/campaign-configs";
import { Balances, GAS_COST, TEST_SPL, TEST_USER_PATHS, airdrop, loadBalances, loadCliWallet, triggerUserPayouts } from "../utils/helper";


describe("CLICK CONVERSION", () => {
    let advertiserSdk: TorqueSDK, pub1SDK: TorqueSDK, user1SDK: TorqueSDK;
    let pub1Handle: string | null | undefined;
    const CLICK_RAFFLE_CAMPAIGN_SOL_ID = "clxahybv0002a13u3m52gykf9";
    const CLICK_RAFFLE_CAMPAIGN_SPL_ID = "clxapolfb002p3zp4imbiee66";
    beforeAll(async () => {
        advertiserSdk = new TorqueSDK({apiKey: "advertiser1"});
        pub1SDK = new TorqueSDK({apiKey: "publisher1"});

        const user1 = Keypair.generate();
        await airdrop(user1.publicKey, 1250000);
        user1SDK = new TorqueSDK({apiKey: user1.publicKey.toString()});

        await advertiserSdk.initialize(loadCliWallet(TEST_USER_PATHS.advertiser1)),
        await pub1SDK.initialize(loadCliWallet(TEST_USER_PATHS.publisher1)),
        await user1SDK.initialize(user1),

        pub1Handle = pub1SDK.user?.getUserHandle();
        await pub1SDK.user?.getSharedLinkData(CLICK_RAFFLE_CAMPAIGN_SOL_ID, pub1Handle!);
        await airdrop(new PublicKey(pub1SDK.user?.publicKey!), 1250000); 
    });

    describe("set up", () => {
        it.skip("should create publisher accounts", async () => {
            await airdrop(loadCliWallet(TEST_USER_PATHS.publisher1).publicKey);
            await airdrop(loadCliWallet(TEST_USER_PATHS.publisher2).publicKey);
            const pub1SDK = new TorqueSDK({
                apiKey: "publisher1",
            });
            await pub1SDK.initialize(loadCliWallet(TEST_USER_PATHS.publisher1));
            await pub1SDK.api?.initPublisher();
            let isPublisher = await pub1SDK.user?.isPublisher();
            expect(isPublisher).toBeTruthy();

            const pub2SDK = new TorqueSDK({
                apiKey: "publisher2",
            });
            await pub2SDK.initialize(loadCliWallet(TEST_USER_PATHS.publisher2));
            await pub2SDK.api?.initPublisher();
            isPublisher = await pub2SDK.user?.isPublisher();
            expect(isPublisher).toBeTruthy();
        });

        describe("SOL", () => {
            it.skip("should set up a click raffle campaign", async () => {
                const result = await advertiserSdk.api?.createCampaign(clickRaffleCampaignSol);
                expect(result).toBeDefined();
                console.log('-- create singature: ', result.signature);
            });
        });

        describe("SPL", () => {
            it.skip("should set up a click raffle campaign", async () => {
                await airdrop(new PublicKey(advertiserSdk.user?.publicKey!)); 
                const result = await advertiserSdk.api?.createCampaign(clickRaffleCampaignSpl);
                expect(result).toBeDefined();
                console.log('-- create singature: ', result.signature);
            });
        });
    });

    describe("SOL", () => {
        let preUser1Balance: Balances, prePub1Balance: Balances;
        beforeEach(async () => {
            [preUser1Balance, prePub1Balance] = await Promise.all([
                loadBalances(new PublicKey(user1SDK.user?.publicKey!)),
                loadBalances(new PublicKey(pub1SDK.user?.publicKey!)),
            ]);
        });

        it("should convert", async () => {
            const result = await user1SDK.user?.acceptCampaign(CLICK_RAFFLE_CAMPAIGN_SOL_ID, pub1Handle!);
            expect(result).toBeDefined();
            expect(result?.status).toEqual("STARTED"); 
        });

        it("should payout user", async () => {
            await triggerUserPayouts();
            const postUser1Balance = await loadBalances(new PublicKey(user1SDK.user?.publicKey!));
            expect(preUser1Balance.sol).toEqual(postUser1Balance.sol - clickRaffleCampaignSol.userPayoutPerConversion!);
        });

        it("should withdraw publisher rewards", async () => {
            const payout = await pub1SDK.user?.getMaxTransferableSol();
            expect(payout).toBeGreaterThanOrEqual(clickRaffleCampaignSol.publisherPayoutPerConversion!);

            const result = await pub1SDK.api?.payoutPublisher({token: PublicKey.default.toString(), amount: payout!});
            expect(result).toBeDefined();
            console.log('-- payout tx: ', result);

            const postPub1Balance = await loadBalances(new PublicKey(pub1SDK.user?.publicKey!));
            expect(postPub1Balance.sol).toEqual(prePub1Balance.sol - GAS_COST + payout!);
        });
    });

    describe.only("SPL", () => {
        let preUser1Balance: Balances, prePub1Balance: Balances;
        beforeEach(async () => {
            [preUser1Balance, prePub1Balance] = await Promise.all([
                loadBalances(new PublicKey(user1SDK.user?.publicKey!)),
                loadBalances(new PublicKey(pub1SDK.user?.publicKey!)),
            ]);
        });

        it("should convert", async () => {
            const result = await user1SDK.user?.acceptCampaign(CLICK_RAFFLE_CAMPAIGN_SPL_ID, pub1Handle!);
            expect(result).toBeDefined();
            expect(result?.status).toEqual("STARTED"); 
        });

        it("should payout user", async () => {
            await triggerUserPayouts();
            const postUser1Balance = await loadBalances(new PublicKey(user1SDK.user?.publicKey!));
            expect(preUser1Balance.spl).toEqual(postUser1Balance.spl - clickRaffleCampaignSpl.userPayoutPerConversion!);
        });

        it("should withdraw publisher rewards", async () => {
            const payout = await pub1SDK.user?.getMaxTransferableSpl(TEST_SPL);
            expect(payout).toBeGreaterThanOrEqual(clickRaffleCampaignSpl.publisherPayoutPerConversion!);

            const result = await pub1SDK.api?.payoutPublisher({token: TEST_SPL.toString(), amount: payout!});
            expect(result).toBeDefined();
            console.log('-- payout tx: ', result);

            const postPub1Balance = await loadBalances(new PublicKey(pub1SDK.user?.publicKey!));
            expect(postPub1Balance.spl).toEqual(prePub1Balance.spl + payout!);
            expect(postPub1Balance.sol).toEqual(prePub1Balance.sol - GAS_COST);
        });
    });
});