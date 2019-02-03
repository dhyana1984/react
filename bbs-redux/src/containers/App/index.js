import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import ModalDialog from "../../components/ModalDialog"
import Loading from "../../components/Loading"
import asyncComponent from "../../utils/asyncComponent"
import connectRoute from "../../utils/connectRoute"
import {actions as appActions, getError, getRequestQuantity} from "../../redux/modules/app"
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";

const AsyncHome = connectRoute(asyncComponent(() => import("../Home")))
const AsyncLogin= connectRoute(asyncComponent(() => import("../Login")))


class App extends Component{

    render(){
        const {error,requestQuantity} = this.props
        const errorDialog = error && (<ModalDialog onClose = {this.props.removeError}>{error.message || error} </ModalDialog>)
        return (
            <div>
                <Router>
                    <Switch>
                        <Route exact path="/" component={AsyncHome}></Route>
                        <Route  path="/login" component={AsyncLogin}></Route>
                        <Route  path="/posts" component={AsyncHome}></Route>
                    </Switch>
                </Router>
                {errorDialog}
                {requestQuantity >0  && <Loading/>}
            </div>
        )
    }
}

const mapStateToProps = (state, props) =>{
    return {
        error:getError(state),
        requestQuantity:getRequestQuantity(state)
    }
}

const mapDispatchToProps = dispatch => {
    return {
        ...bindActionCreators(appActions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)