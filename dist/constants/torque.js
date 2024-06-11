"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.TORQUE_FUNCTIONS_ROUTES = exports.TORQUE_API_ROUTES = exports.TORQUE_SHARE_URL = exports.TORQUE_API_URL = void 0;
// const TORQUE_API_URL = process.env.TORQUE_API_URL ?? 'https://api.torque.so';
var TORQUE_API_URL = 'http://localhost:3001';
exports.TORQUE_API_URL = TORQUE_API_URL;
// const TORQUE_APP_URL = process.env.TORQUE_APP_URL ?? 'https://app.torque.so';
var TORQUE_APP_URL = 'http://localhost:3000';
var TORQUE_FUNCTIONS_URL = (_a = process.env.TORQUE_FUNCTIONS_URL) !== null && _a !== void 0 ? _a : 'https://functions.torque.so';
var TORQUE_SHARE_URL = "".concat(TORQUE_APP_URL, "/share");
exports.TORQUE_SHARE_URL = TORQUE_SHARE_URL;
var TORQUE_API_ROUTES = {
    audiences: "".concat(TORQUE_API_URL, "/audiences"),
    campaigns: "".concat(TORQUE_API_URL, "/campaigns"),
    identify: "".concat(TORQUE_API_URL, "/identify"),
    journey: "".concat(TORQUE_API_URL, "/journey"),
    links: "".concat(TORQUE_API_URL, "/links"),
    publishers: "".concat(TORQUE_API_URL, "/publishers"),
    share: "".concat(TORQUE_API_URL, "/share"),
    users: "".concat(TORQUE_API_URL, "/users"),
    userCampaigns: "".concat(TORQUE_API_URL, "/users/campaigns"),
    currentUser: "".concat(TORQUE_API_URL, "/users/me"),
    login: "".concat(TORQUE_API_URL, "/login"),
    leaderboards: "".concat(TORQUE_API_URL, "/leaderboards"),
    raffle: "".concat(TORQUE_API_URL, "/asymmetricReward"),
    transactions: {
        build: "".concat(TORQUE_API_URL, "/tx/build"),
        execute: "".concat(TORQUE_API_URL, "/tx/execute"),
    },
};
exports.TORQUE_API_ROUTES = TORQUE_API_ROUTES;
var TORQUE_FUNCTIONS_ROUTES = {
    audience: {
        build: "".concat(TORQUE_FUNCTIONS_URL, "/build"),
        verify: "".concat(TORQUE_FUNCTIONS_URL, "/verify"),
    },
};
exports.TORQUE_FUNCTIONS_ROUTES = TORQUE_FUNCTIONS_ROUTES;
