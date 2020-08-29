import {AuthApi, SecureApi} from "../api/api";
import {stopSubmit} from "redux-form"
import {Redirect} from "react-router-dom";
import {REDIRECT_TO_PROFILE, SET_AUTORIZED, SET_CAPTCHA_URL} from "./constants";



let initialState = {
    isAutorized: false,
    id: null as string | null,
    login: null as string | null,
    email: null as string | null,
    isFetching: false,
    captchaUrl: null as string | null,
    redirectToProfile: false
}
type InitialType = typeof initialState;

type ActionTypeAuth = {
    type: typeof SET_AUTORIZED
    data: { id: string | null, login: string | null, email: string | null}
}
type ActionTypeCaptcha = {
    type: typeof SET_CAPTCHA_URL

    captcha: string
}
type ActionRedirect = {
    type: typeof REDIRECT_TO_PROFILE;
}

let autorizeReducer = (state = initialState, action: ActionTypeAuth | ActionTypeCaptcha | ActionRedirect): InitialType => {
        switch(action.type){
            case SET_AUTORIZED:{
                let Author;
                !action.data.id ? Author = false : Author= true
                return {
                    ...state,
                    ...action.data,
                    isAutorized: Author
                }
            }
            case SET_CAPTCHA_URL:{
                return {
                    ...state,
                    captchaUrl: action.captcha
                }
            }
            case REDIRECT_TO_PROFILE:{
                return {
                    ...state,
                    redirectToProfile: true
                }
            }

            default: return state
        }
}

export const autorize = (id: number, login: string, email: string) => ({type: SET_AUTORIZED, data: {id, login, email}});
export const setCaptchaUrl = (captcha: string) => ({type: SET_CAPTCHA_URL, captcha});
export const redirectToProfile = () => ({type: REDIRECT_TO_PROFILE})
export default autorizeReducer;

export const AutorizedThunk = () => {
    return  async (dispatch: any) => {
       try{ let data = await AuthApi.getAuthorized()
        let someData = data.data;
         dispatch(autorize(someData.id, someData.login, someData.email));}catch (error) {
           console.log(error);
       }
    }

};
export const LogIn = (email: string,password: string,rememberMe=false, captcha: boolean | null = null) => {
    return (dispatch: any): void => {
        AuthApi.login(email,password,rememberMe, captcha).then((response: any) => {
            if (response.data.resultCode === 0) {
                dispatch(AutorizedThunk());
                dispatch(redirectToProfile());
            }else {
                if(response.data.resultCode === 10) {
                    dispatch(GetCaptchaUrl());
                }
                dispatch(stopSubmit( "loginform", {_error: response.data.messages} ));
            }
        })}

};

export const LogOut = () => {
    return (dispatch: any) => {
        AuthApi.logout().then((response: any) => {
            if (response.data.resultCode === 0) {
                dispatch(AutorizedThunk());
            }
        })}

};

export const GetCaptchaUrl = () => {
    return (dispatch: any) => {
        SecureApi.getGaptcha().then((data: any) => {
           dispatch(setCaptchaUrl(data.url));
        })}

};
