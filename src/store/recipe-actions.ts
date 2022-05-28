import {recipeAPI} from "../api/recipeAPI";
import {AppThunk} from "./index";
import {recipeActions} from "./recipe-slice";
import {AxiosError} from "axios";

export const getRecipe = (recipeId: string): AppThunk => {
    return async (dispatch) => {
        recipeAPI
            .getRecipe(recipeId)
            .then(({data}) => {
                dispatch(
                    recipeActions.setRecipe(
                        data
                    )
                );
            })
            .catch((reason: AxiosError) => {
                if (reason.response?.status === 404) {

                } else {

                }
            });
    }
}