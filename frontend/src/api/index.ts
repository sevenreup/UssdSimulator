import { useUssd } from "@/context/UssdContext"
import { useQuery } from "react-query"
import { callInitUssd, callUssd } from "./api"

const useUssdCall = (message: string) => {
    const { generalConfig, responseConfig, requestConfig } = useUssd();

    return useQuery("save_settings", async () => await callUssd(generalConfig, requestConfig, responseConfig, message), { retry: false })
}

const useInitUssdCall = () => {
    const { generalConfig, responseConfig, requestConfig } = useUssd();

    return useQuery("save_settings", async () => await callInitUssd(generalConfig, requestConfig, responseConfig), { retry: false })
}


export {
    useInitUssdCall,
    useUssdCall
}