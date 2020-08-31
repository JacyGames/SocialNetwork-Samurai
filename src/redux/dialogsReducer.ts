import {reset} from "redux-form";
import {SEND_MESSAGE} from "./constants"
import {ThunkAction} from "redux-thunk";
import {StateType} from "./reduxStore";

export type MessageObjType = {
    message: string
}
export type DialogType = {
    name: string
    id: number
}
export type initialType = {
    wordsMessage: Array<MessageObjType>
    dialogName: Array<DialogType>
}

let initialState: initialType = {
    wordsMessage: [
        {message: "Hello!"},
        {message: "Hello!12"},
        {message: "Hello!qsa"},
        {message: "Hello!asf"},
        {message: "Hellasdfo!"},
        {message: "Helladfo!"},
        {message: "Hellxo!"},
        {message: "Hellxzcvo!"},
    ],
    dialogName: [
        {name: "Victor", id: 1},
        {name: "Peter", id: 2},
        {name: "Igor", id: 3},
        {name: "Bobic", id: 4}
    ]

};
type MessageActionType = {
    type: typeof SEND_MESSAGE
    message: string
}

type MainActionType = MessageActionType;

let dialogsReducer = (store= initialState, action: MainActionType): initialType => {
    switch (action.type) {
        case SEND_MESSAGE:{
            let message = {message: action.message};
            return {...store,  wordsMessage: [...store.wordsMessage, message]};
        }
        default: return store;
    }
}
export const sendMessageActionCreator = (message: string): MessageActionType => ({type: SEND_MESSAGE, message});

export const clearMessageFrom = (): ThunkAction<void, StateType, unknown, any> => {
    return (dispatch) => {
        dispatch(reset('message'));
    }
};

export default dialogsReducer;
