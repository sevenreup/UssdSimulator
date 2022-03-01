import AppData from "../model/appdata";

const sampleResponse = `
{

}
`;

const sampleRequest = `
{

}
`;

class Datastore {
    static set(key: string, value: any): void {
        let data = value;
        if (typeof value !== "string") {
            data = JSON.stringify(value);
        }

        localStorage.setItem(key, data)
    }

    static get(key: string) {
        return localStorage.getItem(key);
    }

    static getData(): AppData {

        return {
            url: localStorage.getItem("url") ?? "https://localhost:44356/Mpamba/Ussd",
            sessionId: localStorage.getItem("sessionId") ?? "12345",
            msisdn: localStorage.getItem("msisdn") ?? "265997655406",
            responseType: localStorage.getItem("responseType") as any ?? "json",
            responseSample: localStorage.getItem("responseSample") ?? sampleResponse,
            requestType: localStorage.getItem("requestType") as any ?? "json",
            requestSample: localStorage.getItem("requestSample") ?? sampleRequest
        }
    }
}

export default Datastore