import React, { Component } from "react";
import ListComponent from "./listComponent"
import StringComponent from "./stringComponent"
import ErrorBoundary from "./errorBoundary"
import Modal from "./modal"


const Profile = ({ user }) => <div>name: {user.name}</div>;
export default class App extends Component{
    ////react16新特性，返回数组
    // render(){
    //    
    //     return [
    //         <ul>
    //             <ListComponent/>
    //         </ul>,
    //         <StringComponent/>
    //     ]
    // }

    // //使用ErrorBoundary
    // constructor(props){
    //     super(props);
    //     this.state ={
    //         user: {name:"react"}
    //     }
    // }

    // onClick = () =>{
    //     this.setState({ user: null})
    // }

    // render(){
    //     return(
    //         <div>
    //             <ErrorBoundary>
    //                 <Profile user = {this.state.user}/>
    //             </ErrorBoundary>
    //             <button onClick= {this.onClick}>更新</button>
    //         </div>
    //     )
    // }

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