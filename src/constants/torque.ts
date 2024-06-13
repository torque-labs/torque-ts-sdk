const TORQUE_API_ROUTES = {
  audiences: '/audiences',
  audiencesCustom: '/audiences/custom',
  campaigns: '/campaigns',
  currentUser: '/users/me',
  identify: '/identify',
  journey: '/journey',
  leaderboards: '/leaderboards',
  links: '/links',
  login: '/login',
  publishers: '/publishers',
  raffle: '/asymmetricReward',
  share: '/share',
  transactions: {
    build: '/tx/build',
    execute: '/tx/execute',
  },
  userCampaigns: '/users/campaigns',
  users: '/users',
};

const TORQUE_FUNCTIONS_ROUTES = {
  audience: {
    build: '/build',
    verify: '/verify',
  },
};

export { TORQUE_API_ROUTES, TORQUE_FUNCTIONS_ROUTES };
