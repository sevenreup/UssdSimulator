import { useUssd } from "context/UssdContext"
import { GeneralConfig, RequestConfig, ResponseConfig } from "model/configs";
import { useMutation, useQuery } from "react-query";
import { usePouch } from "use-pouchdb";
import { ConfigKeys } from "./config-docs";

const update = async (db: PouchDB.Database<any>, id: string, request: any) => {

    const doc = await db.get(id);
    try {
        const newDoc = {
            ...doc,
            ...request,
        }
        console.log({ request, newDoc });

        await db.put(newDoc) // And put the new version into the database.
        console.log("Updated");

    } catch (err: any) {
        console.log(err);

        if (err.name === 'conflict') {
            update(db, id, request) // There was a conflict, try again.
        } else {
            console.error(err) // Handle other errors.
        }
    }
}

const useSaveAppData = (value: any) => {
    const { setAppData } = useUssd();

    return useQuery("save_settings", async () => await setAppData?.(value), { retry: false })
}

const useUpdateResponseConfig = () => {
    const db = usePouch()
    return useMutation("update_response", async (data: ResponseConfig) => await update(db, ConfigKeys.response, data), { retry: false })
}
const useUpdateRequestConfig = () => {
    const db = usePouch()
    return useMutation("update_request", async (data: RequestConfig) => await update(db, ConfigKeys.request, data), { retry: false })
}

const useUpdateGeneralConfigConfig = () => {
    const db = usePouch()
    return useMutation("update_general", async (data: GeneralConfig) => await update(db, ConfigKeys.general, data), { retry: false })
}

export {
    useSaveAppData,
    useUpdateResponseConfig,
    useUpdateRequestConfig,
    useUpdateGeneralConfigConfig
}