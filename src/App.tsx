import React from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import NavBar from "./components/ui/NavBar";
import {Route, Switch} from "react-router-dom";
import {RecipeEditorPage} from "./pages/RecipeEditorPage";
import {RecipeViewerPage} from "./pages/RecipeViewerPage";

const App = () => {

    return (
        <div className="container-fluid p-0">
            <NavBar/>

            <Switch>
                <Route path={"/recipe/:recipeId"}>
                    <RecipeEditorPage headerFormat={"Step %n"}/>
                </Route>
                <Route path={"/:page?"}>
                    <RecipeViewerPage />
                </Route>
            </Switch>
        </div>
    );
};

export default App;
