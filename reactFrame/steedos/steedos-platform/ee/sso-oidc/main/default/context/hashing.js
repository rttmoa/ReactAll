"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.newid = exports.compare = exports.hash = void 0;
const tslib_1 = require("tslib");
const bcrypt = require("bcryptjs");
const env = require("./environment");
const { v4 } = require("uuid");
const SALT_ROUNDS = env.SALT_ROUNDS || 10;
const hash = (data) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const salt = yield bcrypt.genSalt(SALT_ROUNDS);
    return bcrypt.hash(data, salt);
});
exports.hash = hash;
const compare = (data, encrypted) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    return bcrypt.compare(data, encrypted);
});
exports.compare = compare;
const newid = function () {
    return v4().replace(/-/g, "");
};
exports.newid = newid;
