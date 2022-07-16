"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsonwebtoken_1 = require("jsonwebtoken");
var auth_1 = __importDefault(require("../config/auth"));
var AppError_1 = __importDefault(require("../errors/AppError"));
function ensureAuthenticated(request, response, next) {
    //Validacao do Token
    var authHeader = request.headers.authorization;
    if (!authHeader) {
        throw new AppError_1.default(' Token Invalido ', 401);
    }
    // bearer token
    var _a = authHeader.split(' '), token = _a[1];
    try {
        var decoded = jsonwebtoken_1.verify(token, auth_1.default.jwt.secret);
        var _b = decoded, id = _b.id, license_at = _b.license_at;
        //console.log(new Date(license_at));
        //console.log(new Date());
        if (new Date(license_at) <= new Date()) {
            throw new AppError_1.default('Expired License', 403);
        }
        request.user = id;
        return next();
    }
    catch (error) {
        if ((error === null || error === void 0 ? void 0 : error.statusCode) === 403) {
            throw new AppError_1.default(error === null || error === void 0 ? void 0 : error.message, error === null || error === void 0 ? void 0 : error.statusCode);
        }
        throw new AppError_1.default('Invalid JWT Token', 401);
    }
}
exports.default = ensureAuthenticated;
