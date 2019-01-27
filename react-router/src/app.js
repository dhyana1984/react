import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from './component/Home';
import Login from './component/Login';


export default class App extends Component{

    render(){
        return (
            <Router>
                <Switch>
                    <Route exact path="/" component={Home}></Route>
                    <Route exact path="/login" component={Login}></Route>
                    <Route exact path="/posts" component={Home}></Route>
                </Switch>
            </Router>
        )
    }
}