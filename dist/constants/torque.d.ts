declare const TORQUE_API_URL = "http://localhost:3001";
declare const TORQUE_SHARE_URL = "http://localhost:3000/share";
declare const TORQUE_API_ROUTES: {
    audiences: string;
    campaigns: string;
    identify: string;
    journey: string;
    links: string;
    publishers: string;
    share: string;
    users: string;
    userCampaigns: string;
    currentUser: string;
    login: string;
    leaderboards: string;
    raffle: string;
    transactions: {
        build: string;
        execute: string;
    };
};
declare const TORQUE_FUNCTIONS_ROUTES: {
    audience: {
        build: string;
        verify: string;
    };
};
export { TORQUE_API_URL, TORQUE_SHARE_URL, TORQUE_API_ROUTES, TORQUE_FUNCTIONS_ROUTES };
