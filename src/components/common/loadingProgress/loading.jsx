import React from "react";
import load from "../../../images/load.svg"
import classes from "./loadingStyles.module.css"


const Loader = () => {
    return <div className={classes.loadcontainer}>
        <img width="100px" src={load} alt=""/>
    </div>
}

export default Loader;