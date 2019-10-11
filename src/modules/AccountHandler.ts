import * as ardorjs from 'ardorjs'
import { IAccount } from '../types';



export default class AccountHandler implements IAccount {

    private readonly ALPHABET = "23456789ABCDEFGHJKLMNPQRSTUVWXYZ";


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


    public convertPassphraseToAccountId = (passphrase: string): string => {
        return this.convertPublicKeyToAccountId(this.convertPassphraseToPublicKey(passphrase) as string);
    }


    public convertPassphraseToAccountRs = (passphrase: string): string => {
        return this.convertPublicKeyToAccountRs(this.convertPassphraseToPublicKey(passphrase) as string);
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


    public checkAccountRs = (accountRs: string): boolean => {
        const accountPrefix = "ARDOR-";
        if(!accountRs.startsWith(accountPrefix)) return false;

        const subAccount = accountRs.substring(accountPrefix.length);
        const subAccountFields = subAccount.split('-');
        
        if(subAccountFields.length !== 4) return false;
        if(subAccountFields[0].length !== 4) return false;
        if(subAccountFields[1].length !== 4) return false;
        if(subAccountFields[2].length !== 4) return false;
        if(subAccountFields[3].length !== 5) return false;

        if(!this.checkCharacter(subAccountFields[0].split(''))) return false;
        if(!this.checkCharacter(subAccountFields[1].split(''))) return false;
        if(!this.checkCharacter(subAccountFields[2].split(''))) return false;
        if(!this.checkCharacter(subAccountFields[3].split(''))) return false;

        return true;
    }

    private checkCharacter = (characters: string[]): boolean => {
        let containsWrongCharacter = false;
        
        characters.forEach(character => {
            if(!this.ALPHABET.includes(character)) {
                containsWrongCharacter = true;
                return;
            }
        });
        
        return !containsWrongCharacter;
    }

}
