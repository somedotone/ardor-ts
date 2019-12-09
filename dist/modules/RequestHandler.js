"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
var axios_1 = __importDefault(require("axios"));
var qs_1 = __importDefault(require("qs"));
var index_1 = require("../index");
var RequestHandler = /** @class */ (function () {
    function RequestHandler() {
        var _this = this;
        this.config = { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } };
        this.getBalance = function (url, params) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.infoRequest("getBalance", url, params)];
            });
        }); };
        this.infoRequest = function (requestType, url, params) { return __awaiter(_this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                params.requestType = requestType;
                return [2 /*return*/, this.getRequest(url, params).then(function (response) { return _this.setPromiseReturn(response.data); })];
            });
        }); };
        this.getRequest = function (url, params) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, axios_1.default.get(this.checkUrlPrefix(url), { params: params })];
            });
        }); };
        this.checkUrlPrefix = function (url) {
            return url.endsWith("/nxt") ? url : url += "/nxt";
        };
        this.setPromiseReturn = function (responseData) {
            return responseData.errorCode ? Promise.reject(responseData)
                : responseData;
        };
        this.decodeToken = function (url, params) { return __awaiter(_this, void 0, void 0, function () {
            var _params;
            return __generator(this, function (_a) {
                _params = params;
                _params.website = params.data;
                delete _params.data;
                return [2 /*return*/, this.infoRequest("decodeToken", url, _params)];
            });
        }); };
        this.getBlockchainTransactions = function (url, params) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.infoRequest("getBlockchainTransactions", url, params)];
            });
        }); };
        this.getBundlerRates = function (url, params) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.infoRequest("getBundlerRates", url, params)];
            });
        }); };
        this.getAccountProperties = function (url, params) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.infoRequest("getAccountProperties", url, params)];
            });
        }); };
        this.sendMoney = function (url, params) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.transactionRequest("sendMoney", url, params)];
            });
        }); };
        this.transactionRequest = function (requestType, url, params) { return __awaiter(_this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                params.requestType = requestType;
                return [2 /*return*/, this.postTransactionRequest(url, params).then(function (response) { return _this.setPromiseReturn(response.data); })];
            });
        }); };
        this.postTransactionRequest = function (url, params) { return __awaiter(_this, void 0, void 0, function () {
            var query, response, unsignedTransactionBytesHex, transactionJSON, signedTransactionBytesHex;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        query = __assign({}, params);
                        delete query.requestType;
                        delete query.secretPhrase;
                        query.broadcast = false;
                        query.publicKey = index_1.account.convertPassphraseToPublicKey(params.secretPhrase);
                        url = this.checkUrlPrefix(url);
                        return [4 /*yield*/, axios_1.default.post(url + "?requestType=" + params.requestType, qs_1.default.stringify(query), this.config)];
                    case 1:
                        response = _a.sent();
                        if (response.data.errorCode)
                            return [2 /*return*/, this.convertErrorToAxiosResponse(response.data)];
                        unsignedTransactionBytesHex = response.data.unsignedTransactionBytes;
                        transactionJSON = response.data.transactionJSON;
                        if (!index_1.account.verifyTransactionBytes(unsignedTransactionBytesHex, transactionJSON.type, transactionJSON, query.publicKey)) {
                            return [2 /*return*/, this.convertErrorToAxiosResponse({ errorCode: 1001, errorDescription: 'transaction verification failed' })];
                        }
                        signedTransactionBytesHex = index_1.account.signTransactionBytes(unsignedTransactionBytesHex, params.secretPhrase);
                        return [2 /*return*/, this.broadcast(url + "?requestType=broadcastTransaction", { transactionBytes: signedTransactionBytesHex, transactionJSON: transactionJSON })];
                }
            });
        }); };
        this.convertErrorToAxiosResponse = function (error) {
            return {
                data: error,
                status: 200,
                statusText: "dummy",
                headers: "dummy",
                config: {}
            };
        };
        this.broadcast = function (url, params) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, axios_1.default.post(url, qs_1.default.stringify(params), this.config)];
            });
        }); };
        this.broadcastTransaction = function (url, params) { return __awaiter(_this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, this.broadcast(url + "?requestType=broadcastTransaction", params).then(function (response) { return _this.setPromiseReturn(response.data); })];
            });
        }); };
        this.setAccountProperty = function (url, params) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.transactionRequest("setAccountProperty", url, params)];
            });
        }); };
        this.deleteAccountProperty = function (url, params) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.transactionRequest("deleteAccountProperty", url, params)];
            });
        }); };
    }
    return RequestHandler;
}());
exports.default = RequestHandler;
