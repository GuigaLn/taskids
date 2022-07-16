"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var multer_1 = __importDefault(require("multer"));
var upload_1 = __importDefault(require("../config/upload"));
var CreateRewardsService_1 = __importDefault(require("../services/Reward/CreateRewardsService"));
var ListRewardsService_1 = __importDefault(require("../services/Reward/ListRewardsService"));
var DetailRewardsService_1 = __importDefault(require("../services/Reward/DetailRewardsService"));
var DeleteRewardsService_1 = __importDefault(require("../services/Reward/DeleteRewardsService"));
var ensureAuthenticated_1 = __importDefault(require("../middlewares/ensureAuthenticated"));
var FileUtils_1 = require("../services/Firebase/FileUtils");
var rewardsRouter = express_1.Router();
var upload = multer_1.default(upload_1.default);
rewardsRouter.use(ensureAuthenticated_1.default);
rewardsRouter.post('/', upload.single('image'), function (Request, Response) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        FileUtils_1.uploadImage(Request, 'images/', function (cb) { return __awaiter(void 0, void 0, void 0, function () {
            var _a, title, description, value, user_id, createRewards, reward;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!(cb !== null)) return [3 /*break*/, 2];
                        _a = Request.body, title = _a.title, description = _a.description, value = _a.value;
                        user_id = Request.user;
                        createRewards = new CreateRewardsService_1.default();
                        return [4 /*yield*/, createRewards.execute({
                                title: title,
                                description: description,
                                value: value,
                                filename: cb.pathBucket,
                                image: cb.url,
                                user_id: user_id,
                            })];
                    case 1:
                        reward = _b.sent();
                        return [2 /*return*/, Response.json(reward)];
                    case 2: return [2 /*return*/];
                }
            });
        }); });
        return [2 /*return*/];
    });
}); });
rewardsRouter.get('/', function (Request, Response) { return __awaiter(void 0, void 0, void 0, function () {
    var user_id, listRewards, reward;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                user_id = Request.user;
                listRewards = new ListRewardsService_1.default();
                return [4 /*yield*/, listRewards.execute({ user_id: user_id })];
            case 1:
                reward = _a.sent();
                return [2 /*return*/, Response.json(reward)];
        }
    });
}); });
rewardsRouter.get('/detalhe/:id', function (Request, Response) { return __awaiter(void 0, void 0, void 0, function () {
    var user_id, id, id_int, detailRewards, reward;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                user_id = Request.user;
                id = Request.params.id;
                id_int = parseInt(id, 10);
                detailRewards = new DetailRewardsService_1.default();
                return [4 /*yield*/, detailRewards.execute({ id_int: id_int, user_id: user_id })];
            case 1:
                reward = _a.sent();
                return [2 /*return*/, Response.json(reward)];
        }
    });
}); });
rewardsRouter.delete('/delete/:id', function (Request, Response) { return __awaiter(void 0, void 0, void 0, function () {
    var user_id, id, id_int, detailRewards, reward, deleteRewards;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                user_id = Request.user;
                id = Request.params.id;
                id_int = parseInt(id, 10);
                detailRewards = new DetailRewardsService_1.default();
                return [4 /*yield*/, detailRewards.execute({ id_int: id_int, user_id: user_id })];
            case 1:
                reward = _a.sent();
                FileUtils_1.deleteImage(reward[0].image, function (url) { return __awaiter(void 0, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        console.log("Deletado");
                        return [2 /*return*/];
                    });
                }); });
                deleteRewards = new DeleteRewardsService_1.default();
                return [4 /*yield*/, deleteRewards.execute({ id_int: id_int, user_id: user_id })];
            case 2:
                _a.sent();
                return [2 /*return*/, Response.json("Deletado!")];
        }
    });
}); });
exports.default = rewardsRouter;
