import axios from 'axios'
import { AxiosResponse } from 'axios'
import qs from 'qs'
import { 
    SendMoneyParams,
    GetBalanceParams,
    DecodeTokenParams,
    GetBlockchainTransactionsParams,
    IRequest,
    GetBundlerRatesParams,
    BroadcastTransactionParams,
    ErrorResponse,
    objectAny,
    GetBalanceResponse,
    DecodeTokenResponse,
    GetBlockchainTransactionsResponse,
    GetBundlerRatesResponse,
    SetAccountPropertyParams,
    SendMoneyResponse,
    BroadcastTransactionResponse,
    SetAccountPropertyResponse,
    DeleteAccountPropertyParams,
    DeleteAccountPropertyResponse,
    GetAccountPropertiesParams,
    GetAccountPropertiesResponse
} from '../types';
import { Account } from '../index';


export default class RequestHandler implements IRequest {

    private readonly config = { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } };



    public getBalance = async (url: string, params: GetBalanceParams): Promise<GetBalanceResponse> => {
        return this.infoRequest("getBalance", url, params);
    }

    private infoRequest = async (requestType: string, url: string, params: objectAny): Promise<any> => {
        params.requestType = requestType;
        return this.getRequest(url, params).then(response => this.setPromiseReturn(response.data));
    }

    private getRequest = async (url: string, params: objectAny): Promise<AxiosResponse<any>> => {
        return axios.get(this.checkUrlPrefix(url), { params });
    }

    private checkUrlPrefix = (url: string): string => {
        return url.endsWith("/nxt") ? url : url += "/nxt";
    }

    private setPromiseReturn = (responseData: objectAny): any => {
        return (responseData as ErrorResponse).errorCode ? Promise.reject(responseData as ErrorResponse)
                                                         : responseData;
    }


    public decodeToken = async (url: string, params: DecodeTokenParams): Promise<DecodeTokenResponse> => {
        let _params = params as any;
        _params.website = params.data;
        delete _params.data;

        return this.infoRequest("decodeToken", url, _params);
    }


    public getBlockchainTransactions = async (url: string, params: GetBlockchainTransactionsParams): Promise<GetBlockchainTransactionsResponse> => {
        return this.infoRequest("getBlockchainTransactions", url, params);
    }


    public getBundlerRates = async (url: string, params: GetBundlerRatesParams): Promise<GetBundlerRatesResponse> => {
        return this.infoRequest("getBundlerRates", url, params);
    }


    public getAccountProperties = async (url: string, params: GetAccountPropertiesParams): Promise<GetAccountPropertiesResponse> => {
        return this.infoRequest("getAccountProperties", url, params);
    }


    public sendMoney = async (url: string, params: SendMoneyParams): Promise<SendMoneyResponse> => {
        return this.transactionRequest("sendMoney", url, params);
    }

    private transactionRequest = async (requestType: string, url: string, params: objectAny): Promise<any> => {
        params.requestType = requestType;
        return this.postTransactionRequest(url, params).then(response => this.setPromiseReturn(response.data));
    }
    
    private postTransactionRequest = async (url: string, params: objectAny): Promise<AxiosResponse<any>> => {
        let query = { ...params };

        delete query.requestType;
        delete query.secretPhrase;
        query.broadcast = false;
        query.publicKey = Account.convertPassphraseToPublicKey(params.secretPhrase);

        url = this.checkUrlPrefix(url);


        const response = await axios.post(url + "?requestType=" + params.requestType, qs.stringify(query), this.config);
        if((response.data as ErrorResponse).errorCode) return this.convertErrorToAxiosResponse(response.data);

        const unsignedTransactionBytesHex = response.data.unsignedTransactionBytes;
        const transactionJSON = response.data.transactionJSON;

        if(!Account.verifyTransactionBytes(unsignedTransactionBytesHex, transactionJSON.type, transactionJSON, query.publicKey)) {
            // return Promise.reject(new Error("transaction verification failed"));
            return this.convertErrorToAxiosResponse({errorCode: 1001, errorDescription: 'transaction verification failed'});
        }


        const signedTransactionBytesHex = Account.signTransactionBytes(unsignedTransactionBytesHex, params.secretPhrase);
        return this.broadcast(url + "?requestType=broadcastTransaction", {transactionBytes: signedTransactionBytesHex, transactionJSON: transactionJSON});
    }

    private convertErrorToAxiosResponse = (error: ErrorResponse): AxiosResponse => {
        return {
            data: error,
            status: 200,
            statusText: "dummy",
            headers: "dummy",
            config: {}
        };
    }

    private broadcast = async (url: string, params: BroadcastTransactionParams): Promise<AxiosResponse<any>> => {
        return axios.post(url, qs.stringify(params), this.config);
    }


    public broadcastTransaction = async (url: string, params: BroadcastTransactionParams): Promise<BroadcastTransactionResponse> => {
        return this.broadcast(url + "?requestType=broadcastTransaction", params).then(response => this.setPromiseReturn(response.data));
    }


    public setAccountProperty = async (url: string, params: SetAccountPropertyParams): Promise<SetAccountPropertyResponse> => {
        return this.transactionRequest("setAccountProperty", url, params);
    }


    public deleteAccountProperty = async (url: string, params: DeleteAccountPropertyParams): Promise<DeleteAccountPropertyResponse> => {
        return this.transactionRequest("deleteAccountProperty", url, params);
    }

}