import React, {Component} from "react";
import PostItem from "./PostItem";
//引用针对此组件页面的样式表
import "./PostList.css";
// const data = [
//     {title:"大家一起来讨论React吧", author:"张三", date:"2017-09-01 18:00:21"},
//     {title:"前段框架，最爱哪一个", author:"张三", date:"2017-09-01 18:00:21"},
//     {title:"Web App的时代已经到来", author:"张三", date:"2017-09-01 18:00:21"},
// ];
//无状态组件PostList
// class PostList extends Component{
//     render(){
//         return(
//             <div>
//                 帖子列表：
//                 <ul>
//                    {
//                        data.map(item => 
//                         <PostItem 
//                             title={item.title}
//                             author={item.author}
//                             data={item.date}
                            
//                             />)
//                    }
//                 </ul>
//             </div>
//         )
//     }
// }

//将PostList设计成有状态组件，负责帖子列表数据的获取以及点赞行为处理
class PostList extends Component{
    constructor(props){
        super(props);
        this.state={
            posts:[]
        };
        this.timer = null //定时器
        this.handleVote = this.handleVote.bind(this);//ES6 class中，必须手动绑定方法this的指向
    }
    //组件挂载阶段，组件被创建，执行初始化，并被挂载到DOM中，完成组件第一次渲染
    //componentDidMount是挂载阶段被调用第四个方法，只会被调用一次，已经获得DOM结构，依赖DOM节点的操作放到这个方法中
    //componentDidMount通常用于向服务器端请求数据，调用this.setState会引起组件的重新渲染
    componentDidMount(){
        //用setTimeout模拟异步从服务器端获取数据
        this.timer = setTimeout(() =>{
            this.setState({
                posts:[
                    {id:1,title:"大家一起来讨论React吧", author:"张三", date:"2017-09-01 18:00:33",vote:"0"},
                    {id:2,title:"前段框架，最爱哪一个", author:"张三", date:"2017-11-03 22:11:26",vote:0},
                    {id:3,title:"Web App的时代已经到来", author:"张三", date:"2019-03-01 15:20:231",vote:0},
                ]
            });
        },1000)
    }
    //组件卸载阶段调用的唯一方法，在组件被卸载前调用，可以执行一些清理工作，比如清楚定时器，清除componentDidMount中手动创建的DOM元素等，避免内存泄漏
    componentWillUnmount(){
        if(this.timer){
            clearTimeout(this.timer);//清除定时器
        }
    }
    handleVote(id){
        //根据帖子id进行过滤，找到待修改vote属性的帖子，返回新的posts对象
        const posts = this.state.posts.map(item => {
            const newItem =item.id ===id?{...item, vote:++item.vote}:item;
            // if(item.id ===id){
            //     item.vote+=1;
            // }
            // const newItem=item;
            return newItem;
        });
        //修改完state以后需要调用this.setState使用新的posts对象设置state
        this.setState({
            posts
        })

    }

    render(){
        return(
            <div className="container">
                <h2>话题列表：</h2>
                <ul>
                    {
                        this.state.posts.map(item => 
                            <PostItem 
                             post={item}
                             onVote={this.handleVote}
                             />
                            )
                    }
                </ul>
            </div>
        )
    }
   
}

export default PostList;