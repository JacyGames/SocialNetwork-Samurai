import {AutorizedThunk} from "./autorReducer";
import {IS_INITIALIZED} from "./constants";
import {ThunkAction} from "redux-thunk";
import {StateType} from "./reduxStore";



let initialState = {
    initialized: false
}
type initialType = typeof initialState;

type initType = {
    type: typeof IS_INITIALIZED
}

type actionType = initType

export const appReducer = (state = initialState, action: actionType): initialType => {
    switch (action.type) {
        case IS_INITIALIZED: {
            return {
                ...state,
                initialized: true
            }
        }
        default:
            return state;

    }

}

export const initialized = (): actionType => ({type: IS_INITIALIZED});

export const initalizedThunk = (): ThunkAction<void, StateType, unknown, actionType> => (dispatch) => {
    dispatch(AutorizedThunk()).then(() => {
        dispatch(initialized());
    })
}
// eslint-disable-next-line no-empty-pattern
