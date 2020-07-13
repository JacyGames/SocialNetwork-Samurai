import React from "react";
import {AutorizedThunk} from "./autorReducer";

let initialState = {
    initalized: false
}

export const appReducer = (state = initialState, action) => {
    switch (action.type) {
        case "IS_INITIALIZED": {
            return {
                ...state,
                initalized: true
            }
            break;
        }
        default: return state;

    }

}

export const initialized = () => ({type: "IS_INITIALIZED"});

export const initalizedThunk = () => (dispatch) =>{
    dispatch(AutorizedThunk()).then( () =>{
            dispatch(initialized())
    });
}

