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
import {  getAssociatedTokenAddress } from '@solana/spl-token';
import { TORQUE_API_URL, TORQUE_FUNCTIONS_URL } from '../../src/constants';

export const connection = new Connection("https://api.devnet.solana.com");

export const TEST_USER_PATHS = {
    advertiser1: "./test/utils/keys/advertiser1.json",
    advertiser2: "./test/utils/keys/advertiser2.json",
    publisher1: "./test/utils/keys/publisher1.json",
    publisher2: "./test/utils/keys/publisher2.json",
    user1: "./test/utils/keys/user1.json",
    user2: "./test/utils/keys/user2.json",
    user3: "./test/utils/keys/user3.json",
    airdropper: "./test/utils/keys/airdropper.json",
}
export const CAMPAIGN_RENT_COST = LAMPORTS_PER_SOL * 0.00405072;
export const GAS_COST = LAMPORTS_PER_SOL * 0.0000101; 
export const TOKEN_ACCOUNT_RENT_COST = LAMPORTS_PER_SOL * 0.00203928;
export const TEST_SPL = new PublicKey('6xhS7X4J3AyRz14Rkj2nRYoCBGirhr3CHwLQRE79fmzQ'); // airdropper is auth

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

export type Balances = {
    sol: number,
    spl: number
}
export const loadBalances = async (walletAddress: PublicKey) => {
    let spl:number;
    try {
        const associatedTokenAddress = await getAssociatedTokenAddress(
            TEST_SPL,
            walletAddress
        );
        const tokenAccountInfo = await connection.getTokenAccountBalance(associatedTokenAddress, "processed");
        spl = tokenAccountInfo.value.uiAmount ?? 0;
    } catch (e) {
        spl = 0;
    }
    const sol = await connection.getBalance(walletAddress, "processed");
    return {
        sol,
        spl
    } as Balances;
};

export const triggerUserPayouts = async () => {
    const result = await fetch(`${TORQUE_API_URL}/users/payout`, {
        method: "GET",
        headers: {
            "x-torque-api-key": process.env.TORQUE_API_KEY as string
        },
        redirect: "follow"
    }).then((response) => response.json());
    if (result.status !== "SUCCESS") {
        throw new Error("Payouts failed");
    }
    console.log('-- Payouts txs: ', result.data.signatures);
    return result.data.signatures;
}

export const sendShyftEvent = async (event: any, walletAddress: string) => {
    console.log("--- walletAddress", walletAddress);
    event.fee_payer = walletAddress;
    event.signers[0] = walletAddress;
    const result = await fetch(`${TORQUE_FUNCTIONS_URL}/shyft`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'x-api-key': process.env.SHYFT_API_KEY as string,
        },
        body: JSON.stringify(event)
    }).then(res => res.json());
    console.log('-- send event: ', result);
    return result;
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