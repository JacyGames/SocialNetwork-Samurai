import {Field, InjectedFormProps, reduxForm} from "redux-form";
import React from "react";
import {Inputmine} from "../common/CustomHTML/ValidateInput";
import {maxlenght, required} from "../common/validation/validator";
import classes from "./ProfileAddPostForm.module.css"
import {SubmittingPropsType} from "../Login/Login";


type PropsType = {
    captchaUrl: string | null

}

let maxLength = maxlenght(30);

let LoginForm: React.FC<PropsType & InjectedFormProps<SubmittingPropsType, PropsType>> = (props) => {

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
            {props.captchaUrl && <div>
                <img src={props.captchaUrl} alt=""/>
                <Field name={"captcha"} component={Inputmine} validate={[required]} placeholder={"text from image"} />
            </div> }
            <div><button>Submit</button></div>

        </form>
    </div>
};
const LoginFormRedux = reduxForm<SubmittingPropsType, PropsType>({
    form: "loginform"
})(LoginForm);

export default LoginFormRedux;
