import config from './config'
import { time, Time } from "../src/index"


if(config.test.timeModule) {
    describe('Time tests', () => {
        
        test('convertArdorToUnixTimestamp testnet', () => {
            const unixTimestamp = time.convertArdorToUnixTimestamp(config.timestamp.ardor.testnet, true);
            expect(unixTimestamp).toBe(config.timestamp.unix.testnet);
        });


        test('convertArdorToUnixTimestamp testnet with own instance', () => {
            const ownTime = new Time();
            const unixTimestamp = ownTime.convertArdorToUnixTimestamp(config.timestamp.ardor.testnet, true);
            expect(unixTimestamp).toBe(config.timestamp.unix.testnet);
        });


        test('convertArdorToUnixTimestamp mainnet', () => {
            const unixTimestamp = time.convertArdorToUnixTimestamp(config.timestamp.ardor.mainnet);
            expect(unixTimestamp).toBe(config.timestamp.unix.mainnet);
        });


        test('convertUnixToArdorTimestamp testnet', () => {
            const ardorTimestamp = time.convertUnixToArdorTimestamp(config.timestamp.unix.testnet, true);
            expect(ardorTimestamp).toBe(config.timestamp.ardor.testnet);
        });


        test('convertUnixToArdorTimestamp mainnet', () => {
            const ardorTimestamp = time.convertUnixToArdorTimestamp(config.timestamp.unix.mainnet);
            expect(ardorTimestamp).toBe(config.timestamp.ardor.mainnet);
        });

    });
} else {
    test('dummy', () => { 
        expect(true).toBeTruthy(); 
    });
}