import { IAccount } from '../types';
export default class AccountHandler implements IAccount {
    private readonly ALPHABET;
    convertAccountIdToAccountRs: (accountId: string) => string;
    convertPassphraseToPublicKey: (passphrase: string, toByteArray?: boolean) => string | number[];
    convertPublicKeyToAccountId: (publicKey: string) => string;
    convertPublicKeyToAccountRs: (publicKey: string) => string;
    convertPassphraseToAccountId: (passphrase: string) => string;
    convertPassphraseToAccountRs: (passphrase: string) => string;
    signTransactionBytes: (unsignedTransactionBytesHex: string, passphrase: string) => string;
    verifyTransactionBytes: (unsignedTransactionBytesHex: string, transactionType: string, transactionJSON: object, publicKey: string) => boolean;
    generateToken: (message: string, passphrase: string, forTestnet?: boolean) => string;
    checkAccountRs: (accountRs: string) => boolean;
    private checkCharacter;
}
