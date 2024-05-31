const TORQUE_API_URL = process.env.TORQUE_API_URL ?? "https://api.torque.so";
const TORQUE_APP_URL = process.env.TORQUE_APP_URL ?? "https://app.torque.so";

const TORQUE_PROGRAM_PUBKEY = "7n4ZKkte28wrWxWWAUJJPzY3PWAbCeUFKJWXE1sZhXra";

const TORQUE_SHARE_URL = `${TORQUE_APP_URL}/share`;

const TORQUE_API_ROUTES = {
  audiences: `${TORQUE_API_URL}/audiences`,
  campaigns: `${TORQUE_API_URL}/campaigns`,
  identify: `${TORQUE_API_URL}/identify`,
  journey: `${TORQUE_API_URL}/journey`,
  links: `${TORQUE_API_URL}/links`,
  publishers: `${TORQUE_API_URL}/publishers`,
  share: `${TORQUE_API_URL}/share`,
  users: `${TORQUE_API_URL}/users`,
  userCampaigns: `${TORQUE_API_URL}/users/campaigns`,
  verify: `${TORQUE_API_URL}/verify`,
  transactions: {
    build: `${TORQUE_API_URL}/tx/build`,
    execute: `${TORQUE_API_URL}/tx/execute`,
  },
};

const PUBLISHER_ACCOUNT_SIZE = 41;

const SOLANA_NETWORK = "devnet";

export {
  TORQUE_API_URL,
  TORQUE_SHARE_URL,
  TORQUE_API_ROUTES,
  PUBLISHER_ACCOUNT_SIZE,
  TORQUE_PROGRAM_PUBKEY,
  SOLANA_NETWORK,
};
