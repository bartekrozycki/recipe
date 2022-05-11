import React from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';

import Logo from "./assets/navbar-logo.png";

const NavBar = () => <nav className="navbar navbar-light bg-light">
    <div className="container">
        <a href="#" className="navbar-brand">
            <img src={Logo} alt="Logo" height={35}/>
        </a>
    </div>
</nav>;

const App = () => (
    <div className="container-fluid">

        <NavBar/>

    </div>
);

export default App;
