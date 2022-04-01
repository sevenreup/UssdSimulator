import { GeneralConfig, ResponseConfig, RequestConfig } from "model/configs";
import { useAllDocs, useDoc } from "use-pouchdb";

const sampleResponse = `
{
    "response": "string",
    "sessionType": "12"
}
`;

const sampleRequest = `
{
    "Msisdn": 12342,
    "SessionId": 1212121,
    "Message": "Jump",
    "SessionType": "12"
}
`;

export const ConfigKeys = {
  request: "conf_request_doc",
  response: "conf_response_doc",
  general: "conf_general_doc",
};

export const generalDocSample: GeneralConfig = {
  url: "https://localhost:44356/Mpamba/Ussd",
  sessionId: "12345",
  msisdn: "265997655406",
  timeout: 6000
};

export const requestDocSample: RequestConfig = {
  requestLocation: "body",
  requestMsisdnKey: "msidnKey",
  requestSessionKey: "sessionKey",
  requestMethod: "POST",
  requestSessionTypeKey: "sessionTypeKey",
  requestType: "json",
  requestMessageKey: "message",
  requestSample: sampleRequest,
};

export const responseDocSample: ResponseConfig = {
  responseType: "json",
  responseSample: sampleResponse,
  responseMessageKey: "message",
  responseSessionTypeKey: "0",
};

export const useGetAllConfigs = () => {
  const data = useAllDocs({
    include_docs: true,
  });
  return data;
};

export const useGetGeneralDoc = () => {
  return useDoc<GeneralConfig>(ConfigKeys.general, undefined);
};

export const useGetResponseDoc = () => {
  return useDoc<ResponseConfig>(
    ConfigKeys.response,
    undefined,
    responseDocSample
  );
};

export const useGetRequestDoc = () => {
  return useDoc<RequestConfig>(ConfigKeys.request, undefined, requestDocSample);
};
