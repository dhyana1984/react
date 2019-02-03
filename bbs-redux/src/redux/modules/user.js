//user模块维护用户信息
import {types as commentTypes} from "./comments"
import {types as postTypes} from "./posts"
const initialState={}

//reducer
const reducer = (state= initialState, action) =>{
    switch(action.type){
        //获取评论列表和帖子列表时，更新列表数据中包含的所有作者信息
        case commentTypes.FETCH_COMMENTS:
        case postTypes.FETCH_ALL_POSTS:
            return {...state, ...action.users};
        //获取帖子详情时，只需要更新当前帖子的作者信息
        case postTypes.FETCH_POST:
            return {...state,[action.user.id]:action.user}
        default:
            return state;

    }
}
export default reducer

//selector

export const getUserById = (state,id) =>{
    return state.users[id]
}