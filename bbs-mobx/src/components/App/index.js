import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { inject, observer } from "mobx-react";
import ModalDialog from "../ModalDialog";
import asyncComponent from './../../utils/AsyncComponent';
import Loading from './../Loading/index';
import connectRoute from "../../utils/connectRoute";

const AsyncHome = connectRoute(asyncComponent(() => import("../Home")));
const AsyncLogin = connectRoute(asyncComponent(() => import("../Login")));



@inject("appStore") //@inject 注入使用的Store
@observer //@observer把App组件转换成一个reaction，自动响应state的变化
export default class APP extends Component{
    renderDevTool() {
        if (process.env.NODE_ENV !== "production") {
          const DevTools = require("mobx-react-devtools").default;
          return <DevTools />;
        }
      }

      render(){
          const{error, isLoading, removeError} = this.props.appStore;
          const errorDialog = error && (
              <ModalDialog onClose={removeError}>{error.message || error}</ModalDialog>
          )
          return (
              <div>
                  <Router>
                      <Switch>
                          <Route exact path="/" component={AsyncHome} />
                          <Route  path="/login" component={AsyncLogin} />
                          <Route  path="/posts" component={AsyncHome} />
                      </Switch>
                  </Router>
                  {errorDialog}
                  {isLoading && <Loading/>}
                  {this.renderDevTool()}
              </div>
          )
      }
}