import React from "react";
import {Link, NavLink} from "react-router-dom";
import Logo from "../../assets/navbar-logo.png"

export const NavBar = () => {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container">
                <Link to={"/"} className={"navbar-brand"}>
                    <img src={Logo} alt="Logo" height={35}/>
                </Link>
                <div className="d-flex flex-grow-1">
                    <div className="navbar-nav">
                        <NavLink to={"/"} className={"nav-item nav-link mr-auto"}>
                            Home Page
                        </NavLink>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default NavBar;