import { 
    ChainId, 
    request,
    Request,
    ErrorResponse,
    GetBlockchainTransactionsParams,
    ChildTransactionType,
    SendMoneyParams,
    SetAccountPropertyParams,
    DeleteAccountPropertyParams
} from "../src/index";
import config from './config';


const runGetRequests = config.test.requestModule.getInformationRequests;
const postTransactionRequests = config.test.requestModule.postTransactionRequests;
const runPostRequests = postTransactionRequests.runTests;


if(runGetRequests) {
    describe('Information request tests', () => {
    
        test('getBalance success', async () => {
            const response = await request.getBalance(config.node.url.testnet, {chain: ChainId.IGNIS, account: config.account.alice.address});
            
            expect(response.balanceNQT).toBeDefined();
            expect(response.unconfirmedBalanceNQT).toBeDefined();
            expect(response.requestProcessingTime).toBeDefined();
        });


        test('getBalance success with own instance', async () => {
            const ownRequest = new Request();

            const response = await request.getBalance(config.node.url.testnet, {chain: ChainId.IGNIS, account: config.account.alice.address});
            
            expect(response.balanceNQT).toBeDefined();
            expect(response.unconfirmedBalanceNQT).toBeDefined();
            expect(response.requestProcessingTime).toBeDefined();
        });


        test('getBalance response error', async () => {
            try {
                await request.getBalance(config.node.url.testnet, {chain: ChainId.IGNIS, account: config.account.alice.address + "bb"});
                fail('should not reach here');
            } catch(e) {
                const error = e as ErrorResponse;
                expect(error.errorCode).toBeDefined();
                expect(error.errorDescription).toBeDefined();
            }
        });


        test('getBalance request fail', async () => {
            try {
                await request.getBalance(config.node.url.testnet + "__", {chain: ChainId.IGNIS, account: config.account.alice.address});
                fail('should not reach here');
            } catch(e) {
                expect(e.code).toBe('ENOTFOUND');
            }
        });


        test('decodeToken', async () => {
            const token = config.account.alice.token.testnet;
            const response = await request.decodeToken(config.node.url.testnet, {data: token.data, token: token.token});
            
            expect(response.valid).toBe(true);
            expect(response.accountRS).toBe(config.account.alice.address);
            expect(response.account).toBe(config.account.alice.id);
            expect(response.timestamp).toBe(token.timestamp);
            expect(response.requestProcessingTime).toBeDefined();
        });


        test('getBlockchainTransactions', async () => {
            const params: GetBlockchainTransactionsParams = {
                chain: ChainId.IGNIS,
                account: config.account.alice.address,
                type: ChildTransactionType.PAYMENT
            };

            const response = await request.getBlockchainTransactions(config.node.url.testnet, params);
            
            expect(response.requestProcessingTime).toBeDefined();
            expect(response.transactions[0]).toBeDefined();
        });


        test('getAccountProperties', async () => {
            const response = await request.getAccountProperties(config.node.url.testnet, { recipient: config.account.bob.address });
            
            expect(response.requestProcessingTime).toBeDefined();
            expect(response.properties).toBeDefined();
        });

    });
}


if(runPostRequests) {
    describe('Transaction post request tests', () => {

        if(postTransactionRequests.sendMoney) {
            test('sendMoney success', async () => {
                const params: SendMoneyParams = {
                    chain: ChainId.IGNIS,
                    secretPhrase: config.account.alice.secret,
                    recipient: config.account.bob.address,
                    amountNQT: 1000,
                }

                const response = await request.sendMoney(config.node.url.testnet, params);
        
                expect(response.fullHash).toBeDefined();
                expect(response.requestProcessingTime).toBeDefined();
            });


            test('sendMoney response error', async () => {
                const params: SendMoneyParams = {
                    chain: ChainId.IGNIS,
                    secretPhrase: config.account.alice.secret + "-",
                    recipient: config.account.bob.address,
                    amountNQT: 1000,
                }

                try {
                    await request.sendMoney(config.node.url.testnet, params);
                    fail('should not reach here');
                } catch(e) {
                    const error = e as ErrorResponse;
                    expect(error.errorDescription).toBeDefined();
                    expect(error.errorCode).toBeDefined();
                }
            });


            test('sendMoney request fail', async () => {
                const params: SendMoneyParams = {
                    chain: ChainId.IGNIS,
                    secretPhrase: config.account.alice.secret,
                    recipient: config.account.bob.address,
                    amountNQT: 1000,
                }
                
                try {
                    await request.sendMoney(config.node.url.testnet + "__", params);
                    fail('should not reach here');
                } catch(e) {
                    expect(e.code).toBe('ENOTFOUND');
                }
            });
        }


        if(postTransactionRequests.setAccountProperty) {
            test('setAccountProperty', async () => {
                const params: SetAccountPropertyParams = {
                    chain: ChainId.IGNIS,
                    secretPhrase: config.account.alice.secret,
                    recipient: config.account.bob.address,
                    property: 'module-test-' + Date.now(),
                    value: 'tested on ' + (new Date()).toUTCString()
                }

                const response = await request.setAccountProperty(config.node.url.testnet, params);
        
                expect(response.fullHash).toBeDefined();
                expect(response.requestProcessingTime).toBeDefined();
            });
        }


        if(postTransactionRequests.deleteAccountProperty) {
            test('deleteAccountProperty', async () => {

                const getResponse = await request.getAccountProperties(config.node.url.testnet, { recipient: config.account.bob.address });
                
                const propertiesSetByAlice = getResponse.properties.filter(property => property.setterRS === config.account.alice.address);
                if(propertiesSetByAlice.length < 1) fail('bob has no module test property set');
                const propertyName = propertiesSetByAlice[propertiesSetByAlice.length - 1].property;


                let params: DeleteAccountPropertyParams = {
                    chain: ChainId.IGNIS,
                    recipient: config.account.bob.address,
                    secretPhrase: config.account.alice.secret,
                    property: propertyName
                };
                
                const deleteResponse = await request.deleteAccountProperty(config.node.url.testnet, params);
            
                expect(deleteResponse.fullHash).toBeDefined();
                expect(deleteResponse.requestProcessingTime).toBeDefined();
            });
        }
        
    });
}


if(!runGetRequests && !runPostRequests) {
    test('dummy', () => { 
        expect(true).toBeTruthy(); 
    });
}