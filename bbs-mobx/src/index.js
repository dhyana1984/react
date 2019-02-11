import React from "react";
import ReactDOM from "react-dom";
import { useStrict } from 'mobx';
import { Provider } from "mobx-react";
import stores from "./stores";
import APP from "./components/App";
useStrict(true)

ReactDOM.render(
    <Provider {...stores}>
        <APP/>
    </Provider>,
    document.getElementById("root")
)