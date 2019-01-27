
import React,{ Component } from 'react';
import { Link } from "react-router-dom";
import  "./Header.css"

class Header extends Component{
    render(){
        const {username, onLogout, location} = this.props;
        return(
            <div className="header">
                <div className="nav">
                    <span className="left-link">
                        <Link to="/">首页</Link>
                    </span>
                    {/* 用户登录显示用户信息，否则显示登录按钮 */}
                    {username && username.length >0 ? (
                        <span className="user">
                            当前用户：{username}&nbsp;
                            <button onClick={onLogout}>注销</button>
                        </span>
                    ):(
                        <span className="right-link">
                            {/* 通过state属性，保存当前页面的地址，location是当前页面地址 */}
                            <Link to={{pathname:"/login", state: {from:location}}}>
                                登录
                            </Link>
                        </span>
                    )}
                </div>
            </div>
        )
    }
}

export default Header;