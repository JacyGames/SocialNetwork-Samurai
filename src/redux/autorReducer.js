import {DataAPI} from "../api/api";


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
        DataAPI.getAutorized().then(data => {
        let someData = data.data;
            dispatch(autorize(someData.id, someData.login, someData.email));
    })}

}