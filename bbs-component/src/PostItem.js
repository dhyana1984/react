import React, {Component} from "react";

class PostItem extends Component{
    render(){
        //props用于父组件把数据传递给子组件
        const {title, author, date} = this.props;
        return(
            <li>
                <div>
                    {title}
                </div>
                <div>
                    创建人：{author}
                </div>
                <div>
                    创建时间：{date}
                </div>
            </li>
        )
    }
   
}

export default PostItem;