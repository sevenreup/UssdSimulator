import axios from "axios";
import { XMLBuilder, XMLParser } from "fast-xml-parser";
import { GeneralConfig, RequestConfig, ResponseConfig } from "model/configs";
import UssdResponse from "../model/UssdResponse";


const callUssdApi = async (general: GeneralConfig, response: ResponseConfig, params?: any, data?: any) => {
    const apiResponse = await axios.post(general.url, data, { params: params });
    return parseResponse(response, apiResponse.data);
}

const callInitUssd = async (general: GeneralConfig, request: RequestConfig, response: ResponseConfig) => {
    return await callUssd(general, request, response, "0", "1");
}

const callUssd = async (general: GeneralConfig, request: RequestConfig, response: ResponseConfig, message: any, sessionType: any = "2") => {
    if (request.requestLocation === "body") {
        const requestBody = createRequestBody(general, request, message, sessionType);
        return await callUssdApi(general, response, null, requestBody);
    } else {
        const data = createRequestQuery(general, request, message, sessionType);
        return await callUssdApi(general, response, data, null);
    }
}

function createRequestBody(general: GeneralConfig, request: RequestConfig, message: string, sessionType: string) {
    const { requestSample, requestType, requestMsisdnKey, requestMessageKey, requestSessionTypeKey, requestSessionKey } = request;
    const { msisdn, sessionId } = general;

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

function createRequestQuery(general: GeneralConfig, request: RequestConfig, message: string, sessionType: string) {
    const data: { [key: string]: any } = {};
    data[request.requestMessageKey] = message;
    data[request.requestSessionTypeKey] = sessionType;
    data[request.requestMsisdnKey] = general.msisdn;
    data[request.requestSessionKey] = general.sessionId;

    return data;
}

function parseResponse({ responseMessageKey, responseSessionTypeKey, responseType }: ResponseConfig, data: any): UssdResponse {
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