"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var ardorjs = __importStar(require("ardorjs"));
var AccountHandler = /** @class */ (function () {
    function AccountHandler() {
        var _this = this;
        this.ALPHABET = "23456789ABCDEFGHJKLMNPQRSTUVWXYZ";
        this.convertAccountIdToAccountRs = function (accountId) {
            return ardorjs.rsConvert(accountId).accountRs;
        };
        this.convertPassphraseToPublicKey = function (passphrase, toByteArray) {
            if (toByteArray === void 0) { toByteArray = false; }
            return ardorjs.secretPhraseToPublicKey(passphrase, toByteArray);
        };
        this.convertPublicKeyToAccountId = function (publicKey) {
            return ardorjs.publicKeyToAccountId(publicKey, true);
        };
        this.convertPublicKeyToAccountRs = function (publicKey) {
            return ardorjs.publicKeyToAccountId(publicKey, false);
        };
        this.convertPassphraseToAccountId = function (passphrase) {
            return _this.convertPublicKeyToAccountId(_this.convertPassphraseToPublicKey(passphrase));
        };
        this.convertPassphraseToAccountRs = function (passphrase) {
            return _this.convertPublicKeyToAccountRs(_this.convertPassphraseToPublicKey(passphrase));
        };
        this.signTransactionBytes = function (unsignedTransactionBytesHex, passphrase) {
            return ardorjs.signTransactionBytes(unsignedTransactionBytesHex, passphrase);
        };
        this.verifyTransactionBytes = function (unsignedTransactionBytesHex, transactionType, transactionJSON, publicKey) {
            return ardorjs.verifyTransactionBytes(unsignedTransactionBytesHex, transactionType, transactionJSON, publicKey);
        };
        this.generateToken = function (message, passphrase, forTestnet) {
            if (forTestnet === void 0) { forTestnet = false; }
            return ardorjs.generateToken(message, passphrase, forTestnet);
        };
        this.checkAccountRs = function (accountRs) {
            var accountPrefix = "ARDOR-";
            if (!accountRs.startsWith(accountPrefix))
                return false;
            var subAccount = accountRs.substring(accountPrefix.length);
            var subAccountFields = subAccount.split('-');
            if (subAccountFields.length !== 4)
                return false;
            if (subAccountFields[0].length !== 4)
                return false;
            if (subAccountFields[1].length !== 4)
                return false;
            if (subAccountFields[2].length !== 4)
                return false;
            if (subAccountFields[3].length !== 5)
                return false;
            if (!_this.checkCharacter(subAccountFields[0].split('')))
                return false;
            if (!_this.checkCharacter(subAccountFields[1].split('')))
                return false;
            if (!_this.checkCharacter(subAccountFields[2].split('')))
                return false;
            if (!_this.checkCharacter(subAccountFields[3].split('')))
                return false;
            return true;
        };
        this.checkCharacter = function (characters) {
            var containsWrongCharacter = false;
            characters.forEach(function (character) {
                if (!_this.ALPHABET.includes(character)) {
                    containsWrongCharacter = true;
                    return;
                }
            });
            return !containsWrongCharacter;
        };
    }
    return AccountHandler;
}());
exports.default = AccountHandler;
