import React from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import {Recipe} from "./components/Recipe";
import NavBar from "./components/ui/NavBar";
import {Provider} from "react-redux";
import {store} from "./store";

const App = () => (
    <div className="container-fluid p-0">
        <NavBar/>

        <Provider store={store} >
            <Recipe headerFormat={"Step %n"}/>
        </Provider>
    </div>
);

export default App;
