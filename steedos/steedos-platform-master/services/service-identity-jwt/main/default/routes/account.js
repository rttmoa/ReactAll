"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Account = void 0;
const tslib_1 = require("tslib");
const accounts_1 = require("@steedos/accounts");
const requestIp = require("request-ip");
const objectql_1 = require("@steedos/objectql");
const getUserAgent = (req) => {
    let userAgent = req.headers['user-agent'] || '';
    if (req.headers['x-ucbrowser-ua']) {
        userAgent = req.headers['x-ucbrowser-ua'];
    }
    return userAgent;
};
class Account {
    static ssoLogin(req, res, options = { user: null, err: null, redirect: true, accessToken: null }) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            let { user, err } = options;
            if (err || !user) {
                (0, objectql_1.getSteedosSchema)().broker.logger.error(`oidc sso login error: ${err}`);
                return res.redirect("/api/global/auth/oidc/error-callback");
            }
            let userAgent = getUserAgent(req) || '';
            const ip = requestIp.getClientIp(req);
            let logout_other_clients = false;
            let login_expiration_in_days = null;
            let phone_logout_other_clients = false;
            let phone_login_expiration_in_days = null;
            let space = null;
            const userProfile = yield accounts_1.accountsServer.getUserProfile(user.id);
            if (userProfile) {
                logout_other_clients = userProfile.logout_other_clients || false;
                login_expiration_in_days = userProfile.login_expiration_in_days;
                phone_logout_other_clients =
                    userProfile.phone_logout_other_clients || false;
                phone_login_expiration_in_days =
                    userProfile.phone_login_expiration_in_days;
                space = userProfile.space;
            }
            const loginResult = yield accounts_1.accountsServer.loginWithUser(user, Object.assign({}, {
                ip,
                userAgent
            }, {
                logout_other_clients,
                login_expiration_in_days,
                phone_logout_other_clients,
                phone_login_expiration_in_days,
                space,
                provider: 'jwt',
            }));
            (0, accounts_1.setAuthCookies)(req, res, loginResult.user._id, loginResult.token, loginResult.tokens.accessToken);
            if (options.redirect) {
                res.redirect(`/accounts/a/?uid=${loginResult.user._id}`);
            }
            else {
                return Object.assign({}, loginResult, { space: space });
            }
        });
    }
}
exports.Account = Account;
