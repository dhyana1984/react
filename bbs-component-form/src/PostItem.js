import React, {Component} from "react";
//引用针对此组件页面的样式表
import "./PostItem.css";
//引用图片
import likePng from "./images/like-default.png";

class PostItem extends Component{
    constructor(props){
        super(props);
        this.state={
            editing:false, // 帖子是否处于编辑态
            post:props.post //注意不要写错了
        };
        this.handleVote = this.handleVote.bind(this);
        this.handleEditPost= this.handleEditPost.bind(this);
        this.handleTitleChange= this.handleTitleChange.bind(this);
    }

    componentWillReceiveProps(nextProps){
        //父组件更新post后，更新PostItem的state
        if(this.props.post !== nextProps.post){
            this.setState({
                post:nextProps.post
            })
        }
    }
    //处理点赞事件
    handleVote(){
        this.props.onVote(this.props.post.id);
    }
    //保存和编辑按钮的逻辑
    handleEditPost(){
        const editing = this.state.editing;
        //当前处于编辑状态，调用父组件传递的onSave方法保存帖子
        if(editing){
            this.props.onSave({
                ...this.state.post,
                date:this.getFormatDate()
            });
        }
        this.setState({
            editing: !editing
        });
    }
    //处理标题textarea值的变化
    handleTitleChange(event){
        const newPost={...this.state.post, title:event.target.value};
        this.setState({
            post:newPost
        })
    }
     // 显示日期格式化
    getFormatDate() {
        const date = new Date();
        const year = date.getFullYear();
        let month = date.getMonth() + 1 + "";
        month = month.length === 1 ? "0" + month : month;
        let day = date.getDate() + "";
        day = day.length === 1 ? "0" + day : day;
        let hour = date.getHours() + "";
        hour = hour.length === 1 ? "0" + hour : hour;
        let minute = date.getMinutes() + "";
        minute = minute.length === 1 ? "0" + minute : minute;
        return `${year}-${month}-${day} ${hour}:${minute}`;
    }


    render(){
        //props用于父组件把数据传递给子组件
        const {post} = this.state;
        return(
            <li className="item">
                <div className="title">
                    {this.state.editing
                        ? <form>
                            <textarea value={post.title} onChange={this.handleTitleChange} />
                          </form>
                        : post.title  
                    }
                </div>
                <div>
                    创建人：<span>{post.author}</span>
                </div>
                <div>
                    创建事件：<span>{post.date}</span>
                </div>
                <div className="like">
                    <span>
                         <img src={likePng} onClick={this.handleVote} alt="Good"/>
                     </span>
                     <span>
                       {post.vote}
                   </span>
                </div>
                <div>
                    <button onClick={this.handleEditPost}>
                        {this.state.editing?"保存":"编辑"}
                    </button>
                </div>
            </li>
        )
    }
   
}



// PostItem.prototype={
//     post:PropTypes.shape({
//         id:PropTypes.number,
//         title:PropTypes.string,
//         author:PropTypes.string,
//         date:PropTypes.string,
//         vote:PropTypes.number
//     }).isRequired,
//     onVote:PropTypes.func.isRequired
// }
export default PostItem;
