import React, { Component } from "react";
import PostEditor from "./PostEditor";
import PostView from "./PostView";
import CommentList from "./CommentList";
import "./style.css";
import { inject, observer } from "mobx-react";

@inject("postsStore","authStore", "uiStore")
@observer
class Post extends Component {


  componentDidMount() {
    const postId = this.props.match.params.id
    this.props.postsStore.fetchPostDetail(postId)
  }

  // 让帖子处于编辑态
  handleEditClick = () => {
    this.props.uiStore.setEditDialogStatus(true)
  }

  // 保存帖子
  handlePostSave= (data) => {
    const id = this.props.match.params.id;
    this.props.postsStore.updatePost(id,data).then(() => this.props.uiStore.setEditDialogStatus(false))
  }

  // 取消编辑帖子
  handlePostCancel() {
    this.props.uiStore.setEditDialogStatus(false)
  }



  render() {
    const { match, postsStore, authStore,uiStore } = this.props;
    const postId = match.params.id;
    const post = postsStore.getPost(postId)
   
    if (!post) {
      return null;
    }
 
    const editable = authStore.userId === post.author.id;
    return (
      <div className="post">
        {uiStore.editDialogOpen ? (
          <PostEditor
            post={post}
            onSave={this.handlePostSave}
            onCancel={this.handlePostCancel}
          />
        ) : (
          <PostView
            post={post}
            editable={editable}
            onEditClick={this.handleEditClick}
          />
        )}
        <CommentList
         postId={postId}
        />
      </div>
    );
  }
}

export default Post;
