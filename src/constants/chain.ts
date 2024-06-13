import { PublicKey } from '@solana/web3.js';

/**
 * Chain constants
 */
const PUBLISHER_ACCOUNT_SIZE = 41;
const TORQUE_PROGRAM_ID = '7n4ZKkte28wrWxWWAUJJPzY3PWAbCeUFKJWXE1sZhXra';
const torquePubkey = new PublicKey(TORQUE_PROGRAM_ID);

const JUP_TOKEN_LIST = 'https://token.jup.ag/strict';

export { PUBLISHER_ACCOUNT_SIZE, TORQUE_PROGRAM_ID, JUP_TOKEN_LIST, torquePubkey };
