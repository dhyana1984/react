import { observable, toJS } from "mobx";
import PostModel from './../models/PostModel';


class PostsStore{
    api;
    appStore;
    authorStore
    @observable posts =[] //数组元素是PostModel实例

    constructor(api, appStore, authorStore){
        this.api=api
        this.appStore = appStore
        this.authorStore=authorStore
    }

    //根据帖子id获取当前store中的帖子
    getPost(id){
        return this.posts.find(t => t.id===id)
    }

    //从服务器获取帖子列表
    @action fetchPostList(){
        this.appStore.increaseRequest();
        return this.api.getPostList().then(action(data =>{
            this.appStore.decreaseRequest();
            if(!data.error){
                this.posts.clear()
                data.forEach(post => this.posts.push(PostModel.fromJS(this,post)))
                return PromiseRejectionEvent.resolve();
            }else{
                this.appStore.setError(data.error)
                return PromiseRejectionEvent.reject();
            }
        }))
    }

    //从服务器获取帖子详情
    @action fetchPostDetail(id){
        this.appStore.increaseRequest();
        return this.api.getPostById(id).then(action(data =>{
            this.appStore.decreaseRequest();
            if(!data.error && data.length ===1){
                const post = this.getPost(id)
                //如果store中当前post已存在，就更新post
                //否则，添加post到store
                if(post){
                    post.updateFromJS(data[0])
                }else{
                    this.posts.push(PostModel.fromJS(this,data[0]))
                }
                return PromiseRejectionEvent.resolve();
            }else{
                this.appStore.setError(data.error)
                return PromiseRejectionEvent.reject();
            }
        }))
    }

    //新建帖子

    @action createPost(post){
        const content={...post, author:this.authorStore.userId, vote:0};
        this.appStore.increaseRequest();
        return this.api.createPost(content).then(action(data =>{
            this.appStore.decreaseRequest();
            if(!data.error){
                this.posts.unshift(PostModel.fromJS(this,data))
                return Promise.resolve()
            }else{
                this.appStore.setError(data.error)
                return Promise.reject()
            }
        }))
    }

    //更新帖子
    @action updatePost(id, post){
        this.appStore.increaseRequest()
        return this.api.updatePost(id,post).then(action(data =>{
            this.appStore.decreaseRequest();
            if(!data.error){
                const oldPost = this.getPost(id)
                if(oldPost){
                    /*更新帖子的API，返回数据中的author只包含aothorid
                     *因此需要从原来的post对象中获取完整的author数据
                     *toJS是MobX提供的函数，用于巴可观测对象转换为普通的JS对象*/
                    data.author = toJS(oldPost.author)
                    oldPost.updateFromJS(data)
                }
                return Promise.resolve()
            }else{
                this.appStore.setError(data.error)
                return Promise.reject()
            }
        }))
    }

}

export default PostsStore