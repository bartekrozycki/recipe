import {AnyAction, configureStore, ThunkAction} from "@reduxjs/toolkit";
import {recipeSlice} from "./recipe-slice";

export const store = configureStore({
    reducer: {
        recipe: recipeSlice.reducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, AnyAction>;