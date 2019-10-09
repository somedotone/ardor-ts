import * as ardorjs from 'ardorjs'
import { IAccount } from '../types';



export default class AccountHandler implements IAccount {

    public convertAccountIdToAccountRs = (accountId: string): string => {
        return ardorjs.rsConvert(accountId).accountRs;
    }


    public convertPassphraseToPublicKey = (passphrase: string, toByteArray = false): string | Array<number> => {
        return ardorjs.secretPhraseToPublicKey(passphrase, toByteArray);
    }


    public convertPublicKeyToAccountId = (publicKey: string): string => {
        return ardorjs.publicKeyToAccountId(publicKey, true);
    }


    public convertPublicKeyToAccountRs = (publicKey: string): string => {
        return ardorjs.publicKeyToAccountId(publicKey, false);
    }


    public signTransactionBytes = (unsignedTransactionBytesHex: string, passphrase: string): string => {
        return ardorjs.signTransactionBytes(unsignedTransactionBytesHex, passphrase);
    }


    public verifyTransactionBytes = (unsignedTransactionBytesHex: string, transactionType: string, transactionJSON: object, publicKey: string): boolean => {
        return ardorjs.verifyTransactionBytes(unsignedTransactionBytesHex, transactionType, transactionJSON, publicKey);
    }


    public generateToken = (message: string, passphrase: string, forTestnet = false): string => {
        return ardorjs.generateToken(message, passphrase, forTestnet);
    }

}
