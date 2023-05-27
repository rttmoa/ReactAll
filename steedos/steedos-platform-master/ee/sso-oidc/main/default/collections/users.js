"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const tslib_1 = require("tslib");
const objectql_1 = require("@steedos/objectql");
const context_1 = require("../context");
const space_users_1 = require("./space_users");
const context_2 = require("../context");
class User {
    static save(user, opts) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            let dbUser = yield User.findByEmail(user.email);
            if (!dbUser) {
                dbUser = yield (0, objectql_1.getObject)('users').directInsert({
                    _id: user._id,
                    steedos_id: user._id,
                    email: user.email,
                    email_verified: user.thirdPartyProfile.email_verified,
                    name: user.thirdPartyProfile.name,
                    locale: 'zh-cn',
                    created: new Date(),
                    modified: new Date()
                });
            }
            const spaceUser = yield space_users_1.SpaceUsers.findByUserId(dbUser._id);
            if (!spaceUser) {
                const tenantId = (0, context_1.getTenantId)();
                if (tenantId) {
                    const tenantConfig = yield (0, context_2.getTenantConfig)(tenantId);
                    if (tenantConfig.enable_register) {
                        yield space_users_1.SpaceUsers.insert(tenantId, dbUser._id, { user_accepted: true });
                    }
                }
            }
            return dbUser;
        });
    }
    static findByEmail(email) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const records = yield (0, objectql_1.getObject)('users').find({ filters: [['email', '=', email]] });
            if (records.length === 0) {
                return null;
            }
            else {
                return records[0];
            }
        });
    }
    static findById(id) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield (0, objectql_1.getObject)('users').findOne(id);
        });
    }
}
exports.User = User;
