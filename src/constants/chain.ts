import { PublicKey } from '@solana/web3.js';

/**
 * Chain constants
 */
const PUBLISHER_ACCOUNT_SIZE = 41;
// const SOLANA_NETWORK = 'mainnet-beta';
const SOLANA_NETWORK = 'devnet';
const TORQUE_PROGRAM_ID = '7n4ZKkte28wrWxWWAUJJPzY3PWAbCeUFKJWXE1sZhXra';
const torquePubkey = new PublicKey(TORQUE_PROGRAM_ID);

export { PUBLISHER_ACCOUNT_SIZE, TORQUE_PROGRAM_ID, SOLANA_NETWORK, torquePubkey };
