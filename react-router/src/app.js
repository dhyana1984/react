import React, { Component } from "react";
import ListComponent from "./listComponent"
import StringComponent from "./stringComponent"
import ErrorBoundary from "./errorBoundary"
import Modal from "./modal"


const Profile = ({ user }) => <div>name: {user.name}</div>;
export default class App extends Component{
    constructor(props){
        super(props);
        this.state = {showModal : true};
    }

    //关闭弹框
    closeModal= () =>{
        this.setState({ showModal: false})
    }

    render(){
        return (
            <div>
                <h2>Dashboard</h2>
                {
                    this.state.showModal && (<Modal onClose={ this.closeModal}>Modal Dialog111</Modal>)
                }
            </div>
        )
    }
}