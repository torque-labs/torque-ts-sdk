import { Keypair } from "@solana/web3.js";
import { airdrop, connection } from "../helper";
import { TorqueClient } from "@/client";

describe("INIT PUBLISHER", () => {
  const newUser = Keypair.generate();
  const torque = new TorqueClient({
    signer: newUser
  });
  beforeAll(async () => {
    await airdrop(connection, newUser.publicKey);
  });

  it("should create a publisher account", async () => {
    const result = await torque.initPublisher(newUser);
    expect(result).toBeDefined();
  });

  it("should not create a publisher account if already exists", async () => {
    const result = await torque.initPublisher(newUser);
    expect(result).toBeUndefined();
  });
});