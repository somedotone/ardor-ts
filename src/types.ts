export type objectAny = {[name: string]: any};


export enum ChainId {
    ARDOR = 1,
    IGNIS,
    AEUR,
    BITSWIFT,
    MPG
}


export interface ErrorResponse {
    errorDescription: string;
    errorCode: number;
}


export interface GetBalanceParams {
    chain: ChainId;
    account: string;
    height?: number;
    requireBlock?: number;
    requireLastBlock?: number;
}

export interface GetBalanceResponse {
    unconfirmedBalanceNQT: string;
    balanceNQT: string;
    requestProcessingTime: number;
}


export interface DecodeTokenParams {
    data: string;
    token: string;
}

export interface DecodeTokenResponse {
    valid: boolean;
    accountRS: string;
    requestProcessingTime: number;
    account: string;
    timestamp: number;
}


export interface GetBlockchainTransactionsParams {
    chain: ChainId;
    account: string;
    timestamp?: number;
    type?: ChildTransactionType | ParentTransactionType;
    subType?: ChildTransactionSubtype | ParentTransactionSubtype;
    firstIndex?: number;
    lastIndex?: number;
    numberOfConfirmations?: number;
    withMessage?: boolean;
    phasedOnly?: boolean;
    nonPhasedOnly?: boolean;
    includeExpiredPrunable?: boolean;
    includePhasingResult?: boolean;
    executedOnly?: boolean;
    adminPassword?:	string;
    requireBlock?: number;
    requireLastBlock?: number;
}

export enum ParentTransactionType  {
    CHILDCHAIN_BLOCK = -1,
    PAYMENT = -2,
    ACCOUNT_CONTROL = -3,
    COIN_EXCHANGE = -4
}

export enum ParentTransactionSubtype  {
    CHILDCHAIN_BLOCK = 0,

    PAYMENT__ORDINARY_PAYMENT = 0,

    ACCOUNT_CONTROL__EFFECTIVE_BALANCE_LEASING = 0,
}

export enum ChildTransactionType  {
    PAYMENT = 0,
    MESSAGING = 1,
    ASSET_EXCHANGE = 2,
    DIGITAL_GOODS = 3,
    ACCOUNT_CONTROL = 4,
    MONETARY_SYSTEM = 5,
    DATA = 6,
    SHUFFLING = 7,
    ALIASES = 8,
    VOTING = 9,
    ACCOUNT_PROPERTY = 10,
    COIN_EXCHANGE = 11,
    LIGHT_CONTRACT = 12 
}

export enum ChildTransactionSubtype {
    PAYMENT__ORDINARY_PAYMENT = 0,

    MESSAGING__ARBITRARY_MESSAGE = 0,

    ASSET_EXCHANGE__ASSET_ISSUANCE = 0,
    ASSET_EXCHANGE__ASSET_TRANSFER = 1,
    ASSET_EXCHANGE__ASK_ORDER_PLACEMENT = 2,
    ASSET_EXCHANGE__BID_ORDER_PLACEMENT = 3,
    ASSET_EXCHANGE__ASK_ORDER_CANCELLATION = 4,
    ASSET_EXCHANGE__BID_ORDER_CANCELLATION = 5,
    ASSET_EXCHANGE__DIVIDEND_PAYMENT = 6,
    ASSET_EXCHANGE__ASSET_DELETE = 7,
    ASSET_EXCHANGE__ASSET_INCREASE = 8,
    ASSET_EXCHANGE__SET_PHASING_CONTROL = 9,
    ASSET_EXCHANGE__PROPERTY_SET = 10,
    ASSET_EXCHANGE__PROPERTY_DELETE = 11,

    DIGITAL_GOODS__LISTING = 0,
    DIGITAL_GOODS__DELISTING = 1,
    DIGITAL_GOODS__PRICE_CHANGE = 2,
    DIGITAL_GOODS__QUANTITY_CHANGE = 3,
    DIGITAL_GOODS__PURCHASE = 4,
    DIGITAL_GOODS__DELIVERY = 5,
    DIGITAL_GOODS__FEEDBACK = 6,
    DIGITAL_GOODS__REFUND = 7,

    ACCOUNT_CONTROL__PHASING_ONLY = 0,

    MONETARY_SYSTEM__CURRENCY_ISSUANCE = 0,
    MONETARY_SYSTEM__RESERVE_INCREASE = 1,
    MONETARY_SYSTEM__RESERVE_CLAIM = 2,
    MONETARY_SYSTEM__CURRENCY_TRANSFER = 3,
    MONETARY_SYSTEM__PUBLISH_EXCHANGE_OFFER = 4,
    MONETARY_SYSTEM__EXCHANGE_BUY = 5,
    MONETARY_SYSTEM__EXCHANGE_SELL = 6,
    MONETARY_SYSTEM__CURRENCY_MINTING = 7,
    MONETARY_SYSTEM__CURRENCY_DELETION = 8,

    DATA__TAGGED_DATA_UPLOAD = 0,

    SHUFFLING__CREATION = 0,
    SHUFFLING__REGISTRATION = 1,
    SHUFFLING__PROCESSING = 2,
    SHUFFLING__RECIPIENTS = 3,
    SHUFFLING__VERIFICATION = 4,
    SHUFFLING__CANCELLATION = 5,

