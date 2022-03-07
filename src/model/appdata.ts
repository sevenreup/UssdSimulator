interface AppData {
    url: string;
    sessionId: string;
    msisdn: string;
    requestType: "xml" | "json";
    requestSample: string;
    requestMsisdnKey: string;
    requestSessionKey: string;
    requestMessageKey: string;
    requestSessionTypeKey: string;
    responseType: "xml" | "json";
    responseMessageKey: string;
    responseSample: string;
}

export default AppData