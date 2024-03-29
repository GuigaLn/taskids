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
exports.deleteImage = exports.uploadImage = void 0;
var crypto_1 = __importDefault(require("crypto"));
var firebase_admin_1 = __importDefault(require("firebase-admin"));
var uuid_1 = require("uuid");
var serviceAccount = require('../../config/serviceAccountKey.json');
firebase_admin_1.default.initializeApp({
    credential: firebase_admin_1.default.credential.cert(serviceAccount),
    storageBucket: 'gotask-f60a1.appspot.com'
});
var bucket = 'gotask-f60a1.appspot.com';
var bucketAdmin = firebase_admin_1.default.storage().bucket();
exports.uploadImage = function (Request, typeImagePath, cb) {
    try {
        if (!Request.file) {
            cb(null);
        }
        var uuid_2 = uuid_1.v4();
        var image = Request.file;
        var fileHash = crypto_1.default.randomBytes(10).toString('hex');
        var imageName_1 = fileHash + "-" + image.originalname;
        var file_1 = bucketAdmin.file(typeImagePath + imageName_1);
        var stream = file_1.createWriteStream({
            metadata: {
                metadata: {
                    contentType: image.mimetype,
                    firebaseStorageDownloadTokens: uuid_2
                }
            }
        });
        stream.on("error", function (error) {
            console.log(error);
            cb(null);
        });
        stream.on("finish", function () { return __awaiter(void 0, void 0, void 0, function () {
            var pathBucket, url;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: 
                    //tonar o arquivo publico
                    return [4 /*yield*/, file_1.makePublic()];
                    case 1:
                        //tonar o arquivo publico
                        _a.sent();
                        pathBucket = "" + typeImagePath + imageName_1;
                        url = "https://firebasestorage.googleapis.com/v0/b/" + bucket + "/o/" + encodeURIComponent(pathBucket) + "?alt=media&token=" + uuid_2;
                        cb({ url: url, pathBucket: pathBucket });
                        return [2 /*return*/];
                }
            });
        }); });
        stream.end(image.buffer);
    }
    catch (err) {
        cb(null);
    }
};
exports.deleteImage = function (url, cb) {
    try {
        if (!url) {
            cb(null);
        }
        var baseUrl = "https://firebasestorage.googleapis.com/v0/b/" + bucket + "/o/";
        var urlDecode = decodeURIComponent(url);
        var path = urlDecode.replace(baseUrl, "");
        var indexOfEndPath = path.indexOf("?");
        path = path.substring(0, indexOfEndPath);
        var file = bucketAdmin.file(path);
        file.delete();
        cb(true);
    }
    catch (err) {
        cb(null);
    }
};
