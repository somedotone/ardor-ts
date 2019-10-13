import config from './config'
import { Passphrase, PassphraseClass } from "../src/index"


if(config.test.passphraseModule) {
    describe('Passphrase module tests', () => {

        test('generate', () => {
            const passphrase = Passphrase.generate();
            expect(passphrase).toBeDefined();
            expect(passphrase.split(" ").length).toBe(12);
        });


        test('generate with own instance', () => {
            const ownPassphrase = new PassphraseClass();

            const passphrase = ownPassphrase.generate();
            expect(passphrase).toBeDefined();
            expect(passphrase.split(" ").length).toBe(12);
        });

    });
} else {
    test('dummy', () => { 
        expect(true).toBeTruthy(); 
    });
}