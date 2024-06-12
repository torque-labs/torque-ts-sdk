declare const TORQUE_API_URL = "http://localhost:3001";
declare const TORQUE_SHARE_URL = "http://localhost:3000/share";
declare const TORQUE_API_ROUTES: {
    audiences: string;
    audiencesCustom: string;
    campaigns: string;
    currentUser: string;
    identify: string;
    journey: string;
    leaderboards: string;
    links: string;
    login: string;
    publishers: string;
    raffle: string;
    share: string;
    transactions: {
        build: string;
        execute: string;
    };
    userCampaigns: string;
    users: string;
};
declare const TORQUE_FUNCTIONS_ROUTES: {
    audience: {
        build: string;
        verify: string;
    };
};
export { TORQUE_API_URL, TORQUE_SHARE_URL, TORQUE_API_ROUTES, TORQUE_FUNCTIONS_ROUTES };
//# sourceMappingURL=torque.d.ts.map