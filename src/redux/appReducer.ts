import {AutorizedThunk} from "./autorReducer";
import {IS_INITIALIZED} from "./constants";



let initialState = {
    initialized: false
}
type initialType = typeof initialState;

type actionType = {
    type: typeof IS_INITIALIZED
}

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

export const initalizedThunk = (): any => (dispatch: any): void => {
    dispatch(AutorizedThunk()).then(() => {
        dispatch(initialized());
    })
}
// eslint-disable-next-line no-empty-pattern
