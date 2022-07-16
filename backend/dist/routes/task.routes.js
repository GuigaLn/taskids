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
var CreateTaskService_1 = __importDefault(require("../services/Task/CreateTaskService"));
var ListTaskServiceChild_1 = __importDefault(require("../services/Task/ListTaskServiceChild"));
var ListTaskService_1 = __importDefault(require("../services/Task/ListTaskService"));
var DetailTaskService_1 = __importDefault(require("../services/Task/DetailTaskService"));
var ValidateTaskService_1 = __importDefault(require("../services/Task/ValidateTaskService"));
var InvalidateTaskService_1 = __importDefault(require("../services/Task/InvalidateTaskService"));
var TaskAswnerService_1 = __importDefault(require("../services/Task/TaskAswnerService"));
var ensureAuthenticated_1 = __importDefault(require("../middlewares/ensureAuthenticated"));
var taskRouter = express_1.Router();
taskRouter.use(ensureAuthenticated_1.default);
taskRouter.post('/', function (Request, Response) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, title, description, amount, answer, child_id, user_id, createTask, task;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = Request.body, title = _a.title, description = _a.description, amount = _a.amount, answer = _a.answer, child_id = _a.child_id;
                user_id = Request.user;
                createTask = new CreateTaskService_1.default();
                return [4 /*yield*/, createTask.execute({
                        title: title,
                        description: description,
                        amount: amount,
                        answer: answer,
                        child_id: child_id,
                        user_id: user_id
                    })];
            case 1:
                task = _b.sent();
                return [2 /*return*/, Response.json(task)];
        }
    });
}); });
taskRouter.get('/', function (Request, Response) { return __awaiter(void 0, void 0, void 0, function () {
    var user_id, listTask, task;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                user_id = Request.user;
                listTask = new ListTaskService_1.default();
                return [4 /*yield*/, listTask.execute({ user_id: user_id })];
            case 1:
                task = _a.sent();
                return [2 /*return*/, Response.json(task)];
        }
    });
}); });
taskRouter.get('/child/:id', function (Request, Response) { return __awaiter(void 0, void 0, void 0, function () {
    var id, id_int, listTask, task;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = Request.params.id;
                id_int = parseInt(id, 10);
                listTask = new ListTaskServiceChild_1.default();
                return [4 /*yield*/, listTask.execute({ child_id: id_int })];
            case 1:
                task = _a.sent();
                return [2 /*return*/, Response.json(task)];
        }
    });
}); });
taskRouter.get('/detalhe/:id', function (Request, Response) { return __awaiter(void 0, void 0, void 0, function () {
    var user_id, id, id_int, listTask, task;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                user_id = Request.user;
                id = Request.params.id;
                id_int = parseInt(id, 10);
                listTask = new DetailTaskService_1.default();
                return [4 /*yield*/, listTask.execute({ id_int: id_int, user_id: user_id })];
            case 1:
                task = _a.sent();
                return [2 /*return*/, Response.json(task)];
        }
    });
}); });
taskRouter.put('/validate/:id', function (Request, Response) { return __awaiter(void 0, void 0, void 0, function () {
    var id, id_int, validateTask;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = Request.params.id;
                id_int = parseInt(id, 10);
                validateTask = new ValidateTaskService_1.default();
                return [4 /*yield*/, validateTask.execute({ id_int: id_int })];
            case 1:
                _a.sent();
                return [2 /*return*/, Response.json("Atualizado")];
        }
    });
}); });
taskRouter.put('/invalidate/:id', function (Request, Response) { return __awaiter(void 0, void 0, void 0, function () {
    var id, id_int, invalidateTask;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = Request.params.id;
                id_int = parseInt(id, 10);
                invalidateTask = new InvalidateTaskService_1.default();
                return [4 /*yield*/, invalidateTask.execute({ id_int: id_int })];
            case 1:
                _a.sent();
                return [2 /*return*/, Response.json("Atualizado")];
        }
    });
}); });
taskRouter.put('/aswner', function (Request, Response) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, id, aswner, id_int, aswnerService, task;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = Request.body, id = _a.id, aswner = _a.aswner;
                id_int = parseInt(id, 10);
                aswnerService = new TaskAswnerService_1.default();
                return [4 /*yield*/, aswnerService.execute({
                        id_int: id_int,
                        aswner: aswner
                    })];
            case 1:
                task = _b.sent();
                return [2 /*return*/, Response.json(task)];
        }
    });
}); });
exports.default = taskRouter;
