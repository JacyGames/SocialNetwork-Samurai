import React from "react";
import classes from "./ValidateInput.module.css"
import classNames from 'classnames';

type MetaType = {
    touched: boolean
    error: boolean
}

type PropsType = {
    input: boolean
    meta: MetaType
    touched: boolean
}

export const TextArea: React.FC<PropsType> = ({input, meta, ...props}) => {

    return (
        <div>
            <div>
                <textarea className={classNames({[classes.input]: meta.touched && meta.error})} {...input} {...props}/>
            </div>
            <div>
                {meta.touched && meta.error && <span className={classes.error}>{meta.error}</span>}
            </div>
        </div>
    )
}

export const Inputmine: React.FC<PropsType> = ({input, meta, ...props}) => {
    return (
        <div>
            <div>
                <input className={classNames(classes.default, {[classes.input]: meta.touched && meta.error})} {...input} {...props}/>
            </div>
            <div>
                {meta.touched && meta.error && <span className={classes.error}>{meta.error}</span>}
            </div>
        </div>
    )

}
