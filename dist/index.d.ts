import { IRequest, ITime, IPassphrase, IAccount } from "./types";
import RequestHandler from "./modules/RequestHandler";
import TimeConverter from "./modules/TimeConverter";
import AccountHandler from "./modules/AccountHandler";
import PassphraseGenerator from "./modules/PassphraseGenerator";
export * from "./types";
export declare const request: IRequest;
export declare const time: ITime;
export declare const account: IAccount;
export declare const passphrase: IPassphrase;
export declare class Request extends RequestHandler {
}
export declare class Time extends TimeConverter {
}
export declare class Account extends AccountHandler {
}
export declare class Passphrase extends PassphraseGenerator {
}
