import { SendMoneyParams, GetBalanceParams, DecodeTokenParams, GetBlockchainTransactionsParams, IRequest, GetBundlerRatesParams, BroadcastTransactionParams, GetBalanceResponse, DecodeTokenResponse, GetBlockchainTransactionsResponse, GetBundlerRatesResponse, SetAccountPropertyParams, SendMoneyResponse, BroadcastTransactionResponse, SetAccountPropertyResponse, DeleteAccountPropertyParams, DeleteAccountPropertyResponse, GetAccountPropertiesParams, GetAccountPropertiesResponse } from '../types';
export default class RequestHandler implements IRequest {
    private readonly config;
    getBalance: (url: string, params: GetBalanceParams) => Promise<GetBalanceResponse>;
    private infoRequest;
    private getRequest;
    private checkUrlPrefix;
    private setPromiseReturn;
    decodeToken: (url: string, params: DecodeTokenParams) => Promise<DecodeTokenResponse>;
    getBlockchainTransactions: (url: string, params: GetBlockchainTransactionsParams) => Promise<GetBlockchainTransactionsResponse>;
    getBundlerRates: (url: string, params: GetBundlerRatesParams) => Promise<GetBundlerRatesResponse>;
    getAccountProperties: (url: string, params: GetAccountPropertiesParams) => Promise<GetAccountPropertiesResponse>;
    sendMoney: (url: string, params: SendMoneyParams) => Promise<SendMoneyResponse>;
    private transactionRequest;
    private postTransactionRequest;
    private convertErrorToAxiosResponse;
    private broadcast;
    broadcastTransaction: (url: string, params: BroadcastTransactionParams) => Promise<BroadcastTransactionResponse>;
    setAccountProperty: (url: string, params: SetAccountPropertyParams) => Promise<SetAccountPropertyResponse>;
    deleteAccountProperty: (url: string, params: DeleteAccountPropertyParams) => Promise<DeleteAccountPropertyResponse>;
}
