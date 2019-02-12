import React, { Component } from "react";
import CommentsView from "../CommentsView";
import "./style.css";
import { observer, inject } from "mobx-react";
import { observable, action } from "mobx";

@inject("commentsStore","authStore")
@observer
class CommentList extends Component {
  
  @observable newComment;
  
  componentDidMount(){
    this.props.commentsStore.fetchCommentList(this.props.postId);
  }


  // 处理新评论内容的变化
  @action handleChange = (e)=> {
    this.newComment= e.target.value
  }
 
  // 保存新评论 
  handleClick= e=> {
   
    if (this.newComment.length > 0) {
      const postId = this.props.postId
      const userId = this.props.userId
      const comment = {
        author:userId,
        post:postId,
        content:this.newComment
      }
      this.props.commentsStore.createComment(comment).then( action(() =>{
        this.newComment=""
      }))
    } else {
      alert("评论内容不能为空！");
    }
  }

  render() {
    const { commentsStore, authStore } = this.props;

    return (
      <div className="commentList">
        <div className="title">评论</div>
        {authStore.userId ? (
          <div className="editor">
            <textarea
              placeholder="说说你的看法"
              value={this.newComment}
              onChange={this.handleChange}
            />
            <button onClick={this.handleClick}>提交</button>
          </div>
        ) : null}
        <CommentsView comments={commentsStore.comments} />
      </div>
    );
  }
}

export default CommentList;
