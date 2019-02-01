import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './app';
import { Provider } from "react-redux";
import configureStore  from "./redux/configureStore"

const store = configureStore();
// ReactDOM.render(<App />, document.getElementById('root'));
ReactDOM.render(
    <Provider store = {store}>
        <App />
    </Provider>,
    document.getElementById("root")

);

