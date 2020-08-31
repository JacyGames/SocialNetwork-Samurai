import React from "react";
import {Field, InjectedFormProps, reduxForm} from "redux-form";
import {TextArea} from "../common/CustomHTML/ValidateInput";
import {maxlenght} from "../common/validation/validator";
import classes from "./ProfileAddPostForm.module.css";

type PropsType = {

}
export type SubmitDialogType = {
    message: string
}

let maxLength = maxlenght(100);

let MessageTypeFrom: React.FC<PropsType & InjectedFormProps<SubmitDialogType, PropsType>> = (props) => {

    let referral: React.RefObject<any> = React.createRef();

    return (<div className={classes.forMessageFrom}>
            <form onSubmit={props.handleSubmit} className={classes.form}>

                <Field onKeyDown={(e: any) => {
                    if (e.key === "Enter") {
                        e.preventDefault();
                        referral.current.click();
                    }
                }} className={classes.textarea} component={TextArea} validate={[maxLength]} name="message"
                       placeholder={"type a message"}/>
                <button ref={referral} className={classes.btn}>Submit</button>
            </form>
        </div>

    )
}
const MessageTypeFromRedux = reduxForm<SubmitDialogType, PropsType>({form: "message"})(MessageTypeFrom);


export default MessageTypeFromRedux;
