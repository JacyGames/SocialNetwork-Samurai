import React from "react";
import classes from "./LoginStyle.module.css"
import LoginForm from "../Forms/LoginForm";

import {connect} from "react-redux";
import {LogIn} from "../../redux/autorReducer";
import {StateType} from "../../redux/reduxStore";


type PropsTypeOwn = {


}
type MapStateType = {
    captchaUrl: string | null
}
type MapDispatchType = {
    LogIn: any
}

const Login: React.FC<PropsTypeOwn & MapStateType & MapDispatchType> = (props) => {
    let LogData = (compareData: any) => {
       props.LogIn(compareData.login, compareData.password, compareData.rememberMe, compareData.captcha);

    }
    return <div className={classes.formbackground}>
        <div className={classes.form}>
            <h1>Login</h1>
            <LoginForm handleSubmit={() => {}} error={"eroor"} captchaUrl={props.captchaUrl} onSubmit={LogData}/>
        </div>
    </div>
}

const mapStateToProps = (state: StateType) => ({
    captchaUrl: state.auth.captchaUrl
});


export default  connect<MapStateType, MapDispatchType, PropsTypeOwn, StateType>(mapStateToProps,{LogIn})(Login);
