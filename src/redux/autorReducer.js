import {AuthApi, DataAPI} from "../api/api";
import {stopSubmit} from "redux-form"
import {Redirect} from "react-router-dom";
import React from "react";

let initaialState = {
    isAutorized: false,
    id: null,
    login: null,
    email: null,
    isFetching: false
}

let autorizeReducer = (state = initaialState, action) => {
        switch(action.type){
            case "SET_AUTORIZED_USER":{
                let Author;
                !action.data.id ? Author = false : Author= true
                return {
                    ...state,
                    ...action.data,
                    isAutorized: Author
                }
                break
            }


            default: return state
        }
}

export const autorize = (id, login, email) => ({type:"SET_AUTORIZED_USER", data: {id, login, email}});
export default autorizeReducer;

export const AutorizedThunk = () => {
    return (dispatch) => {
        return AuthApi.getAutorized().then(data => {
        let someData = data.data;
         dispatch(autorize(someData.id, someData.login, someData.email));
    })}

};
export const LogIn = (email,password,rememberMe=false) => {
    return (dispatch) => {
        AuthApi.login(email,password,rememberMe).then(response => {
            if (response.data.resultCode === 0) {
                dispatch(AutorizedThunk());
                return <Redirect to="/Profile"/>
            }else {
                dispatch(stopSubmit( "loginform", {_error: response.data.messages} ));
            }
        })}

};

export const LogOut = () => {
    return (dispatch) => {
        AuthApi.logout().then(response => {
            if (response.data.resultCode === 0) {
                dispatch(AutorizedThunk());
            }
        })}

};