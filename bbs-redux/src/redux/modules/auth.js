//Auth模块负责应用的登录和注销

import {post} from "../../utils/reuqest"
import url from "../../utils/url"
import {actions as appActions} from "./app"

const initialState = {
    userId: null,
    username: null
}

//action types

export const types = {
    LOGIN: "AUTH/LOGIN",    //登录
    LOGOUT: "AUTH/LOGOUT"   //注销
} 
 
//action creators
export const actions = {
    //异步action, 执行登录验证
    login: (username, password) =>{
        return dispatch =>{
            //每个API请求开始前，发送app模块定义的stateRequest action
            dispatch(appActions.startRequest());
            const params = {username, password};
            return post(url.login(),params).then(data => {
                //每个API请求结束后发送app模块定义的finishRequest action
                dispatch(appActions.finishRequest());
                //请求返回成功，保存登录用户的信息，否则，设置全局错误信息
                //异步调用logout或者setLoginInfo action
                if(!data.error){
                    
                    dispatch(actions.setLoginInfo(data.userId, username))
                }else{
                    dispatch(appActions.setError(data.error))
                }
            });
        };
    },
    logout:()=>({
        type: types.LOGOUT
    }),
    setLoginInfo:(userId, username) =>({
        type:types.LOGIN,
        userId:userId,
        username:username
    })
}

//reducer
const reducer = (state=initialState, action) =>{
    switch(action.type){
        case types.LOGIN:
            return {...state, userId: action.userId, username: action.username}
        case types.LOGIN:
            return {...state, userId:null, username: null};
        default:
            return state;
    }
}

export default reducer;