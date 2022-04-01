interface GeneralConfig {
    url: string;
    sessionId: string;
    msisdn: string;
}

interface ResponseConfig {
    responseType: "xml" | "json";
    responseMessageKey: string;
    responseSample: string;
    responseSessionTypeKey: string;
}

interface RequestConfig {
    requestLocation: "body" | "query";
    requestType: "xml" | "json";
    requestSample: string;
    requestMsisdnKey: string;
    requestSessionKey: string;
    requestMessageKey: string;
    requestSessionTypeKey: string;
}

export type { GeneralConfig, ResponseConfig, RequestConfig }