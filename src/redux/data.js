import profileReducer from "./profileReducer";
import sidebarReducer from "./sidebarReducer";
import dialogsReducer from "./dialogsReducer";


let store = {
    _object: {
        PageDiaolog: {

            dialogArea: "type smth",

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

        },
        PageProfile: {
            textAreaValue: "hello",

            data: [
                {id: 1, messages: "hi you!", likesCount: 12},
                {id: 2, messages: "how are you", likesCount: 42},
                {id: 3, messages: "hello", likesCount: 24},
                {id: 4, messages: "very cool!", likesCount: 1},
                {id: 5, messages: "shysh", likesCount: 23}
            ]
        },
        sideBar: {}

    },
    justRender() {
        console.log("hello");
    },
    getObject() {
        return this._object;
    },
    callbacker(observer) {
        this.justRender = observer;
    },

    dispatch (action){
        dialogsReducer(this._object.PageDiaolog,action );
        profileReducer(this._object.PageProfile,action);
        sidebarReducer(this._object.sideBar,action);
        this.justRender(this._object);
    }
};






export default store;