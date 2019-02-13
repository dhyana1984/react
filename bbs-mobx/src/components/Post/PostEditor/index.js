import React, { Component } from "react";
import "./style.css";
import { observer } from "mobx-react";
import { observable, action } from "mobx";

@observer
class PostEditor extends Component {
  @observable title;
  @observable content;

  constructor(props) {
    super(props);
    const { post } = this.props;
    this.title=(post && post.title) ||""
    this.content =(post && post.content) || ""

  }

  // 处理帖子的编辑信息
  @action handleChange = (e)=> {
    const name = e.target.name;
    if (name === "title") {
      this.title= e.target.value
    } else if (name === "content") {
      this.content = e.target.value
    } else {
    }
  }
  
  // 取消帖子的编辑
  handleCancelClick= () =>{
    this.props.onCancel();
  }
  
  // 保存帖子
  handleSaveClick = () =>{
    const data = {
      title: this.title,
      content: this.content
    };
    // 调用父组件的回调函数执行真正的保存逻辑
    this.props.onSave(data);
  }

  render() {
    return (
      <div className="postEditor">
        <input
          type="text"
          name="title"
          placeholder="标题"
          value={this.title}
          onChange={this.handleChange}
        />
        <textarea
          name="content"
          placeholder="内容"
          value={this.content}
          onChange={this.handleChange}
        />
        <button onClick={this.handleCancelClick}>取消</button>
        <button onClick={this.handleSaveClick}>保存</button>
      </div>
    );
  }
}

export default PostEditor;
