



let initialState = {
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

let dialogsReducer = (store= initialState, action) => {
    switch (action.type) {
        case "SEND-MESSAGE":{
            let message = {message: action.message};
            return {...store,  wordsMessage: [...store.wordsMessage, message]};
            break;
        }
        default: return store;
    }
}
export const sendMessageActionCreator = (message) => ({type: "SEND-MESSAGE", message});
export default dialogsReducer;