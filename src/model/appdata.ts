interface AppData {
    url: string;
    sessionId: string;
    msisdn: string;

    // Request configs
    requestType: "xml" | "json";
    requestSample: string;
    requestMsisdnKey: string;
    requestSessionKey: string;
    requestMessageKey: string;
    requestSessionTypeKey: string;

    // Response configs
    responseType: "xml" | "json";
    responseMessageKey: string;
    responseSample: string;
    responseSessionTypeKey: string;
}

export default AppData