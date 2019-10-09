# ardor-ts

An [Ardor](https://ardorplatform.org) client library written in typescript.


## Install

````
npm install git+https://github.com/somedotone/ardor-ts#v1.0.0
````

There is a postinstall script which transpiles the typescript files into javascript so that the library can also be used in javascript projects.

## Test

browser:
````
npm run test-browser
````

node:
````
npm run test-node
````

`npm test` runs the browser test.

Because broadcasting a transaction costs fees, the transaction post request tests are disabled in the default test configuration. You can change the configuration in the `test/config.ts` file.


## APIs

The library consist of the following modules:


### Request

This module creates requests to communicate with an ardor node. It handles get requests and transaction post requests. Every request which involves a transaction creation is signed locally so that your passphrase is never transmitted to an ardor node. 

Each function has the following singature:
````
functionName : (url: string, params: FunctionNameParams) => Promise<FunctionNameResponse>
````
The *functionName* corresponds to the ardor API request type, the *functionName*Params interface to the request parameters and the *functionName*Response interface to the JSON response properties (see [API console](https://testardor.jelurida.com/test)).

An example request to get the current account balance might look like this:


````typescript
import { Request, GetBalanceParams, ChainId, ErrorResponse } from 'ardor-ts'


const exampleRequest = async () => {
    
    /* set request parameters */
    const params: GetBalanceParams = {
        chain: ChainId.IGNIS,
        account: "ARDOR-XCTG-FVBM-9KNX-3DA6B"
    }

    try {

        /* create and emit a request */
        const response = await Request.getBalance("https://testardor.jelurida.com", params);

        /* the response implements the GetBalanceResponse interface */
        console.log(response.balanceNQT);
        console.log(response.unconfirmedBalanceNQT);
        console.log(response.requestProcessingTime);

    } catch(e) {

        /* check the error type */
        const error = e as ErrorResponse;
        if(error.errorCode) {

            /* error is an api error */
            console.log(error.errorDescription);
            console.log(error.errorCode);

        } else {

            /* error is an axios error */
            console.log(e);

        }
    }
}

exampleRequest();
````

The following requests are implemented:

#### get requests

````typescript
- getBalance: (url: string, params: GetBalanceParams) => Promise<GetBalanceResponse>
- getBlockchainTransactions: (url: string, params: GetBlockchainTransactionsParams) => Promise<GetBlockchainTransactionsResponse>
- decodeToken: (url: string, params: DecodeTokenParams) => Promise<DecodeTokenResponse>
- getBundlerRates: (url: string, params: GetBundlerRatesParams) => Promise<GetBundlerRatesResponse>
- getAccountProperties: (url: string, params: GetAccountPropertiesParams) => Promise<GetAccountPropertiesResponse>
````

#### transaction post requests

````typescript
- sendMoney: (url: string, params: SendMoneyParams) => Promise<SendMoneyResponse>
- broadcastTransaction: (url: string, params: BroadcastTransactionParams) => Promise<BroadcastTransactionResponse>
- setAccountProperty: (url: string, params: SetAccountPropertyParams) => Promise<SetAccountPropertyResponse>
- deleteAccountProperty: (url: string, params: DeleteAccountPropertyParams) => Promise<DeleteAccountPropertyResponse>
````

### Account

The Account module is a wrapper of a forked [version](https://github.com/Atzen2/ardorjs/projects) of the [ardorjs](https://github.com/mrv777/ardorjs) package. It handles transaction signing, account conversions and token generation.

It provides the following APIs:

````typescript
- convertPassphraseToPublicKey: (passphrase: string, toByteArray?: boolean) => string | Array<number> // toByteArray defaults to false
- convertPublicKeyToAccountId: (publicKey: string) => string
- convertPublicKeyToAccountRs: (publicKey: string) => string
- generateToken: (message: string, passphrase: string, forTestnet?: boolean) => string // forTestnet defaults to false
- signTransactionBytes: (unsignedTransactionBytesHex: string, passphrase: string) => string
- verifyTransactionBytes: (unsignedTransactionBytesHex: string, transactionType: string, transactionJSON: object, publicKey: string) => boolean
````


### Passphrase

This module provides passphrase generation. It uses the [bip39](https://github.com/bitcoinjs/bip39) package with the default english wordlist.

API:

````typescript
 - generate: () => string
````


### Time

The Time module handles conversions between Ardor epoch timestamps and unix timestamps.

It provides the following APIs:

````typescript
- convertUnixToArdorTimestamp: (timestampInMsec: number, isTestnetTimestamp?: boolean) => number // isTestnetTimestamp defaults to false
- convertArdorToUnixTimestamp: (timestamp: number, isTestnetTimestamp?: boolean) => number // isTestnetTimestamp defaults to false
````

Enjoy :)
