import React from "react";
import classes from "./ValidateInput.module.css"


export const TextArea = ({input, meta, ...props}) => {
    return (

        <div>

            <div>
                <textarea className={meta.touched && meta.error && classes.input} {...input} {...props}/>
            </div>
            <div>
                {meta.touched && meta.error && <span className={classes.error}>{meta.error}</span>}

            </div>
        </div>
    )

}

export const Inputmine = ({input, meta, ...props}) => {
    return (

        <div>

            <div>
                <input className={meta.touched && meta.error && classes.input} {...input} {...props}/>
            </div>
            <div>
                {meta.touched && meta.error && <span className={classes.error}>{meta.error}</span>}

            </div>
        </div>
    )

}