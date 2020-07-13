import {Field, reduxForm} from "redux-form";
import React from "react";
import {Inputmine} from "../common/CustomHTML/ValidateInput";
import {maxlenght, required} from "../common/validation/validator";
import classes from "./ProfileAddPostForm.module.css"

let maxLength = maxlenght(30);

let LoginForm = (props) => {
  window.propsLog = props;
    return <div>
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field name="login" component={Inputmine} validate={[required, maxLength]} placeholder="Login"/>
            </div>
            <div>
                <Field name="password" component={Inputmine} validate={[required, maxLength]} type={"password"} placeholder="Password"/>
            </div>
            <div>
                <Field name="rememberMe" component={Inputmine} type="checkbox"/> Remember me
            </div>
            <div className={classes.error}>{props.error}</div>
            <div><button>Submit</button></div>
        </form>
    </div>
};

export default LoginForm = reduxForm({
    form: "loginform"
})(LoginForm);