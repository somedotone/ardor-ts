"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var TimeConverter = /** @class */ (function () {
    function TimeConverter() {
        var _this = this;
        this.ardorBeginTimestamp = {
            testnet: 1514296800000,
            mainnet: 1514764800000
        };
        this.convertUnixToArdorTimestamp = function (timestampInMsec, isTestnetTimestamp) {
            if (isTestnetTimestamp === void 0) { isTestnetTimestamp = false; }
            return isTestnetTimestamp ? Math.floor((timestampInMsec - _this.ardorBeginTimestamp.testnet) / 1000)
                : Math.floor((timestampInMsec - _this.ardorBeginTimestamp.mainnet) / 1000);
        };
        this.convertArdorToUnixTimestamp = function (timestamp, isTestnetTimestamp) {
            if (isTestnetTimestamp === void 0) { isTestnetTimestamp = false; }
            timestamp *= 1000;
            return isTestnetTimestamp ? timestamp + _this.ardorBeginTimestamp.testnet
                : timestamp + _this.ardorBeginTimestamp.mainnet;
        };
    }
    return TimeConverter;
}());
exports.default = TimeConverter;
