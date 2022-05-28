import React, {useEffect, useState} from "react";
import {useHistory, useParams} from "react-router-dom";
import {IRecipeViewerRoute, Recipe} from "../interfaces";
import {recipeAPI} from "../api/recipeAPI";
import {AxiosError} from "axios";

interface IRecipeViewerPageProps {

}

export const RecipeViewerPage: React.FC<IRecipeViewerPageProps> = (props) => {
    const history = useHistory();
    const {page} = useParams<IRecipeViewerRoute>();

    const [allRecipes, setAllRecipes] = useState<Recipe[]>([]);
    const [pages, setPages] = useState<{
        pages: number;
        has_prev: boolean;
        has_next: boolean;
    }>({has_next: false, has_prev: false, pages: 1});

    useEffect(() => {
        recipeAPI.getAll(page ?? '1').then(({data}) => {
            setAllRecipes(data.items);
            setPages({
                pages: data.pages,
                has_prev: data.has_prev,
                has_next: data.has_next
            });
        });
    }, [setAllRecipes, page]);

    const createNewRecipeHandler: React.MouseEventHandler = (e) => {
        e.preventDefault()
        recipeAPI.createNewRecipe().then(
            ({data}) => {
                history.push(`/recipe/${data}`);
            }
        ).catch((reason: AxiosError) => {
            console.log(reason);
        });
    };
    const editRecipeHandler: (recipeId: string | null) => React.MouseEventHandler = (recipeId) => (e) => {
        e.preventDefault();
        if (recipeId === null) {
            console.log("error");
            return;
        }
        history.push(`/recipe/${recipeId}`);
    };

    const goToPage = (pageNumber: number) => () => {
        history.push(`/${pageNumber}`);
        window.scrollTo({top: 0, behavior: 'smooth'});
    }

    return (
        <>
            <div className="container px-0 my-3">
                <button className={"btn btn-outline-dark"} onClick={createNewRecipeHandler}>Create recipe</button>
                <hr/>
            </div>
            <div className="container viewer--container__grid mb-5">
                {
                    allRecipes.map(
                        (recipe) => (
                            <div className="card py-3 pt-0" key={recipe._id?.$oid}>
                                <img src={recipe.imageURL} className="card-img-top" alt="..."/>
                                <div className="card-body">
                                    <h5 className="card-title">{recipe.displayName}</h5>
                                    <p className="card-text">{recipe.description}</p>
                                </div>
                                <div className="card-body pb-0 d-flex justify-content-end align-items-end">
                                    <button className="btn btn-danger mx-1"
                                            onClick={editRecipeHandler(recipe._id?.$oid ?? null)}>Edit
                                    </button>
                                    <button className="btn btn-success mx-1">Run</button>
                                </div>
                            </div>
                        )
                    )
                }
            </div>
            <nav aria-label="Page navigation example">
                <ul className="pagination justify-content-center">
                    <li className={`page-item ${pages.has_next ? 'disabled' : ''}`}>
                        <button className="page-link" onClick={goToPage(Number(page ?? '1') - 1)}
                                aria-label="Previous">
                            Previous
                        </button>
                    </li>
                    {
                        Array(pages.pages).fill(0).map((value, index) => (
                            <li className="page-item" key={index}>
                                <button className="page-link" onClick={goToPage(index + 1)}>
                                    {index + 1}
                                </button>
                            </li>
                        ))
                    }
                    <li className={`page-item ${pages.has_prev ? 'disabled' : ''}`}>
                        <button className="page-link" onClick={goToPage(Number(page ?? '1') + 1)}
                                aria-label="Next">
                            Next
                        </button>
                    </li>
                </ul>
            </nav>
        </>
    )
}