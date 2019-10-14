import { IRequest, ITime, IPassphrase, IAccount } from "./types";
import RequestHandler from "./modules/RequestHandler";
import TimeConverter from "./modules/TimeConverter";
import AccountHandler from "./modules/AccountHandler";
import PassphraseGenerator from "./modules/PassphraseGenerator";

export * from "./types";


export const request: IRequest = new RequestHandler();
export const time: ITime = new TimeConverter();
export const account: IAccount = new AccountHandler();
export const passphrase: IPassphrase = new PassphraseGenerator();

export class Request extends RequestHandler {};
export class Time extends TimeConverter {};
export class Account extends AccountHandler {};
export class Passphrase extends PassphraseGenerator {};