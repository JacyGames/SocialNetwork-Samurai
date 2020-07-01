import React from "react";
import {Field, reduxForm} from 'redux-form'
import classes from "./LoginStyle.module.css"


let LoginForm = (props) => {
    return <div>
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field name="Login" component="input" placeholder="Login"/>
            </div>
            <div>
                <Field name="Password" component="input" placeholder="Password"/>
            </div>
            <div>
                <Field name="IsRemembered" component="input" type="checkbox"/> Remember me
            </div>
            <div><button>Submit</button></div>
        </form>
    </div>
};

    LoginForm = reduxForm({
        form: "loginform"
    })(LoginForm);

const Login = () => {
    let LogData = (compareData) => {
        alert(compareData);
    }
    return <div className={classes.formbackground}>
        <div className={classes.form}>
            <h1>Login</h1>
            <LoginForm onSubmit={LogData}/>
        </div>
    </div>
}



export default  Login;