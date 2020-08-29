import {reset} from "redux-form";
import {SEND_MESSAGE} from "./constants"

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
type ActionType = {
    type: typeof SEND_MESSAGE
    message: string
}

let dialogsReducer = (store= initialState, action: ActionType): initialType => {
    switch (action.type) {
        case SEND_MESSAGE:{
            let message = {message: action.message};
            return {...store,  wordsMessage: [...store.wordsMessage, message]};
        }
        default: return store;
    }
}
export const sendMessageActionCreator = (message: string) => ({type: SEND_MESSAGE, message});

export const clearMessageFrom = () => {
    return (dispatch: any) => {
        dispatch(reset('message'));
    }
};

export default dialogsReducer;
