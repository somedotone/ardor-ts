import config from './config'
import { passphrase, Passphrase } from "../src/index"


if(config.test.passphraseModule) {
    describe('Passphrase module tests', () => {

        test('generate', () => {
            const secret = passphrase.generate();
            expect(secret).toBeDefined();
            expect(secret.split(" ").length).toBe(12);
        });


        test('generate with own instance', () => {
            const ownPassphrase = new Passphrase();

            const secret = ownPassphrase.generate();
            expect(secret).toBeDefined();
            expect(secret.split(" ").length).toBe(12);
        });

    });
} else {
    test('dummy', () => { 
        expect(true).toBeTruthy(); 
    });
}