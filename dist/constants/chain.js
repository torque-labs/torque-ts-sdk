"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.torquePubkey = exports.JUP_TOKEN_LIST = exports.SOLANA_NETWORK = exports.TORQUE_PROGRAM_ID = exports.PUBLISHER_ACCOUNT_SIZE = void 0;
const web3_js_1 = require("@solana/web3.js");
/**
 * Chain constants
 */
const PUBLISHER_ACCOUNT_SIZE = 41;
exports.PUBLISHER_ACCOUNT_SIZE = PUBLISHER_ACCOUNT_SIZE;
// const SOLANA_NETWORK = 'mainnet-beta';
const SOLANA_NETWORK = 'devnet';
exports.SOLANA_NETWORK = SOLANA_NETWORK;
const TORQUE_PROGRAM_ID = '7n4ZKkte28wrWxWWAUJJPzY3PWAbCeUFKJWXE1sZhXra';
exports.TORQUE_PROGRAM_ID = TORQUE_PROGRAM_ID;
const torquePubkey = new web3_js_1.PublicKey(TORQUE_PROGRAM_ID);
exports.torquePubkey = torquePubkey;
const JUP_TOKEN_LIST = 'https://token.jup.ag/strict';
exports.JUP_TOKEN_LIST = JUP_TOKEN_LIST;
