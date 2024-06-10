import { Connection, LAMPORTS_PER_SOL, PublicKey } from "@solana/web3.js";

export const connection = new Connection("https://api.devnet.solana.com");

export const airdrop = async (connection: Connection, walletAddress: PublicKey) => {
    await connection.requestAirdrop(walletAddress, LAMPORTS_PER_SOL);
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