    ALIASES__ALIAS_ASSIGNMENT = 0,
    ALIASES__ALIAS_SELL = 1,
    ALIASES__ALIAS_BUY = 2,
    ALIASES__ALIAS_DELETE = 3,

    VOTING__POLL_CREATION = 0,
    VOTING__VOTE_CASTING = 1,
    VOTING__PHASING_VOTE_CASTING = 2,

    ACCOUNT_PROPERTY__ACCOUNT_INFO = 0,
    ACCOUNT_PROPERTY__SET = 1,
    ACCOUNT_PROPERTY__DELETE = 2,

    COIN_EXCHANGE__ORDER_ISSUE = 0,
    COIN_EXCHANGE__ORDER_CANCEL = 1,

    CONTRACT_REFERENCE__SET = 0,
    CONTRACT_REFERENCE__DELETE = 1
}

export interface GetBlockchainTransactionsResponse {
    requestProcessingTime: number;
    transactions: [ objectAny? ];
}


export interface GetBundlerRatesParams {
    minBundlerBalanceFXT?: number;
    minBundlerFeeLimitFQT?: number;
}

export interface GetBundlerRatesResponse {
    rates: [{
        minRateNQTPerFXT: string;
        currentFeeLimitFQT: string;
        chain: number;
        accountRS: string;
        account: string;
    }];
    requestProcessingTime: string;
}


export interface GetAccountPropertiesParams {
    recipient?: string;
    setter?: string;
    property?: string;
}

export interface GetAccountPropertiesResponse {
    setterRS?: string;
    setter?: string;
    recipientRS?: string;
    recipient?: string;
    requestProcessingTime: number;
    properties: [{
        recipientRS?: string;
        recipient?: string;
        setterRS?: string;
        setter?: string;
        property: string;
        value: string;
    }?];
}


export interface SendMoneyParams {
    chain: ChainId;
    secretPhrase: string;
    recipient: string;
    amountNQT: number;
    [name: string]: any;
}

export interface SendMoneyResponse extends BroadcastTransactionResponse {}


export interface BroadcastTransactionParams {
    transactionJSON?: objectAny;
    transactionBytes?: string;
    prunableAttachmentJSON?: objectAny;
}

export interface BroadcastTransactionResponse {
    requestProcessingTime: number;
    fullHash: string;
}


export interface SetAccountPropertyParams {
    chain: ChainId;
    recipient: string;
    property: string;
    value: string;
    secretPhrase: string;
    [name: string]: any;
}

export interface SetAccountPropertyResponse extends BroadcastTransactionResponse {}


export interface DeleteAccountPropertyParams {
    chain: ChainId;
    property: string;
    secretPhrase: string;
    recipient?: string;
    setter?: string;
    [name: string]: any;
}

export interface DeleteAccountPropertyResponse extends BroadcastTransactionResponse {}


export interface IRequest {
    getBalance: (url: string, params: GetBalanceParams) => Promise<GetBalanceResponse>;
    getBlockchainTransactions: (url: string, params: GetBlockchainTransactionsParams) => Promise<GetBlockchainTransactionsResponse>;
    decodeToken: (url: string, params: DecodeTokenParams) => Promise<DecodeTokenResponse>;
    getBundlerRates: (url: string, params: GetBundlerRatesParams) => Promise<GetBundlerRatesResponse>;
    getAccountProperties: (url: string, params: GetAccountPropertiesParams) => Promise<GetAccountPropertiesResponse>;
    sendMoney: (url: string, params: SendMoneyParams) => Promise<SendMoneyResponse>;
    broadcastTransaction: (url: string, params: BroadcastTransactionParams) => Promise<BroadcastTransactionResponse>;
    setAccountProperty: (url: string, params: SetAccountPropertyParams) => Promise<SetAccountPropertyResponse>;
    deleteAccountProperty: (url: string, params: DeleteAccountPropertyParams) => Promise<DeleteAccountPropertyResponse>;
}


export interface IPassphrase {
    generate: () => string;
}


export interface IAccount {
    convertPassphraseToPublicKey: (passphrase: string, toByteArray?: boolean) => string | Array<number>;
    convertPublicKeyToAccountId: (publicKey: string) => string;
    convertPublicKeyToAccountRs: (publicKey: string) => string;
    convertPassphraseToAccountId: (passphrase: string) => string;
    convertPassphraseToAccountRs: (passphrase: string) => string;
    checkAccountRs: (accountRs: string) => boolean;
    generateToken: (message: string, passphrase: string, forTestnet?: boolean) => string;
    signTransactionBytes: (unsignedTransactionBytesHex: string, passphrase: string) => string;
    verifyTransactionBytes: (unsignedTransactionBytesHex: string, transactionType: string, transactionJSON: object, publicKey: string) => boolean;
}


export interface ITime {
    convertUnixToArdorTimestamp: (timestampInMsec: number, isTestnetTimestamp?: boolean) => number;
    convertArdorToUnixTimestamp: (timestamp: number, isTestnetTimestamp?: boolean) => number;
}