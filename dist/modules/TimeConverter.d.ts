import { ITime } from "../types";
export default class TimeConverter implements ITime {
    private readonly ardorBeginTimestamp;
    convertUnixToArdorTimestamp: (timestampInMsec: number, isTestnetTimestamp?: boolean) => number;
    convertArdorToUnixTimestamp: (timestamp: number, isTestnetTimestamp?: boolean) => number;
}
