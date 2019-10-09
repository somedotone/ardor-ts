import config from './config'
import { Time } from "../src/index"


if(config.test.timeModule) {
    describe('Time tests', () => {
        
        test('convertArdorToUnixTimestamp testnet', () => {
            const unixTimestamp = Time.convertArdorToUnixTimestamp(config.timestamp.ardor.testnet, true);
            expect(unixTimestamp).toBe(config.timestamp.unix.testnet);
        });


        test('convertArdorToUnixTimestamp mainnet', () => {
            const unixTimestamp = Time.convertArdorToUnixTimestamp(config.timestamp.ardor.mainnet);
            expect(unixTimestamp).toBe(config.timestamp.unix.mainnet);
        });


        test('convertUnixToArdorTimestamp testnet', () => {
            const ardorTimestamp = Time.convertUnixToArdorTimestamp(config.timestamp.unix.testnet, true);
            expect(ardorTimestamp).toBe(config.timestamp.ardor.testnet);
        });


        test('convertUnixToArdorTimestamp mainnet', () => {
            const ardorTimestamp = Time.convertUnixToArdorTimestamp(config.timestamp.unix.mainnet);
            expect(ardorTimestamp).toBe(config.timestamp.ardor.mainnet);
        });

    });
} else {
    test('dummy', () => { 
        expect(true).toBeTruthy(); 
    });
}