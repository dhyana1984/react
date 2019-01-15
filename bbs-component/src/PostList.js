import React, {Component} from "react";
import PostItem from "./PostItem";

const data = [
    {title:"大家一起来讨论React吧", author:"张三", date:"2017-09-01 18:00:21"},
    {title:"前段框架，最爱哪一个", author:"张三", date:"2017-09-01 18:00:21"},
    {title:"Web App的时代已经到来", author:"张三", date:"2017-09-01 18:00:21"},
];
class PostList extends Component{
    render(){
        return(
            <div>
                帖子列表：
                <ul>
                   {
                       data.map(item => 
                        <PostItem 
                            title={item.title}
                            author={item.author}
                            data={item.date}
                            
                            />)
                   }
                </ul>
            </div>
        )
    }
}

export default PostList;