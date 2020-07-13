import {applyMiddleware, combineReducers, createStore} from "redux";
import sidebarReducer from "./sidebarReducer";
import profileReducer from "./profileReducer";
import dialogsReducer from "./dialogsReducer";
import userReducer from "./usersReducer";
import autorizeReducer from "./autorReducer";
import thunk from "redux-thunk";
import { reducer as formReducer } from 'redux-form';
import {appReducer} from "./appReducer";


let reducers = combineReducers({
    PageDiaolog: dialogsReducer,
    PageProfile: profileReducer,
    sideBar: sidebarReducer,
    users: userReducer,
    auth: autorizeReducer,
    form: formReducer,
    app: appReducer
})


let store = createStore(reducers, applyMiddleware(thunk));

  window.store = store;
export default store;

