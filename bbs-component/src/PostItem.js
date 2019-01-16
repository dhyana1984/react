import React, {} from "react";
import PropTypes from "prop-types";
//引用针对此组件页面的样式表
import "./PostItem.css";
//引用图片
import likePng from "./images/like-default.png";
// //有状态PostItem组件
// class PostItem extends Component{
//     constructor(props){
//         //注意一，在构造函数内要先调用super(props), 完成初始化工作
//         super(props);
//         //注意二，定义状态初始化
//         //this.state是唯一改变组件状态的方式，写在构造函数就是定义初始状态
//         this.state={
//             vote:0
//         }
//     }
//     //处理点赞逻辑
//     handleClick(){
//         let vote=this.state.vote;
//         vote++;
//         this.setState({
//             vote:vote
//         });
//     }
//     //组件的state和props都会影响UI，可以把组件看成函数，state和props是输入，UI是输出
//     //UI= Component(props,state)
//     render(){
//         //props用于父组件把数据传递给子组件
//         const {title, author, date} = this.props;
//         return(
//             <li >
//                 <div>
//                     {title}
//                 </div>
//                 <div>
//                     创建人：{author}
//                 </div>
//                 <div>
//                     创建时间：{date}
//                 </div>
//                 <div>
//                     <button onClick={() =>{this.handleClick();}}>
//                         点赞
//                     </button>
//                     &nbsp;
//                     <span>
//                         {/* 注意三，调用this.state.vote更新点赞数 */}
//                         {this.state.vote}
//                     </span>
//                 </div>
//             </li>
//         )
//     }
   
// }

//将PostItem改造为无状态组件
function PostItem(props){
    const handleClick= () =>{
        
        //PostList定义的handleVote方法和state通过props的onVote属性传过来
        props.onVote(props.post.id)
    };
    const {post}= props;
    return(
        <li className="item">
            <div className="title">
                {post.title}
            </div>
            <div>
                创建人：<span>{post.author}</span>
            </div>
            <div>
                创建时间：<span>{post.date}</span>
            </div>
            <div className="like">
            {/* <button onClick={handleClick}>
                         点赞
                     </button> 
                     &nbsp;*/}
                     <span>
                         <img src={likePng} onClick={handleClick} />
                     </span>
                     <span>
                       
                         {post.vote}
                     </span>
            </div>
        </li>
    );
    
}

PostItem.prototype={
    post:PropTypes.shape({
        id:PropTypes.number,
        title:PropTypes.string,
        author:PropTypes.string,
        date:PropTypes.string,
        vote:PropTypes.number
    }).isRequired,
    onVote:PropTypes.func.isRequired
}
export default PostItem;