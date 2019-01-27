import "./Post.css"
import React,{ Component } from 'react';
import { get, put, post } from "../utils/reuqest";
import url from "../utils/url";
import PostEditor from "./PostEditor";
import PostView from "./PostView";
import CommentList from './CommentList';

export default class Post extends Component{
    constructor(props){
        super(props);
        this.state={
            post: null,
            comments:[],
            editing:false
        }

        this.refreshComments = this.refreshComments.bind(this);
        this.handleEditClick = this.handleEditClick.bind(this);
        this.handlePostSave = this.handlePostSave.bind(this);
        this.handlePostCancel = this.handlePostCancel.bind(this);
        this.handleCommentSubmit = this.handleCommentSubmit.bind(this);
        this.refreshPost = this.refreshPost.bind(this);
    }

    componentDidMount(){
        this.refreshComments()
        this.refreshPost();
    }
    //获取帖子详情
    refreshPost(){
        const postId = this.props.match.params.id;
        get(url.getPostById(postId)).then(data => {
            if(!data.error && data.length ===1){
                this.setState({
                    post:data[0]
                })
            }
        })
    }

    //获取评论列表
    refreshComments(){
        const postId = this.props.match.params.id;
        get(url.getCommentList(postId)).then(data => {
            if(!data.error){
                this.setState({
                    comments:data
                })
            }
        })
    }

    //让帖子处于编辑状态
    handleEditClick(){
        this.setState({
            editing:true
        })
    }

    //保存帖子
    handlePostSave(data){
        const postId = this.props.match.params.id;
        this.savePost(postId,data)
    }
    //取消编辑 帖子
    handlePostCancel(){
        this.setState({
            editing:false
        })
    }

    //提交新的评论
    handleCommentSubmit(content){
        const postId = this.props.match.params.id;
        const comment ={
            author: this.props.userId,
            post:postId,
            content:content
        }
    }

    //保存评论到服务器
    saveComment(comment){
        post(url.createComment(),comment).then( data => {
            if(!data.error){
                this.refreshComments()
            }
        })
    }

    //同步帖子的修改到服务器
    savePost(id,post){
        put(url.updatePost(id),post).then(data => {
            if(!data.error){
                /* 返回的帖子对象只有author的id信息
                  updatePost: id => `/post/${id}`,
                  需要额外把完整的author信息合并到帖子对象 */
                const newPost = {...data, author:this.state.post.author};
                this.setState({
                    post:newPost,
                    editing:false
                })
            }
        })
    }

    render(){
        const { post,comments,editing} = this.state;
        const {userId} = this.props
        if(!post){
            return null
        }
        const editable = userId===post.author.id;
        return(
            <div className="post">
                {
                    editing ? <PostEditor post={post} onSave={this.handlePostSave} onCancel={this.handlePostCancel}/> 
                    /*如果editing=false，则用PostView展示一个帖子 */
                    : <PostView post={post} editable={editable} onEditClick={this.handleEditClick}/>
                }
                <CommentList comments={comments} editable={Boolean(userId)} onSubmit={this.handleCommentSubmit}/>
            </div>
        )
    }

}