import React from "react";
import {Field, reduxForm} from "redux-form";
import classes from "./ProfileAddPostForm.module.css"
import {maxlenght} from "../common/validation/validator";
import {TextArea} from "../common/CustomHTML/ValidateInput";

type PropsType = {
    handleSubmit: () => void
}


let maxLength = maxlenght(50);

let AddNewPost: React.FC<PropsType> = (props) => {
    let referal: React.RefObject<any> = React.createRef();



    return ( <form onSubmit={props.handleSubmit} className={classes.form}>
        <Field onKeyDown={(e: any) => {
            if(e.key === "Enter") {
                e.preventDefault();
                referal.current.click();
            }

        }}  className={classes.textarea} component={TextArea} validate={[maxLength]} placeholder="Add a new post" name="newpost"/>
        <button ref={referal}  className={classes.btn}>Add post</button>
    </form>)
}

const AddNewPostRedux = reduxForm<{}, PropsType>({form: "newpostForm"})(AddNewPost);





export default AddNewPostRedux;
