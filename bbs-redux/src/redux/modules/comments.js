//comments模块负责获取帖子的评论列表和创建新评论
import {actions as appActions} from "./app"
import { get, post } from "../../utils/reuqest";
import url from "../../utils/url";
import {combineReducers} from "redux"
const initialState = {
    byPost:{},
    byId: {}
}

//acttion types
export const types = {
    FETCH_COMMENTS:"COMMENTS/FETCH_COMMENTS",    //获取评论列表
    CREATE_COMMENT:"COMMENTS/CREATE_COMMENT"     //新建评论
}

//action creators
export const actions ={
    //获取评论列表
    fetchComments:postId =>{
        return (dispatch,getState) => {
            if(shouldFetchComments(postId,getState())){
                dispatch(appActions.startRequest());
                return get(url.getCommentList(postId)).then(data =>{
                    dispatch(appActions.finishRequest());
                    if(!data.error){
                        const {comments, commentIds, users}=convertToPlainStructure(data);
                        dispatch(fetchCommentsSuccess(postId,commentIds,comments,users))
                    }else{
                        dispatch(appActions.setError(data.error))
                    }
                })
            }
        }
    },
    //新建评论
    createComment: comment =>{
        return dispatch =>{
            dispatch(appActions.startRequest());
            return post(url.createComment(),comment).then (data =>{
                dispatch(appActions.finishRequest());
                if(!data.error){
                    dispatch(createCommentsSuccess(data.post,data))
                }else{
                    dispatch(appActions.setError(data.error))
                }
            })
        }
    }
}



//新建评论成功
const createCommentsSuccess=(postId,comment)=>({
    type:types.CREATE_COMMENT,
    postId,
    comment
})





//检查是否需要获取评论，起到缓存作用
const shouldFetchComments= (postId,state) =>{

    return !state.comments.byPost[postId]
}

const convertToPlainStructure = comments =>{
    let commentsById={}
    let commentIds=[]
    let authorsById={}
    comments.forEach( item =>{
        commentsById[item.id] ={...item,author:item.author.id};
        commentIds.push(item.id);
        if(!authorsById[item.author.id]){
            authorsById[item.author.id]=item.author;
        }
    })
    return {
        comments:commentsById,
        commentIds,
        users:authorsById
    }
}

//reducers

const byPost = (state = initialState.byPost, action)=>{
    switch(action.type){
        case types.FETCH_COMMENTS:
            return {...state, [action.postId]:action.commentIds}
        case types.CREATE_COMMENT:
            return {
                ...state,
                [actiom.postId]:[action.comment.id, ...state[action.postId]]
            };
        default:
            return state;
    }
}

const byId =(state=initialState.byId, action) => {
    switch (action.type) {
        case types.FETCH_COMMENTS:
            return {...state, ...action.conmments}
        case types.CREATE_COMMENT:
            return {...state,[action.comment.id]:action.comment}
        default:
            return state;
    }
}

const reducer = combineReducers({
    byPost,
    byId
})

export default reducer;
//获取评论列表成功
const fetchCommentsSuccess=(postId, commentsIds,comments,users) =>({
    type:types.FETCH_COMMENTS,
    postId,
    commentsIds,
    comments,
    users
})

//selector

export const getCommentIdsByPost = (state,postId) =>state.comments.byPost[postId]

export const getComments = state => state.comments.byId;

export const getCommentById= (state,id) =>state.comments.byId[id]