import axios from "axios";

const api = axios.create({
    baseURL: ""
})

const postUssd = async (data: any) => {
    const response = await api.post('', data);
    return response.data;
}

export { postUssd }