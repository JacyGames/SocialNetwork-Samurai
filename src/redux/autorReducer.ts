import {AuthApi, ResultCodeCaptcha, ResultCodeMessage, SecureApi} from "../api/api";
import {stopSubmit} from "redux-form"
import {REDIRECT_TO_PROFILE, SET_AUTORIZED, SET_CAPTCHA_URL, SET_IS_AUTHORIZED} from "./constants";
import {ThunkAction} from "redux-thunk";
import {StateType, TypesFromObj} from "./reduxStore";


let initialState = {
    isAutorized: false,
    id: null as number | null,
    login: null as string | null,
    email: null as string | null,
    isFetching: false,
    captchaUrl: null as string | null,
    redirectToProfile: false,
}
type InitialType = typeof initialState;


type MainActionType = TypesFromObj<typeof AuthorActions>

let autorizeReducer = (state = initialState, action: MainActionType): InitialType => {
        switch(action.type){
            case SET_AUTORIZED:{
                return {
                    ...state,
                    ...action.data
                }
            }
            case SET_IS_AUTHORIZED: {
                return {
                    ...state,
                    isAutorized: action.auth
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

export const AuthorActions = {
    autorize: (id: number, login: string, email: string) => ({type: SET_AUTORIZED, data: {id, login, email}} as const),
    setCaptchaUrl: (captcha: string) => ({type: SET_CAPTCHA_URL, captcha} as const),
    redirectToProfile: () => ({type: REDIRECT_TO_PROFILE} as const),
    setIsAuthorized: (auth: boolean) => ({type: SET_IS_AUTHORIZED, auth} as const)
}


export default autorizeReducer;

type ThunkType = ThunkAction<void, StateType, unknown, MainActionType>;

export const AutorizedThunk = (): ThunkAction<Promise<void>, StateType, unknown, MainActionType>  => {
    return  async (dispatch) => {
       try{ let data = await AuthApi.getAuthorized()
        let someData = data.data;
           dispatch(AuthorActions.setIsAuthorized(true));
         dispatch(AuthorActions.autorize(someData.id, someData.login, someData.email));

       }catch (error) {
           console.log(error);
       }
    }

};
export const LogIn = (email: string,password: string,rememberMe=false, captcha: boolean | null = null): ThunkType => {
    return (dispatch)=> {
        AuthApi.login(email,password,rememberMe, captcha).then((response) => {
            if (response.data.resultCode === ResultCodeMessage.Success) {
                dispatch(AutorizedThunk());
                dispatch(AuthorActions.redirectToProfile());
            }else {
                if(response.data.resultCode === ResultCodeCaptcha.CaptchaRequired) {
                    dispatch(GetCaptchaUrl());
                }
                dispatch(stopSubmit( "loginform", {_error: response.data.messages} ));

            }
        })}

};

export const LogOut = (): ThunkType => {
    return (dispatch) => {
        AuthApi.logout().then((response) => {
            if (response.data.resultCode === ResultCodeMessage.Success) {
                dispatch(AuthorActions.setIsAuthorized(false));
                dispatch(AutorizedThunk());
            }
        })}

};

export const GetCaptchaUrl = (): ThunkType => {
    return (dispatch) => {
        SecureApi.getGaptcha().then((data) => {
           dispatch(AuthorActions.setCaptchaUrl(data.url));
        })}

};
