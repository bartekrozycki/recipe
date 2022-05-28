import axios, {AxiosResponse} from "axios";
import {Recipe} from "../interfaces";


const HEADERS_JSON = {

};

const API = axios.create(
    {
        baseURL: 'http://localhost:1340/',
    }
);

export const recipeAPI = {
    createNewRecipe: () => API.post<string>("/api/recipe/new"),
    getRecipe: (recipeId: string) => API.get<Recipe>(`/api/recipe/${recipeId}`),
    updateRecipe: (recipe: Recipe) => {
        const deepCopy = JSON.parse(JSON.stringify(recipe))
        const recipeId = deepCopy._id?.$oid;
        delete deepCopy._id;

        return API.post<Recipe>(`/api/recipe/${recipeId}`, deepCopy)
    },
    getAll: () => API.get<Recipe[]>(`/api/recipe`),
};


const POST_RECIPE_URL = `/api/recipe`;
export const postRecipe:((recipe: Recipe) => Promise<Recipe>) = async (recipe: Recipe) => {
    return await API
        .post(`${POST_RECIPE_URL}`, recipe, HEADERS_JSON)
        .then((response: AxiosResponse<Recipe>) => {
            return response.data;
        })
        .catch((error) => {
            return error;
        });
}