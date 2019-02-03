//index是reducer的根模块
import {combineReducers} from "redux"
import app from "./app"
import auth from "./auth"
import ui from "./ui"
import comments, {getCommentById, getCommentIdsByPost} from "./comments"
import posts,{getPostById,getPostIds} from "./posts"
import users,{getUserById} from "./user"

//合并所有模块的reducer成一个根reducer
const rootRecudcer = combineReducers({
    app,auth,ui,comments,posts,users
});

export default rootRecudcer

//selector
export const getPostListWithAuthors = state =>{
    //通过posts模块的getPostIds获取所有帖子的id
    const postIds=getPostIds(state);
    return postIds.map(id =>{
        //通过posts模块的getPostById获取每个帖子的详情
        const post =getPostById(state,id);
        // user模块的getUserById获取作者信息,并将作者信息合并到post对象中
        return {...post, author: getUserById(state,post.author)};
    })
}

export const getPostDetail= (state, id) =>{
    const post = getPostById(state, id);
    return post ?{...post,author:getUserById(state,post.author)}: null
}


export const getCommentsWithAuthors = (state, postId) => {
    const commentIds = getCommentIdsByPost(state, postId);
    if (commentIds) {
      return commentIds.map(id => {
        const comment = getCommentById(state, id);
        return { ...comment, author: getUserById(state, comment.author) };
      });
    } else {
      return [];
    }
  };