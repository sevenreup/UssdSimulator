import { useUssd } from "context/UssdContext"
import { useQuery } from "react-query";

const useSaveAppData = (value: any) => {
    const { setAppData } = useUssd();

    return useQuery("save_settings", async () => await setAppData?.(value), { retry: false })
}


export {
    useSaveAppData
}