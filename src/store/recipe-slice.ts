import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {Product, Recipe} from "../interfaces";
import {RootState} from "./index";

interface IRecipeSlice {
    recipe: Recipe;
    activeStage: number;
};

const initialState: IRecipeSlice = {
    recipe: {
        displayName: "Naleśniki szybkie, łatwe i proste",
        description: "Bardzo dobre, super szybkie najlepsze na swiecie nalesniki z dzemem",
        imageURL: "...",
        stages: [
            {
                description: null,
                heat: 0,
                mix: 5,
                duration: 40,
                ingredients: []
            },
        ]
    },
    activeStage: 0
};
export const recipeSlice = createSlice({
    name: "recipe",
    initialState,
    reducers: {
        setRecipe: (state, action: PayloadAction<Recipe>) => {
            state.recipe = action.payload;
        },
        setDisplayName: (state, action: PayloadAction<string>) => {
            state.recipe.displayName = action.payload;
        },
        setImageURL: (state, action: PayloadAction<string>) => {
            state.recipe.imageURL = action.payload;
        },
        setDescription: (state, action: PayloadAction<string>) => {
            state.recipe.description = action.payload;
        },
        setHeat: (state, action: PayloadAction<number>) => {
            state.recipe.stages[state.activeStage].heat = action.payload;
        },
        setMix: (state, action: PayloadAction<number>) => {
            state.recipe.stages[state.activeStage].mix = action.payload;
        },
        setDuration: (state, action: PayloadAction<number>) => {
            state.recipe.stages[state.activeStage].duration = action.payload;
        },
        addStage: (state) => {
            state.recipe.stages.push({
                description: null,
                heat: 0,
                mix: 0,
                duration: 0,
                ingredients: []
            })
        },
        setActiveStage: (state, action: PayloadAction<number>) => {
            state.activeStage = action.payload;
        },
        addIngredient: (state, action: PayloadAction<Product>) => {
            const activeStage = state.recipe.stages[state.activeStage];
            const exist = activeStage.ingredients.findIndex(
                (value) => {
                    return value.product._id.$oid === action.payload._id.$oid;
                }
            ) !== -1;
            if (!exist) {
                activeStage.ingredients.push(
                    {
                        product: action.payload,
                        amount: action.payload.amount
                    }
                );
            }
        },
        removeIngredientByOID: (state, action: PayloadAction<string>) => {
            const activeStage = state.recipe.stages[state.activeStage];

            activeStage.ingredients = activeStage.ingredients.filter(
                (value) => value.product._id.$oid !== action.payload
            );
        },
        changeIngredient: (state, action: PayloadAction<{oid: string, value: number}>) => {
            const activeStage = state.recipe.stages[state.activeStage];

            const ingredientId = activeStage.ingredients.findIndex(
                (value) => value.product._id.$oid === action.payload.oid
            );

            activeStage.ingredients[ingredientId].amount = action.payload.value;
        }
    }
});

export const selectRecipe = (state: RootState) => state.recipe.recipe;

export const selectDisplayName = (state: RootState) => state.recipe.recipe.displayName;
export const selectImageURL = (state: RootState) => state.recipe.recipe.imageURL;
export const selectDescription = (state: RootState) => state.recipe.recipe.description;

export const selectStages = (state: RootState) => state.recipe.recipe.stages;
export const selectCurrentStage = (state: RootState) => state.recipe.recipe.stages[state.recipe.activeStage];

export const selectActiveStage = (state: RootState) => state.recipe.activeStage;

export const selectIngredients = (state: RootState) => state.recipe.recipe.stages[state.recipe.activeStage].ingredients;


export const recipeActions = recipeSlice.actions;