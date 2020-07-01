import React from "react";
import classes from "./Dialog.module.css";
import {NavLink} from "react-router-dom";


const Dialog = (props) => {
    return <NavLink to={"/dialogs/" + props.id} className={classes.wrap}>
        <img className={classes.image}
             src="https://i.pinimg.com/originals/04/a8/73/04a87347b071ec062a586e02c23f6221.png" alt=""/>
        <div className={classes.chat} >{props.name}</div>
    </NavLink>
}

export default Dialog;