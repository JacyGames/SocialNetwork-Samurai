import React from "react";
import {Field, reduxForm} from "redux-form";
import classes from "./ProfileAddPostForm.module.css"
import {maxlenght, required} from "../common/validation/validator";
import {TextArea} from "../common/CustomHTML/ValidateInput";

let maxLength = maxlenght(50);

let AddNewPost = (props) => {
    let referal = React.createRef();

    return ( <form onSubmit={props.handleSubmit} className={classes.form}>
        <Field onKeyDown={(e) => {
            if(e.key == "Enter") {
                e.preventDefault();
                referal.current.click();
            }

        }}  className={classes.textarea} component={TextArea} validate={[maxLength]} placeholder="Add a new post" name="newpost"/>
        <button ref={referal}  className={classes.btn}>Add post</button>
    </form>)
}

AddNewPost = reduxForm({form: "newpostForm"})(AddNewPost);





export default AddNewPost;