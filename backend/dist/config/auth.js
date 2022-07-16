"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var secret_key = process.env.SECRET_KEY_BYCRIPT;
exports.default = {
    jwt: {
        secret: secret_key,
        expiresIn: '1d'
    },
    jwtMobile: {
        secret: secret_key,
        expiresIn: '365d'
    }
};
