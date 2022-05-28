import React, {useEffect, useState} from "react";
import {useHistory} from "react-router-dom";
import {Recipe} from "../interfaces";
import {recipeAPI} from "../api/recipeAPI";
import {AxiosError} from "axios";

interface IRecipeViewerPageProps {

}

export const RecipeViewerPage: React.FC<IRecipeViewerPageProps> = (props) => {
    const history = useHistory();

    const [allRecipes, setAllRecipes] = useState<Array<Recipe>>([]);

    useEffect(() => {
        recipeAPI.getAll().then(({data}) => {
            setAllRecipes(data);
        });
    }, [setAllRecipes]);

    const createNewRecipeHandler: React.MouseEventHandler = (e) => {
        e.preventDefault()
        recipeAPI.createNewRecipe().then(
            ({data}) => {
                history.push(`/recipe/${data}`);
            }
        ).catch((reason: AxiosError) => {
            console.log(reason);
        })
    };
    const editRecipeHandler: (recipeId: string | null) => React.MouseEventHandler = (recipeId) => (e) => {
        e.preventDefault();
        if (recipeId === null) {
            console.log("error");
            return;
        }
        history.push(`/recipe/${recipeId}`);
    };
    return (
        <>
            <div className="container px-0 my-3">
                <button className={"btn btn-outline-primary"} onClick={createNewRecipeHandler}>Create recipe</button>
                <hr/>
            </div>
            <div className="container">
                <div className="row">
                    {
                        allRecipes.map(
                            (recipe) => (
                                <div className="card col-3 py-3 mx-1 my-1" key={recipe._id?.$oid}>
                                    <img src={'https://2.bp.blogspot.com/-84NppGSgmgc/Uhii-UjEXkI/AAAAAAAACRU/usFMsI9KnHY/s1600/nale%C5%9Bniki.png'} className="card-img-top" alt="..." />
                                    <div className="card-body">
                                        <h5 className="card-title">{recipe.displayName}</h5>
                                        <p className="card-text">{recipe.description}</p>
                                    </div>
                                    <div className="card-body pb-0 d-flex justify-content-end">
                                        <a href="#" className="btn btn-danger mx-1" onClick={editRecipeHandler(recipe._id?.$oid ?? null)}>Edit</a>
                                        <a href="#" className="btn btn-success mx-1">Run</a>
                                    </div>
                                </div>
                            )
                        )
                    }
                </div>
            </div>
        </>
    )
}