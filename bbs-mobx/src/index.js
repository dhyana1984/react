import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "mobx-react";
import stores from "./stores";
import APP from "./components/App";
// import { configure } from "mobx";

//使用严格模式
// configure({enforceActions:true})

ReactDOM.render(
    <Provider {...stores}>
        <APP/>
    </Provider>,
    document.getElementById("root")
)