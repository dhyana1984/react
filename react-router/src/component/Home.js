import React,{Component} from "react"
import { Route } from "react-router-dom";
import {PostList} from "./PostList"
import {Post} from "./Post"
import {Header} from "./Header"
class Home extends Component{
    constructor(props){
        super(props);
        this.state = {
            userId: sessionStorage.getItem("userId"),
            userName: sessionStorage.getItem("userName")
        };
        this.handleLogout = this.handleLogout.bind(this);

    }

    handleLogout(){
        //注销用户
        sessionStorage.removeItem("userId");
        sessionStorage.removeItem("userName");
        this.setState({
            userId: null,
            userName: null
        })
    }

    render(){
        const {match, location}= this.props;
        const{username} = this.state;
        return (
            <div>
                <Header
                username={username}
                onLogout={this.handleLogout}
                location={location}
                />
                {/* 帖子列表路由配置 */}
                <Route
                path ={match.url}
                exact
                render={props => <PostList username={username} {...props}/>}
                />
                {/* 帖子详情路由配置 */}
                <Route
                path={`${match.url}/:id`}
                render={props => <Post username={username} {...props}/>}
                />
            </div>
        );
    }

}
export default Home;