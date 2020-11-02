import React from 'react';
import './index.css';
import * as serviceWorker from './serviceWorker';
import store from "./redux/reduxStore";
import ReactDOM from "react-dom";
import App from "./App";
import {Provider} from "react-redux";
import {HashRouter} from "react-router-dom";


export let justRender = function (data) {
    ReactDOM.render(
            <HashRouter>
                <Provider store={store}>
                    <App/>
                </Provider>
            </HashRouter>,
        document.getElementById('root')
    );
}

justRender(store.getState());
store.subscribe(() => {
    let state = store.getState();
    justRender(state);
});

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
