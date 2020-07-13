import React from "react";
import classes from "./LoginStyle.module.css"
import LoginForm from "../Forms/LoginForm";

import {connect} from "react-redux";
import {LogIn} from "../../redux/autorReducer";




const Login = (props) => {
    let LogData = (compareData) => {
       props.LogIn(compareData.login, compareData.password, compareData.rememberMe);

    }
    return <div className={classes.formbackground}>
        <div className={classes.form}>
            <h1>Login</h1>
            <LoginForm onSubmit={LogData}/>
        </div>
    </div>
}



export default  connect(null,{LogIn})(Login);