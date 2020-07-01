import React from "react";
import classes from "./Navbar.module.css";
import {NavLink} from "react-router-dom";

const Nav = () => {
    return <nav className={classes.nav}>
        <div> <NavLink className={classes.item} activeClassName={classes.active} to="/Profile">Profile</NavLink>  </div>
        <div> <NavLink className={classes.item} activeClassName={classes.active} to="/Dialogs">Message</NavLink>  </div>
        <div> <NavLink className={classes.item} activeClassName={classes.active} to="/Users">Users</NavLink> </div>
        <div> <NavLink className={classes.item} activeClassName={classes.active} to="/News">News</NavLink> </div>
        <div> <NavLink className={classes.item} activeClassName={classes.active} to="/Music">Music</NavLink> </div>
        <div> <NavLink className={classes.item} activeClassName={classes.active} to="/Settings">Settings</NavLink> </div>

    </nav>
}
export default Nav;