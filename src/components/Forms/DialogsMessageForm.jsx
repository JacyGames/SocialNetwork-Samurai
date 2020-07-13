import React from "react";
import {Field, reduxForm} from "redux-form";
import {TextArea} from "../common/CustomHTML/ValidateInput";
import {maxlenght, required} from "../common/validation/validator";
import classes from "./ProfileAddPostForm.module.css";

let maxLength = maxlenght(100);

let MessageTypeFrom = (props) => {
    let referal = React.createRef();
    return (<div className={classes.forMessageFrom}>
            <form onSubmit={props.handleSubmit} className={classes.form}>
                <Field onKeyDown={(e) => {
                    if(e.key == "Enter") {
                        e.preventDefault();
                        referal.current.click();
                    }
                }} className={classes.textarea} component={TextArea} validate={[maxLength]} name="message"
                       placeholder={"type a message"}/>
                <button ref={referal} className={classes.btn}>Submit</button>
            </form>
        </div>

    )
}
MessageTypeFrom = reduxForm({form: "message"})(MessageTypeFrom)


export default MessageTypeFrom;