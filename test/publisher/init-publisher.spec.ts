import { Keypair } from "@solana/web3.js";
import { airdrop } from "../utils/helper";
import { TorqueSDK } from "../../src/classes/sdk";

describe("INIT PUBLISHER", () => {
  const newUser = Keypair.generate();
  let sdk: TorqueSDK;
    beforeAll(async () => {
        sdk = new TorqueSDK({
            apiKey: newUser.publicKey.toString(),
        });
        await sdk.initialize(newUser);
        await sdk.user?.initializeUser();
        await airdrop(newUser.publicKey);
    });

  it("should create a publisher account", async () => {
    const result = await sdk.api?.initPublisher();
    expect(result).toBeDefined();
    const isPublisher = await sdk.user?.isPublisher();
    expect(isPublisher).toBeTruthy();
  });

  it("should not create a publisher account if already exists", async () => {
    try {
      await sdk.api?.initPublisher();
    } catch (error) {
      // TODOD how to check for error
      expect(error).toBeDefined();
    }
  });
});