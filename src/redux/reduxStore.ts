import {applyMiddleware, combineReducers, createStore} from "redux";
import sidebarReducer from "./sidebarReducer";
import profileReducer from "./profileReducer";
import userReducer from "./usersReducer";
import autorizeReducer from "./autorReducer";
import thunk from "redux-thunk";
import { reducer as formReducer } from 'redux-form';
import {appReducer} from "./appReducer";
import dialogsReducer from "./dialogsReducer";


let reducers = combineReducers({
    PageDiaolog: dialogsReducer,
    PageProfile: profileReducer,
    sideBar: sidebarReducer,
    users: userReducer,
    auth: autorizeReducer,
    form: formReducer,
    app: appReducer
});

export type StateType = ReturnType<typeof reducers>;



let store = createStore(reducers, applyMiddleware(thunk));

  // @ts-ignore
window.store = store;
export default store;

