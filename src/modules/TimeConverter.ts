import { ITime } from "../types";


export default class TimeConverter implements ITime{

    private readonly ardorBeginTimestamp = {
        testnet: 1514296800000,
        mainnet: 1514764800000
    };



    public convertUnixToArdorTimestamp = (timestampInMsec: number, isTestnetTimestamp = false): number => {
        return isTestnetTimestamp ? Math.floor((timestampInMsec - this.ardorBeginTimestamp.testnet) / 1000)
                                  : Math.floor((timestampInMsec - this.ardorBeginTimestamp.mainnet) / 1000);
    }


    public convertArdorToUnixTimestamp = (timestamp: number, isTestnetTimestamp = false): number => {
        timestamp *= 1000;
        return isTestnetTimestamp ? timestamp + this.ardorBeginTimestamp.testnet
                                  : timestamp + this.ardorBeginTimestamp.mainnet;
    }
    
}
