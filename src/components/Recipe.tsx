import React, {useState} from "react";
import StageSelector from "./recipe-components/StageSelector";
import RecipeStage from "./recipe-components/RecipeStage";
import {useSelector} from "react-redux";
import {selectDisplayName} from "../store/recipe-slice";

interface IRecipeProps {
    // %n - step number
    headerFormat: string;
}

export const Recipe: React.FC<IRecipeProps> = (props) => {

    const displayName = useSelector(selectDisplayName);

    return (
        <div className="container p-1">

            <div className="row p-0">
                <h1 style={{fontFamily: "'Roboto Flex', sans-serif", fontWeight: 400}}>{displayName}</h1>
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
                    <button className="btn btn-primary float-end">Save</button>
                </div>
            </div>
        </div>
    )
};

