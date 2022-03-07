import axios from "axios";
import { XMLBuilder, XMLParser } from "fast-xml-parser";
import AppData from "../model/appdata";
import UssdResponse from "../model/UssdResponse";


const callUssdApi = async (appdata: AppData, data: any) => {
    const response = await axios.post(appdata.url, data);
    return parseResponse(appdata, response.data);
}

const callInitUssd = async (appdata: AppData) => {
    const requestBody = createRequest(appdata, "0", "1");
    console.log(requestBody);
    return await callUssdApi(appdata, requestBody);
}

const callUssd = async (appdata: AppData, message: any) => {
    const requestBody = createRequest(appdata, message, "2");
    console.log(requestBody);
    return await callUssdApi(appdata, requestBody);
}

function createRequest({ requestSample, requestType, requestMsisdnKey, requestMessageKey, requestSessionTypeKey, msisdn, sessionId, requestSessionKey }: AppData, message: string, sessionType: string) {

    let requestBody;

    if (requestType === "xml") {
        const options = {
            ignoreAttributes: false
        };

        const parser = new XMLParser(options);
        let json = parser.parse(requestSample);
        json[Object.keys(json)[0]][requestSessionKey] = sessionId;
        json[Object.keys(json)[0]][requestMsisdnKey] = msisdn;
        json[Object.keys(json)[0]][requestMessageKey] = message;

        const buildOptions = {
            ignoreAttributes: false
        };

        const builder = new XMLBuilder(buildOptions);
        requestBody = builder.build(json);

    } else {
        requestBody = JSON.parse(requestSample);

        requestBody[requestSessionKey] = sessionId;
        requestBody[requestMsisdnKey] = msisdn;
        requestBody[requestMessageKey] = message;
        requestBody[requestSessionTypeKey] = sessionType;
    }

    return requestBody;
}

function parseResponse({ responseMessageKey, responseSessionTypeKey, responseType }: AppData, data: any): UssdResponse {
    if (responseType === "xml") {
        const options = {
            ignoreDeclaration: true,
        };

        const parser = new XMLParser(options);
        let jsonObj = parser.parse(data);
        let firstObj = jsonObj[Object.keys(jsonObj)[0]];

        return {
            response: firstObj[responseMessageKey],
            sessionType: firstObj[responseSessionTypeKey]
        };
    } else {

        return {
            response: data[responseMessageKey],
            sessionType: data[responseSessionTypeKey]
        };
    }
}


export { callUssd, callInitUssd }