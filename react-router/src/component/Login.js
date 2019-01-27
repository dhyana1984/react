import React,{ Component } from 'react';
import {post} from '../utils/reuqest';
import url from "../utils/url"
import { Redirect } from "react-router-dom";
import "./Login.css"
class Login extends Component{
    constructor(props) {
        super(props);
        this.state={
            username:"jack",
            password:"123456",
            redirectToRefferrer:false //是否重定向到之前的页面
        }

        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }
     // 处理用户名、密码的变化
    handleChange(e){
        if(e.target.name == "username"){
            this.setState({
                username:e.target.value
            });
        }else if(e.target.name == "password"){
            this.setState({
                password:e.target.value
            });
        }else{

        }
    }
    //处理提交表单
    handleSubmit(e){
        e.preventDefault();
        const username = this.state.username;
        const password = this.state.password;
        if(username.length===0||password.length===0){
            alert("用户名或者密码不能为空！");
            return;
        }
        const params = {
            username,
            password
        };
        //post会调用api
        post(url.login(),params).then(data =>{
            if(data.error){
                alert(data.error.message || "login failed");
            }else{
                //登录成功保存session
    
                sessionStorage.setItem("userId",data.userId);
                sessionStorage.setItem("userName", username);
                this.setState({
                    redirectToRefferrer:true
                })
            }
        })
    }

    render(){
        //from保存跳转到登录页面钱的页面路径，用于在登录成功后重定向到原来页面
        const {from} = this.props.location.state || {from:{pathname : "/"}};
        const {redirectToRefferrer}= this.state
        //登录成功后，redirectToRefferrer为true，使用Recirect组件重定向页面
        if(redirectToRefferrer){
            return <Redirect to={from}/>
        }
        return(
            <form className="login" onSubmit={this.handleSubmit}>
                <div>
                    <label>
                        用户名：
                        <input name="username" type="text" value={this.state.username} onChange={this.handleChange}/>
                    </label>
                    <label>
                        密码：
                        <input name="password" type="password" value={this.state.password} onChange={this.handleChange}/>

                    </label>
                </div>
                <input type="submit" value="登录"/>
            </form>
        )
    }


}

export default Login