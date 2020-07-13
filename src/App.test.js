import React from 'react';
import ReactDOM from 'react-dom'
import {render} from '@testing-library/react';
import {Provider} from "react-redux";
import store from "./redux/reduxStore";
import App from "./App";
import {BrowserRouter} from "react-router-dom";


test('test for render react app', () => {
  const div = document.createElement("div");
  ReactDOM.render(<BrowserRouter>
    <Provider store={store}>
      <App/>
    </Provider>
  </BrowserRouter>,div)
    ReactDOM.unmountComponentAtNode(div);
});
