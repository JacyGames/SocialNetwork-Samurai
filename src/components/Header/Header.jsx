import React from "react";
import classes from "./Header.module.css";
import {NavLink} from "react-router-dom";
import logo from "../../images/Logo.png"

const Header = (props) => {
    return  <header className={classes.header}>
        <div className={classes.logoStyle}>
            <img  src={logo} alt=""/>
        </div>

        <div className={classes.currentUser}>
            {props.isAutorized ? props.login : <NavLink className={classes.author}  to="/login/">Login </NavLink>}


        </div>
    </header>
}

export default Header;