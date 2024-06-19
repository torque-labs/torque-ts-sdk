const TORQUE_API_URL = process.env.TORQUE_API_URL ?? 'https://api.torque.so';
const TORQUE_APP_URL = process.env.TORQUE_APP_URL ?? 'https://app.torque.so';
const TORQUE_FUNCTIONS_URL = process.env.TORQUE_FUNCTIONS_URL ?? 'https://0tvum434ha.execute-api.us-east-1.amazonaws.com/Prod';
const TORQUE_SHARE_URL = `${TORQUE_APP_URL}/share`;
const TORQUE_API_ROUTES = {
    audiences: '/audiences',
    audienceBuilder: `/audiences/builder`,
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
    tokens: '/tokens',
    transactions: {
        build: '/tx/build',
        execute: '/tx/execute',
    },
    userCampaigns: '/users/campaigns',
    users: '/users',
    usersOffers: '/offers',
};
const TORQUE_FUNCTIONS_ROUTES = {
    audience: {
        build: '/build',
        verify: '/verify',
    },
};
export { TORQUE_API_URL, TORQUE_SHARE_URL, TORQUE_API_ROUTES, TORQUE_FUNCTIONS_ROUTES, TORQUE_FUNCTIONS_URL, };
//# sourceMappingURL=torque.js.map