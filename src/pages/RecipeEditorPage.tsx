import React, {useEffect, useState} from "react";
import StageSelector from "../components/recipe-components/StageSelector";
import RecipeStage from "../components/recipe-components/RecipeStage";
import {useDispatch, useSelector} from "react-redux";
import {recipeActions, selectDisplayName, selectRecipe} from "../store/recipe-slice";
import {AppDispatch} from "../store";
import {useParams} from "react-router-dom";
import {IRecipeEditorRoute} from "../interfaces";
import {recipeAPI} from "../api/recipeAPI";
import {AxiosError} from "axios";

interface IRecipeProps {
    // %n - step number
    headerFormat: string;
}

export const RecipeEditorPage: React.FC<IRecipeProps> = (props) => {
    const {recipeId} = useParams<IRecipeEditorRoute>();

    const dispatch = useDispatch<AppDispatch>();
    const displayName = useSelector(selectDisplayName);
    const recipe = useSelector(selectRecipe);

    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    const saveHandler: React.MouseEventHandler = (event) => {
        event.preventDefault();
        recipeAPI
            .updateRecipe(recipe)
            .then(
                (response) => {
                    console.log(response);
                }
            )
            .catch(
                (reason: AxiosError) => {
                    console.log(reason);
                }
            );
    }

    useEffect(() => {
        recipeAPI
            .getRecipe(recipeId)
            .then(
                ({data}) => {
                    dispatch(
                        recipeActions.setRecipe(
                            data
                        )
                    );
                    setIsLoading(false);
                }
            )
            .catch(
                (reason: AxiosError) => {
                    if (reason.response?.status) {
                        setError("Not found");
                    } else {
                        setError(reason.message);
                    }
                    setIsLoading(false);
                }
            );

    }, [dispatch, recipeId, setError, setIsLoading]);


    return (
        <div className="container p-1">

            {
                error === null
                    ? (
                        !isLoading && (
                            <>
                                <div className="row p-0">
                                    <h1 style={{
                                        fontFamily: "'Roboto Flex', sans-serif",
                                        fontWeight: 400
                                    }}>{displayName}</h1>
                                </div>


                                <div className="row p-0">
                                    <div className="col-12 mb-4 col-md-3 mb-md-0">
                                        <StageSelector headerFormat={props.headerFormat}/>
                                    </div>
                                    <div className="col-12 col-md-9">
                                        <RecipeStage headerFormat={props.headerFormat}/>
                                    </div>
                                </div>


                                <div className="row p-0 my-3">
                                    <div className="col-9"></div>
                                    <div className="col-3">
                                        <button className="btn btn-primary float-end" onClick={saveHandler}>Save</button>
                                    </div>
                                </div>
                            </>
                        )
                    ) : (
                        <h3 className={"text-center"}> {error} </h3>
                    )
            }

        </div>
    )
};

