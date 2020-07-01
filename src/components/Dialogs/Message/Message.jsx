import React from "react";
import classes from "./Message.module.css";


const Message = (props) => {
    return <div className={classes.message + " " + classes.to}> {props.message}</div>
}

export default Message;