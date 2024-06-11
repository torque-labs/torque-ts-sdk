const TORQUE_API_URL = process.env.TORQUE_API_URL ?? 'https://api.torque.so';
// const TORQUE_API_URL = 'http://localhost:3001';
// const TORQUE_APP_URL = process.env.TORQUE_APP_URL ?? 'https://app.torque.so';
const TORQUE_APP_URL = 'http://localhost:3000';
const TORQUE_FUNCTIONS_URL = process.env.TORQUE_FUNCTIONS_URL ?? "https://0tvum434ha.execute-api.us-east-1.amazonaws.com/Prod";

const TORQUE_SHARE_URL = `${TORQUE_APP_URL}/share`;

const TORQUE_API_ROUTES = {
  audiences: `${TORQUE_API_URL}/audiences`,
  audienceBuilder: `${TORQUE_API_URL}/audiences/builder`,
  campaigns: `${TORQUE_API_URL}/campaigns`,
  identify: `${TORQUE_API_URL}/identify`,
  journey: `${TORQUE_API_URL}/journey`,
  links: `${TORQUE_API_URL}/links`,
  publishers: `${TORQUE_API_URL}/publishers`,
  share: `${TORQUE_API_URL}/share`,
  users: `${TORQUE_API_URL}/users`,
  userCampaigns: `${TORQUE_API_URL}/users/campaigns`,
  currentUser: `${TORQUE_API_URL}/users/me`,
  login: `${TORQUE_API_URL}/login`,
  leaderboards: `${TORQUE_API_URL}/leaderboards`,
  raffle: `${TORQUE_API_URL}/asymmetricReward`,
  transactions: {
    build: `${TORQUE_API_URL}/tx/build`,
    execute: `${TORQUE_API_URL}/tx/execute`,
  },
};

const TORQUE_FUNCTIONS_ROUTES = {
  audience: {
    build: `${TORQUE_FUNCTIONS_URL}/build`,
    verify: `${TORQUE_FUNCTIONS_URL}/verify`,
  },
};

export { TORQUE_API_URL, TORQUE_SHARE_URL, TORQUE_API_ROUTES, TORQUE_FUNCTIONS_ROUTES, TORQUE_FUNCTIONS_URL };
