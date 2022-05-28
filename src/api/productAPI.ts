import axios, {AxiosResponse} from "axios";
import {Product} from "../interfaces";

const BASE_URL = 'http://localhost:1339/';
const INGREDIENTS_SEARCH_URL = `/api/product/search`;

export const productAPI = axios.create(
    {
        baseURL: BASE_URL
    }
);

export const getProductsSuggestions:((text: string) => Promise<Product[]>) = async (text: string) => {
    return await productAPI
        .get(`${INGREDIENTS_SEARCH_URL}?text=${text}`)
        .then((response: AxiosResponse<Product[]>) => {
            return response.data;
        })
        .catch((error) => {
            return error;
        });
}