import React from "react";
import classes from "./LoginStyle.module.css"
import LoginForm from "../Forms/LoginForm";
import {Redirect} from "react-router-dom";
import {connect} from "react-redux";
import {LogIn} from "../../redux/autorReducer";
import {StateType} from "../../redux/reduxStore";


type PropsTypeOwn = {


}
type MapStateType = {
    captchaUrl: string | null
    redirectToProfile: boolean
}
type MapDispatchType = {
    LogIn: any
}

export type SubmittingPropsType = {
    login: string
    password: string
    rememberMe: boolean
    captcha: string | null
}

const Login: React.FC<PropsTypeOwn & MapStateType & MapDispatchType> = (props) => {
    let LogData = (compareData: SubmittingPropsType) => {
       props.LogIn(compareData.login, compareData.password, compareData.rememberMe, compareData.captcha);

    }
    if(props.redirectToProfile){
        return <Redirect to={"/Profile"}/>
    }
    return <div className={classes.formbackground}>
        <div className={classes.form}>
            <h1>Login</h1>
            <LoginForm captchaUrl={props.captchaUrl} onSubmit={LogData}/>
        </div>
    </div>
}

const mapStateToProps = (state: StateType) => ({
    captchaUrl: state.auth.captchaUrl,
    redirectToProfile: state.auth.redirectToProfile
});


export default  connect<MapStateType, MapDispatchType, PropsTypeOwn, StateType>(mapStateToProps,{LogIn})(Login);
