import { IPassphrase } from '../types';
export default class PassphraseGenerator implements IPassphrase {
    constructor();
    generate: () => string;
}
