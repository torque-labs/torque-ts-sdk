const TORQUE_API_URL = process.env.TORQUE_API_URL ?? 'https://api.torque.so';
const TORQUE_APP_URL = process.env.TORQUE_APP_URL ?? 'https://app.torque.so';
const TORQUE_FUNCTIONS_URL = process.env.TORQUE_FUNCTIONS_URL ?? 'https://functions.torque.so';

// const TORQUE_API_URL = 'http://localhost:3001';
// const TORQUE_APP_URL = 'http://localhost:3000';

const TORQUE_SHARE_URL = `${TORQUE_APP_URL}/share`;

const TORQUE_API_ROUTES = {
  audiences: `${TORQUE_API_URL}/audiences`,
  audiencesCustom: `${TORQUE_API_URL}/audiences/custom`,
  campaigns: `${TORQUE_API_URL}/campaigns`,
  currentUser: `${TORQUE_API_URL}/users/me`,
  identify: `${TORQUE_API_URL}/identify`,
  journey: `${TORQUE_API_URL}/journey`,
  leaderboards: `${TORQUE_API_URL}/leaderboards`,
  links: `${TORQUE_API_URL}/links`,
  login: `${TORQUE_API_URL}/login`,
  publishers: `${TORQUE_API_URL}/publishers`,
  raffle: `${TORQUE_API_URL}/asymmetricReward`,
  share: `${TORQUE_API_URL}/share`,
  transactions: {
    build: `${TORQUE_API_URL}/tx/build`,
    execute: `${TORQUE_API_URL}/tx/execute`,
  },
  userCampaigns: `${TORQUE_API_URL}/users/campaigns`,
  users: `${TORQUE_API_URL}/users`,
};

const TORQUE_FUNCTIONS_ROUTES = {
  audience: {
    build: `${TORQUE_FUNCTIONS_URL}/build`,
    verify: `${TORQUE_FUNCTIONS_URL}/verify`,
  },
};

export { TORQUE_API_URL, TORQUE_SHARE_URL, TORQUE_API_ROUTES, TORQUE_FUNCTIONS_ROUTES };
