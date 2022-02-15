import axios from "axios";
import { UssdRequest } from "../model/UssdRequest";
import UssdResponse from "../model/UssdResponse";


const callUssd = async (url: string, data: UssdRequest) => {
    const response = await axios.post(url, data);
    return response.data as UssdResponse;
}

export { callUssd }