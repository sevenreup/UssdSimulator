import AppData from "model/appdata"
import UssdResponse from "model/UssdResponse"
import { useQuery } from "react-query"
import { callInitUssd, callUssd } from "./api"

const useInitUssdCall = (appdata: AppData) => {
    return useQuery<UssdResponse, Error>("init", async () => await callInitUssd(appdata), { retry: false })
}

const useUssdCall = (appdata: AppData, message: any) => {
    return useQuery<UssdResponse, Error>(`${message}_call`, async () => callUssd(appdata, message), {
        retry: false
    })
}

export {
    useInitUssdCall,
    useUssdCall
}