import * as bip39 from 'bip39'
import { IPassphrase } from '../types';


export default class PassphraseGenerator implements IPassphrase {

    constructor() {
        bip39.setDefaultWordlist("english");
    }

    
    public generate = (): string => {
        return bip39.generateMnemonic();
    }

}