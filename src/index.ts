import { IRequest, ITime, IPassphrase, IAccount } from "./types";
import RequestHandler from "./modules/RequestHandler";
import TimeConverter from "./modules/TimeConverter";
import AccountHandler from "./modules/AccountHandler";
import PassphraseGenerator from "./modules/PassphraseGenerator";

export * from "./types";


export const Request: IRequest = new RequestHandler();
export const Time: ITime = new TimeConverter();
export const Account: IAccount = new AccountHandler();
export const Passphrase: IPassphrase = new PassphraseGenerator();