"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var RequestHandler_1 = __importDefault(require("./modules/RequestHandler"));
var TimeConverter_1 = __importDefault(require("./modules/TimeConverter"));
var AccountHandler_1 = __importDefault(require("./modules/AccountHandler"));
var PassphraseGenerator_1 = __importDefault(require("./modules/PassphraseGenerator"));
__export(require("./types"));
exports.request = new RequestHandler_1.default();
exports.time = new TimeConverter_1.default();
exports.account = new AccountHandler_1.default();
exports.passphrase = new PassphraseGenerator_1.default();
var Request = /** @class */ (function (_super) {
    __extends(Request, _super);
    function Request() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Request;
}(RequestHandler_1.default));
exports.Request = Request;
;
var Time = /** @class */ (function (_super) {
    __extends(Time, _super);
    function Time() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Time;
}(TimeConverter_1.default));
exports.Time = Time;
;
var Account = /** @class */ (function (_super) {
    __extends(Account, _super);
    function Account() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Account;
}(AccountHandler_1.default));
exports.Account = Account;
;
var Passphrase = /** @class */ (function (_super) {
    __extends(Passphrase, _super);
    function Passphrase() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Passphrase;
}(PassphraseGenerator_1.default));
exports.Passphrase = Passphrase;
;
