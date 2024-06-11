import fs from 'fs';
import { 
    Connection, 
    LAMPORTS_PER_SOL, 
    PublicKey,
    Keypair,
    Transaction,
    SystemProgram,
    sendAndConfirmTransaction,
} from "@solana/web3.js";
import { TorqueSDK } from "../../src/classes/sdk";
import exp from 'constants';

export const connection = new Connection("https://api.devnet.solana.com");

export const TEST_USER_PATHS = {
    advertiser1: "./test/utils/keys/advertiser1.json",
    advertiser2: "./test/utils/keys/advertiser2.json",
    publisher1: "./test/utils/keys/publisher1.json",
    publisher2: "./test/utils/keys/publisher2.json",
    user1: "./test/utils/keys/user1.json",
    user2: "./test/utils/keys/user2.json",
    airdropper: "./test/utils/keys/airdropper.json",
}

export const airdrop = async (walletAddress: PublicKey, amount = (LAMPORTS_PER_SOL / 100)) => {
    const airdropper = loadCliWallet(TEST_USER_PATHS.airdropper);
    const tx = new Transaction().add(
        SystemProgram.transfer({
            fromPubkey: airdropper.publicKey,
            toPubkey: walletAddress,
            lamports: amount,
        }),
    );
    const signature = await sendAndConfirmTransaction(
        connection, 
        tx, 
        [airdropper], 
        { commitment: 'confirmed' }
    );
    console.log(`-- Airdropped to ${walletAddress} with ${amount} lamports`);
    return signature;
}

export const loadCliWallet = (filepath: string) => {
    const data = fs.readFileSync(filepath);
    return Keypair.fromSecretKey(new Uint8Array(JSON.parse(data.toString())));
}

export const loadBalances = async (walletAddress: PublicKey | string) => {
    const response = await fetch(process.env.HELIUS_RPC_URL as string, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
            "jsonrpc": "2.0",
            "id": "helius-test",
            "method": "searchAssets",
            "params": {
                "ownerAddress": walletAddress.toString(),
                "tokenType": "all",
            }
        }),
    });
    const data = await response.json();
    
    if (!data.result) {
        throw new Error("No data returned from Helius RPC");
    }
    console.log(data.result);

    return data.result;
};

export const initSdk = async (
    path: string,
    apiKey?: string,
    publisherHandle?: string,
) => {
    const wallet = loadCliWallet(path);
    const sdk = new TorqueSDK({
        signer: wallet,
        apiKey,
        publisherHandle,
    });
    return sdk;
}



/** CAMPAIGNS
 * create a new campaign
 * end campaign
 * draw asymm winners
 */

/** PUBLISHERS
 * init publisher
 * withdraw rewards
 */

/** USER JOURNEY
 * audience validation
 * click
 * action: [swap, etc...]
 */

/** AUDIENCES
 * crud
 */

/** DEVNET TEST INVARIANTS
 * test advertisers: 2
 * test publishers: 2
 * test users: 2
 * ongoing campaigns: 
 *     - spl / sol payouts
 *     - [p, u, pu, a, apu]
 */