import React from "react";
import Logo from "../../assets/navbar-logo.png";
import "./NavBar.css";

export const NavBar = () => {
    return (
        <nav className="navbar navbar-light bg-light">
            <div className="container p-1">
                <a href="#" className="navbar-brand">
                    <img src={Logo} alt="Logo" height={35}/>
                </a>
            </div>
        </nav>
    );
};

export default NavBar;