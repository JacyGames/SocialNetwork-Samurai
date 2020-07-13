import React from "react";
import classes from "./Header.module.css";
import {NavLink} from "react-router-dom";
import logo from "../../images/Logo.png"
import classes2 from "../Forms/ProfileAddPostForm.module.css"

const Header = (props) => {
    return  <header className={classes.header}>
        <div className={classes.logoStyle}>
            <img  src={logo} alt=""/>
        </div>

        <div className={classes.currentUser}>
            {props.isAutorized ? <div><span className={classes.autorizedName}>{props.login}</span> <button className={classes2.btn} onClick={props.LogOut}>LogOut</button></div> : <NavLink className={classes.author}  to="/login/">Login </NavLink>}


        </div>
    </header>
}

export default Header;