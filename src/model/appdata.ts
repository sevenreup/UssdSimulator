interface AppData {
    url: string;
    sessionId: string;
    msisdn: string;
    requestType: "xml" | "json";
    requestSample: string;
    responseType: "xml" | "json";
    responseSample: string;
}

export default AppData