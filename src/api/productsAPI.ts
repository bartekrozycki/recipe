import axios, {AxiosResponse} from "axios";
import {Product} from "../interfaces";

export const productsAPI = axios.create(
    {
        baseURL: 'http://localhost:1339/'
    }
);

export const getProductsSuggestions:((text: string) => Promise<Product[]>) = async (text: string) => {
    return await productsAPI
        .get(`/search?text=${text}`)
        .then((response: AxiosResponse<Product[]>) => {
            return response.data;
        })
        .catch((error) => {
            return error;
        });
}