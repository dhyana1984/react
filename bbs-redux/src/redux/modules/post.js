//post模块负责与帖子相关的状态管理，包括获取帖子列表，获取帖子详情，新建帖子和修改帖子
//action types
import {actions as appActions} from "./app"
import { get, post, put } from "../../utils/reuqest";
import url from "../../utils/url";
import {combineReducers} from "redux"

const initialState={
    byId:{},
    allIds:[]
}
export const types = {
    CREATE_POST:"POSTS/CREATE_POST",            //新简帖子
    UPDATE_POST:"POSTS/UPDATE_POST",            //修改帖子
    FETCH_ALL_POSTS:"POSTS/FETCH_ALL_POSTS",    //获取帖子列表
    FETCH_POST:"POSTS/FETCH_POST"               //获取帖子详情
};

//action creators
//每个action实际上对应两个action creator，一个创建异步action发送API请求，例如fetchAllPosts
//另一个根据API返回数据创建普通的action，例如fetchAllPostSuccess
//对外只暴露异步action creator
export const actions = {
    //获取帖子列表

    fetchAllPosts: () =>{
        return (dispatch,getState) =>{
            if(shouldFetchAllPosts(getState())){
                dispatch(appActions.startRequest());
                return get(url.getPostList()).then(data =>{
                    dispatch(appActions.finishRequest());
                    if(!data.error){
                        const {posts, postIds, authors} = convertPostsToPlain(data);
                        dispatch(fetchAllPostsSuccess(posts,postIds,authors));
                    }else{
                        dispatch(appActions.setError(data.error))
                    }
                })
            }
        }
    },
    //获取帖子详情
    fetchPost: id =>{
        return (dispatch,getState) =>{
            if(shouldFetchPost(id,getState())){
                dispatch(appActions.startRequest())
                return get(url.getPostById(id)).then(data =>{
                    dispatch(appActions.finishRequest());
                    if(!data.error && data.length===1){
                        const {post,author}=convertSinglePostToPlain(data[0]);
                        dispatch(fetchPostSuccess(post,author))
                    }else{
                        dispatch(appActions.setError(data.error))
                    }
                })
            }
        }
    },
    //新建帖子
    createPost:(title, content) =>{
        return (dispatch,getState) =>{
            const state= getState();
            const author = state.auth.userId
            const params = {
                author,title,content,vote:0
            };
            dispatch(appActions.startRequest());
            return post(url.createPost(), params).then(data =>{
                dispatch(appActions.finishRequest());
                if(!data.error){
                    dispatch(createPostSuccess(data))
                }else{
                    dispatch(appActions.setError(data.error))
                }
            })
        }
    },
    //更新帖子
    updatePost: (id,post) => {
        return dispatch =>{
            dispatch(appActions.startRequest());
            return put(url.updatePost(id),post).then(data =>{
                dispatch(appActions.finishRequest());
                if(!data.error){
                    dispatch(updatePostSuccess(data));
                }else{
                    dispatch(appActions.setError(data.error))
                }
            })
        }
    }
}

//reducer
const allIds=(state=initialState.allIds, action)=>{
    switch(action.type){
        case types.FETCH_ALL_POSTS:
            return action.postIds;
        case types.CREATE_POST:
            return [action.post.id, ...state]
        default:
            return state
    }
}

const byId= (state=initialState.byId, action) =>{
    switch(action.type){
        case types.FETCH_ALL_POSTS:
            return action.posts;
        case types.FETCH_POST:
        case types.CREATE_POST:
        case types.UPDATE_POST:
            return {
                ...state,
                [action.post.id]:action.post
            };
        default:
            return state;
    }
}

 const reducer = combineReducers({
    allIds,
    byId
});

//API返回的数据有嵌套，需要把嵌套数据转换为扁平数据
const convertPostsToPlain = posts =>{
    let postsById = {};
    let postsIds=[];
    let authorsById = {}
    /*
    1.forEach()返回值是undefined，不可以链式调用。
    2.map()返回一个新数组，原数组不会改变
    3.没有办法终止或者跳出forEach()循环，除非抛出异常，
      所以想执行一个数组是否满足什么条件，返回布尔值，可以用一般的for循环实现，或者用Array.every()或者Array.some()
    4.$.each()方法规定为每个匹配元素规定运行的函数，可以返回 false 可用于及早停止循环。
    */
    posts.forEach(item => {
        postsById[item.id] = {...item, author:item.author.id};
        postsIds.push(item.id);
        if(!authorsById[item.author.id]){
            authorsById[item.author.id]= item.author
        }
    })
}

//API返回的数据有嵌套，需要把嵌套数据转换为扁平数据
const convertSinglePostToPlain = post =>{
    const plainPost = {...post, author:post.author.id};
    const author = {...post.author}

    return {
        post:plainPost,
        author
    }
}

//检查是否需要获取帖子列表，起到缓存作用
const shouldFetchAllPosts = state =>{
    return !state.posts.allIds || state.posts.allIds.length===0
}
//检查是否需要获取帖子详情
const shouldFetchPost = (id,state) =>{
      /** 
   * state中如果已经存在该post对象，且有content字段，
   * 则表明state中已经有该post的完整信息，无需再次发送请求 
  **/
    return !state.posts.byId[id]||!state.posts.byId[id].content
}
//获取帖子列表成功
const fetchAllPostsSuccess = (posts, postIds, authors) => ({
    type: types.FETCH_ALL_POSTS,
    posts,
    postIds,
    users:authors
})

//获取帖子详情成功
const fetchPostSuccess = (post, author) => ({
    type: types.FETCH_POST,
    post,
    user:author
})

//新建帖子成功
const createPostSuccess= post => ({
    type: types.CREATE_POST,
    post: post
})

//更新帖子成功
const updatePostSuccess = post =>({
    type:types.UPDATE_POST,
    post: post
})

export default reducer


//selector
export const getPostIds = state => state.posts.allIds;
export const getPostList = state => state.posts.byId
export const getPostById = (state, id) => state.posts.byId[id]