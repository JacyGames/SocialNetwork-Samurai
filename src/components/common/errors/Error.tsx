import React from "react";
import classes from './Error.module.css'

type PropsType = {
    string: string
}

const Error: React.FC<PropsType> = ({string}) => {
    let parseof = string.split(">");
    parseof = parseof[1].split(")");

    return <div className={classes.errorField}>
        <div> Please, make sure you filled field correct </div>
        <div>Trouble in field: {parseof[0]} </div>
    </div>
}


export default Error;
