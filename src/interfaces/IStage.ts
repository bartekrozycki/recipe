import {Ingredient} from "./IIngredient";

export interface IStage {
    description: string | null;
    heat: number;
    mix: number;
    duration: number;
    ingredients: Ingredient[];
}

