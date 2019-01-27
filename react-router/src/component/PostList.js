
import React,{ Component } from 'react';
import {get,post} from '../utils/reuqest';
import url from '../utils/url';
import PostEditor from './PostEditor';
import PostView from './PostView';
import "./PostList.css"

export default class  PostList extends Component{
    constructor(props){
        super(props);
        this.state = {
            posts:[],
            newPost: false
        };
        this.handleSave = this.handleSave.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.handleNewPost = this.handleNewPost.bind(this);
        this.refreshPostList = this.refreshPostList.bind(this);

    }

    componentDidMount(){
        this.refreshPostList();
    }

    //获取帖子列表
    refreshPostList(){
        get(url.getPostList()).then(data => {
            if(!data.error){
                this.setState({
                    posts:data,
                    newPost:false
                });
            }
        });
    }

    //保存帖子
    handleSave(data){
        //当前登录用户的信息和默认的点赞数，同帖子的标题和内容，共同构成最终待保存的帖子对象
        const postData = {...data, author: this.props.userId,vote:0};
        post(url.createPost(),postData).then(data => {
            if(!data.error){
                //保存成功后，刷新帖子列表
                this.refreshPostList();
            }
        })
    }

    //取消新建帖子
    handleCancel(){
        this.setState({
            newPost: false
        })
    }

    //新建帖子
    handleNewPost(){
        this.setState({
            newPost:true
        })
    }

    render(){
        const {userId} = this.props;
        return (
            <div className="postList">
                <div>
                    <h2>帖子列表</h2>
                    {/* 只有在登录状态才显示发帖按钮 */}
                    {userId? <button onClick={this.handleNewPost}>发帖</button>: null}
                </div>
                {/* 若当前正在创建新帖子，则渲染PostEditor组件 */}
                {
                    this.state.newPost?<PostEditor onSave={this.handleSave} onCancel={this.handleCancel}></PostEditor> :  null
                }
                {/* PostView显示帖子数量 */}
                <PostView posts={this.state.posts}></PostView>
            </div>
        )
    }

}