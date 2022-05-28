import {Recipe} from "./IRecipe";

export interface IRecipesResponse {
    items: Recipe[];
    pages: number;
    has_prev: boolean;
    has_next: boolean;
}