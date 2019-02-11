import React, { Component } from "react";
import { bindActionCreators } from "redux";
import PostsView from "./components/PostsView";
import PostEditor from "../Post/components/PostEditor";
import { connect } from 'react-redux';
import "./style.css";
import { getLoggedUser } from "../../redux/modules/auth";
import { getPostListWithAuthors } from "../../redux/modules";
import {actions as postActions} from "../../redux/modules/posts"
import {actions as uiActions, isAddDialogOpen} from "../../redux/modules/ui"

class PostList extends Component {

  componentDidMount() {
    this.props.fetchAllPosts()

  }

  // 保存帖子
  handleSave=data=> {
    this.props.createPost(data.title, data.content)
  }
  
  // 取消新建帖子
  handleCancel =() => {
    this.props.closeAddDialog();
  }
  
  // 新建帖子
  handleNewPost = ()=> {
    this.props.openAddDialog();
  }

  render() {
    const { posts,user, isAddDialogOpen } = this.props;
    
    return (
      <div className="postList">
        <div>
          <h2>话题列表</h2>
           {/* 只有在登录状态，才显示发帖按钮 */}
          {user.userId ? <button onClick={this.handleNewPost}>发帖</button> : null}
        </div>
        {/* 若当前正在创建新帖子，则渲染PostEditor组件 */}
        {isAddDialogOpen ? (
          <PostEditor onSave={this.handleSave} onCancel={this.handleCancel} />
        ) : null}
        {/* PostsView显示帖子的列表数据 */}
        <PostsView posts={posts} />
      </div>
    );
  }
}

//注入state
const mapStateToProps = (state,props) =>{
  return{
    user:getLoggedUser(state),          //当前登录用户
    posts:getPostListWithAuthors(state),  //帖子列表数据
    isAddDialogOpen:isAddDialogOpen(state)  //新建帖子编辑框的UI状态
  }
}

//注入action creator
//bindActionCreators是redux的一个工具函数， 使用store的dispatch方法把参数对象中包含的每个action creator包裹起来，
//这样就不需要显示调用dispatch方法发送action
const mapDispatchToProps = dispatch =>{
  return{
    ...bindActionCreators(postActions,dispatch),
    ...bindActionCreators(uiActions,dispatch)
  }
}


export default connect(mapStateToProps,mapDispatchToProps)(PostList);
