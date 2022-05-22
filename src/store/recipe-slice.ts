import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {Recipe} from "../interfaces";
import {RootState} from "./index";

interface IRecipeSlice {
    recipe: Recipe;
    activeStage: number;
};

const initialState: IRecipeSlice = {
    recipe: {
        displayName: "Naleśniki szybkie, łatwe i proste",
        stages: [
            {
                description: null,
                heat: 0,
                mix: 5,
                duration: 40,
                ingredients: [
                    {
                        product: {
                            uid: 1,
                            displayName: "Jajko",
                            amount: 1,
                            price: 1.3,
                            unit: "pcs",
                        },
                        amount: 2
                    },
                    {
                        product: {
                            uid: 2,
                            displayName: "Mąka pszenna",
                            amount: 500,
                            price: 5.3,
                            unit: "g",
                        },
                        amount: 200
                    },
                    {
                        product: {
                            uid: 3,
                            displayName: "Mleko",
                            amount: 1000,
                            price: 3,
                            unit: "ml",
                        },
                        amount: 250
                    },
                    {
                        product: {
                            uid: 4,
                            displayName: "Woda Gazowana",
                            amount: 1500,
                            price: 1.5,
                            unit: "ml",
                        },
                        amount: 250
                    },
                    {
                        product: {
                            uid: 5,
                            displayName: "Masło",
                            amount: 200,
                            price: 7,
                            unit: "g",
                        },
                        amount: 60
                    },
                    {
                        product: {
                            uid: 6,
                            displayName: "Sól",
                            amount: 500,
                            price: 7,
                            unit: "g",
                        },
                        amount: 1
                    },
                ]
            },
        ]
    },
    activeStage: 0
};
export const recipeSlice = createSlice({
    name: "recipe",
    initialState,
    reducers: {
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
                heat: 3,
                mix: 1,
                duration: 30,
                ingredients: [
                    {
                        product: {
                            displayName: "Jajko",
                            amount: 1,
                            unit: "pcs",
                            uid: 1,
                            price: 1.3
                        },
                        amount: 2
                    }
                ]
            })
        },
        setActiveStage: (state, action: PayloadAction<number>) => {
            state.activeStage = action.payload;
        }
    }
});

export const selectDisplayName = (state: RootState) => state.recipe.recipe.displayName;

export const selectStages = (state: RootState) => state.recipe.recipe.stages;
export const selectCurrentStage = (state: RootState) => state.recipe.recipe.stages[state.recipe.activeStage];

export const selectActiveStage = (state: RootState) => state.recipe.activeStage;


export const recipeActions = recipeSlice.actions;