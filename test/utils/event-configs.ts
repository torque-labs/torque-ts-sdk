import { PublicKey } from "@solana/web3.js";

/**SUPPORTED SYFT EVENTS**/
type NFT_LIST_CANCEL = {
    type: 'NFT_LIST_CANCEL',
    info: {
        seller: string;
        marketplace: string;
        nft_address: string;
        price: number;
    }
}
type SWAP = {
    type: 'SWAP';
    info: {
        swapper: string;
        tokens_swapped: {
            in: {
                token_address: string;
                name: string;
                symbol: string;
                image_uri: string;
                amount: number;
            };
            out: {
                token_address: string;
                name: string;
                symbol: string;
                image_uri: string;
                amount: number;
            };
        };
        swaps: [
            {
                liquidity_pool_address: string;
                name: string;
                source: string;
            }
        ];
    };
}

export const BONK_SWAP_EVENT = {
        "timestamp": "2024-05-10T19:08:30.000Z",
        "fee": 0.000006169,
        "fee_payer": "EYcJb2fGccgG8ChVrdUzC9Q6RfFEgbVfixCpQ4tctrzT",
        "signers": [
            "EYcJb2fGccgG8ChVrdUzC9Q6RfFEgbVfixCpQ4tctrzT"
        ],
        "signatures": [
            "CG4smuuui2f7tYKem1kzDbqFyqEL9Vc4FN1quWMdGzMRiWerJL6Eb2BZjdMRFgordbx7owA4TGXg2bn7zUAvtJ8"
        ],
        "protocol": {
            "address": "JUP6LkbZbjS1jKKwapdHNy74zcZ3tLUZoi5QNyVTaV4",
            "name": "JUPITER_V_6"
        },
        "type": "SWAP",
        "status": "Success",
        "actions": [
            {
                "info": {
                    "swapper": "EYcJb2fGccgG8ChVrdUzC9Q6RfFEgbVfixCpQ4tctrzT",
                    "tokens_swapped": {
                        "in": {
                            "token_address": "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
                            "name": "USD Coin",
                            "symbol": "USDC",
                            "image_uri": "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v/logo.png",
                            "amount": 0.022607,
                            "amount_raw": 22607
                        },
                        "out": {
                            "token_address": "DezXAZ8z7PnrnRJjz3wXBoRgixCa6xjnB7YaB1pPB263",
                            "name": "Bonk",
                            "symbol": "BONK",
                            "image_uri": "https://assets.coingecko.com/coins/images/28600/large/bonk.jpg?1696527587",
                            "amount": 1000,
                            "amount_raw": 100000000
                        }
                    },
                    "swaps": [
                        {
                            "liquidity_pool_address": "8sLbNZoA1cfnvMJLPfp98ZLAnFSYCFApfJKMbiXNLwxj",
                            "name": "USDC-SOL",
                            "source": "Raydium CLMM",
                            "in": {
                                "token_address": "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
                                "name": "USD Coin",
                                "symbol": "USDC",
                                "image_uri": "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v/logo.png",
                                "amount": 0.022607,
                                "amount_raw": 22607
                            },
                            "out": {
                                "token_address": "So11111111111111111111111111111111111111112",
                                "name": "Wrapped SOL",
                                "symbol": "SOL",
                                "image_uri": "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/So11111111111111111111111111111111111111112/logo.png",
                                "amount": 0.000152888,
                                "amount_raw": 152888
                            }
                        },
                        {
                            "liquidity_pool_address": "2AXXcN6oN9bBT5owwmTH53C7QHUXvhLeu718Kqt8rvY2",
                            "name": "SOL-RAY",
                            "source": "Raydium CLMM",
                            "in": {
                                "token_address": "So11111111111111111111111111111111111111112",
                                "name": "Wrapped SOL",
                                "symbol": "SOL",
                                "image_uri": "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/So11111111111111111111111111111111111111112/logo.png",
                                "amount": 0.000152888,
                                "amount_raw": 152888
                            },
                            "out": {
                                "token_address": "4k3Dyjzvzp8eMZWUXbBCjEvwSkkk59S5iCNLY3QrkX6R",
                                "name": "Raydium",
                                "symbol": "RAY",
                                "image_uri": "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/4k3Dyjzvzp8eMZWUXbBCjEvwSkkk59S5iCNLY3QrkX6R/logo.png",
                                "amount": 0.013454,
                                "amount_raw": 13454
                            }
                        },
                        {
                            "liquidity_pool_address": "9GEwNPueWLTBYbQYZ6nETgnzjCnChtjpSt1YPNBaGSbW",
                            "name": "RAY-BONK",
                            "source": "Raydium",
                            "in": {
                                "token_address": "4k3Dyjzvzp8eMZWUXbBCjEvwSkkk59S5iCNLY3QrkX6R",
                                "name": "Raydium",
                                "symbol": "RAY",
                                "image_uri": "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/4k3Dyjzvzp8eMZWUXbBCjEvwSkkk59S5iCNLY3QrkX6R/logo.png",
                                "amount": 0.013455,
                                "amount_raw": 13455
                            },
                            "out": {
                                "token_address": "DezXAZ8z7PnrnRJjz3wXBoRgixCa6xjnB7YaB1pPB263",
                                "name": "Bonk",
                                "symbol": "BONK",
                                "image_uri": "https://assets.coingecko.com/coins/images/28600/large/bonk.jpg?1696527587",
                                "amount": 1000,
                                "amount_raw": 100000000
                            }
                        }
                    ],
                    "slippage_in_percent": 0.5,
                    "quoted_out_amount": 100000000,
                    "slippage_paid": 0
                },
                "source_protocol": {
                    "address": "JUP6LkbZbjS1jKKwapdHNy74zcZ3tLUZoi5QNyVTaV4",
                    "name": "JUPITER_V_6"
                },
                "type": "SWAP"
            },
            {
                "info": {
                    "amount": 0.022607,
                    "amount_raw": 22607,
                    "receiver": "DSN3j1ykL3obAVNv7ZX49VsFCPe4LqzxHnmtLiPwY6xg",
                    "sender": "EYcJb2fGccgG8ChVrdUzC9Q6RfFEgbVfixCpQ4tctrzT",
                    "receiver_associated_account": "FbruxBVHi463Agw2B3Vy27cBkGnEN5g1f4NcHe3REXfe",
                    "token_address": "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v"
                },
                "source_protocol": {
                    "address": "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA",
                    "name": ""
                },
                "type": "TOKEN_TRANSFER",
                "parent_protocol": "JUP6LkbZbjS1jKKwapdHNy74zcZ3tLUZoi5QNyVTaV4"
            },
            {
                "info": {
                    "amount": 0.022607,
                    "amount_raw": 22607,
                    "sender": "DSN3j1ykL3obAVNv7ZX49VsFCPe4LqzxHnmtLiPwY6xg",
                    "receiver_associated_account": "6mK4Pxs6GhwnessH7CvPivqDYauiHZmAdbEFDpXFk9zt",
                    "receiver": "8sLbNZoA1cfnvMJLPfp98ZLAnFSYCFApfJKMbiXNLwxj",
                    "token_address": "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v"
                },
                "source_protocol": {
                    "address": "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA",
                    "name": ""
                },
                "type": "TOKEN_TRANSFER",
                "parent_protocol": "JUP6LkbZbjS1jKKwapdHNy74zcZ3tLUZoi5QNyVTaV4"
            },
            {
                "info": {
                    "amount": 0.000152888,
                    "amount_raw": 152888,
                    "sender": "8sLbNZoA1cfnvMJLPfp98ZLAnFSYCFApfJKMbiXNLwxj",
                    "receiver_associated_account": "EUvpCGh4qiMtq9wKgp28f9Bjv5Xz2WJqrM83XmYAqkEq",
                    "receiver": "DSN3j1ykL3obAVNv7ZX49VsFCPe4LqzxHnmtLiPwY6xg",
                    "token_address": "So11111111111111111111111111111111111111112"
                },
                "source_protocol": {
                    "address": "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA",
                    "name": ""
                },
                "type": "TOKEN_TRANSFER",
                "parent_protocol": "JUP6LkbZbjS1jKKwapdHNy74zcZ3tLUZoi5QNyVTaV4"
            },
            {
                "info": {
                    "amount": 0.000152888,
                    "amount_raw": 152888,
                    "sender": "DSN3j1ykL3obAVNv7ZX49VsFCPe4LqzxHnmtLiPwY6xg",
                    "receiver_associated_account": "9Jgp8NpqEDFd5d3RQPfuRY7gMgRFByTNFmi68Ph1yvVb",
                    "receiver": "2AXXcN6oN9bBT5owwmTH53C7QHUXvhLeu718Kqt8rvY2",
                    "token_address": "So11111111111111111111111111111111111111112"
                },
                "source_protocol": {
                    "address": "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA",
                    "name": ""
                },
                "type": "TOKEN_TRANSFER",
                "parent_protocol": "JUP6LkbZbjS1jKKwapdHNy74zcZ3tLUZoi5QNyVTaV4"
            },
            {
                "info": {
                    "amount": 0.013454,
                    "amount_raw": 13454,
                    "sender": "2AXXcN6oN9bBT5owwmTH53C7QHUXvhLeu718Kqt8rvY2",
                    "receiver_associated_account": "BepjpTym2C5xabJircPWSu3QnqZkcK98uEEwBepLLnh3",
                    "receiver": "DSN3j1ykL3obAVNv7ZX49VsFCPe4LqzxHnmtLiPwY6xg",
                    "token_address": "4k3Dyjzvzp8eMZWUXbBCjEvwSkkk59S5iCNLY3QrkX6R"
                },
                "source_protocol": {
                    "address": "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA",
                    "name": ""
                },
                "type": "TOKEN_TRANSFER",
                "parent_protocol": "JUP6LkbZbjS1jKKwapdHNy74zcZ3tLUZoi5QNyVTaV4"
            },
            {
                "info": {
                    "amount": 0.013455,
                    "amount_raw": 13455,
                    "sender": "DSN3j1ykL3obAVNv7ZX49VsFCPe4LqzxHnmtLiPwY6xg",
                    "receiver_associated_account": "88u1zWm5t5cFTndgY2rcrATTsJAtCFiPFr8Qjp6ibbV1",
                    "receiver": "5Q544fKrFoe6tsEbD7S8EmxGTJYAKtTVhAW5Q5pge4j1",
                    "token_address": "4k3Dyjzvzp8eMZWUXbBCjEvwSkkk59S5iCNLY3QrkX6R"
                },
                "source_protocol": {
                    "address": "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA",
                    "name": ""
                },
                "type": "TOKEN_TRANSFER",
                "parent_protocol": "JUP6LkbZbjS1jKKwapdHNy74zcZ3tLUZoi5QNyVTaV4"
            },
            {
                "info": {
                    "amount": 1000,
                    "amount_raw": 100000000,
                    "sender": "5Q544fKrFoe6tsEbD7S8EmxGTJYAKtTVhAW5Q5pge4j1",
                    "receiver_associated_account": "3u4zRYPmw8d8zJh2yUA86F8KDHPaEZTSb4JZXS9rJrmt",
                    "receiver": "DSN3j1ykL3obAVNv7ZX49VsFCPe4LqzxHnmtLiPwY6xg",
                    "token_address": "DezXAZ8z7PnrnRJjz3wXBoRgixCa6xjnB7YaB1pPB263"
                },
                "source_protocol": {
                    "address": "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA",
                    "name": ""
                },
                "type": "TOKEN_TRANSFER",
                "parent_protocol": "JUP6LkbZbjS1jKKwapdHNy74zcZ3tLUZoi5QNyVTaV4"
            },
            {
                "info": {
                    "amount": 1000,
                    "amount_raw": 100000000,
                    "receiver": "EYcJb2fGccgG8ChVrdUzC9Q6RfFEgbVfixCpQ4tctrzT",
                    "sender": "DSN3j1ykL3obAVNv7ZX49VsFCPe4LqzxHnmtLiPwY6xg",
                    "receiver_associated_account": "8wUdxTQpeTKv3h8ArNFt5C3Vcgf2XCiSdgJ1FR3brm7h",
                    "token_address": "DezXAZ8z7PnrnRJjz3wXBoRgixCa6xjnB7YaB1pPB263"
                },
                "source_protocol": {
                    "address": "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA",
                    "name": ""
                },
                "type": "TOKEN_TRANSFER",
                "parent_protocol": "JUP6LkbZbjS1jKKwapdHNy74zcZ3tLUZoi5QNyVTaV4"
            }
        ],
        "events": [
            {
                "data": {
                    "amm": "CAMMCzo5YL8w4VFF8KVHrK22GGUsp5VTaW7grrKgrWqK",
                    "inputMint": "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
                    "inputAmount": 22607,
                    "outputMint": "So11111111111111111111111111111111111111112",
                    "outputAmount": 152888
                },
                "name": "SwapEvent"
            },
            {
                "data": {
                    "amm": "CAMMCzo5YL8w4VFF8KVHrK22GGUsp5VTaW7grrKgrWqK",
                    "inputMint": "So11111111111111111111111111111111111111112",
                    "inputAmount": 152888,
                    "outputMint": "4k3Dyjzvzp8eMZWUXbBCjEvwSkkk59S5iCNLY3QrkX6R",
                    "outputAmount": 13454
                },
                "name": "SwapEvent"
            },
            {
                "data": {
                    "amm": "675kPX9MHTjS2zt1qfr1NYHuzeLXfQM9H24wFSUt1Mp8",
                    "inputMint": "4k3Dyjzvzp8eMZWUXbBCjEvwSkkk59S5iCNLY3QrkX6R",
                    "inputAmount": 13455,
                    "outputMint": "DezXAZ8z7PnrnRJjz3wXBoRgixCa6xjnB7YaB1pPB263",
                    "outputAmount": 100000000
                },
                "name": "SwapEvent"
            }
        ]
}
