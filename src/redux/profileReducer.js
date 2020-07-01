import {DataAPI} from "../api/api";

let initialState = {
    textAreaValue: "hello",

    data: [
        {id: 1, messages: "hi you!", likesCount: 12},
        {id: 2, messages: "how are you", likesCount: 42},
        {id: 3, messages: "hello", likesCount: 24},
        {id: 4, messages: "very cool!", likesCount: 1},
        {id: 5, messages: "shysh", likesCount: 23}
    ],
    profile: null,
    status: ""
};


let profileReducer = (state = initialState,action) => {
    switch (action.type) {
        case "ADD-POST":
        {
 
            return { ...state, data: [...state.data,
                    { id: 6,
                    messages: state.textAreaValue,
                    likesCount: 0}
                    ], textAreaValue: ""};
            break
        }

        case "CHANGER":{
            return {...state, textAreaValue: action.text};
            break
        }
        case "SET_PROFILE_STATUS":{
            return {...state, status: action.status};
            break
        }
        case "GET_PROFILE":{
            return {...state, profile: action.profile};
            break
        }

        default: return state;
    }
}


export const addPostActionCreator = () => ({type: "ADD-POST"});
export const changeSymbolActionCreator = (text) => ({type: "CHANGER", text: text});
export const getProfile = (profile) => ({type: "GET_PROFILE", profile});
export const setProfileStatus = (status) => ({type: "SET_PROFILE_STATUS", status});

export const getProfileThunk = (userId) => {
    return (dispatch) => {
        DataAPI.getProfile(userId).then(data => {
            dispatch(getProfile(data));
        })
    }
};

export const getProfileStatus = (userId) => {
    return (dispatch) => {
        DataAPI.getProfileStatus(userId).then(data => {
            dispatch(setProfileStatus(data));
        })
    }
};

export const updateProfileStatus = (status) => {
    return (dispatch) => {
        DataAPI.updateProfileStatus(status).then(data => {
            if(!data.resultCode) {
                dispatch(setProfileStatus(status));
            }else {
                return false;
            }

        })
    }
};


export default profileReducer;