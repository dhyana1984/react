import { observable,action } from "mobx";


//PostModel类来描述帖子对应的state
class PostModel{
    store; //PostModel实例对象所属的store
    id;
    @observable title;
    @observable content;
    @observable vote;
    @observable author;
    @observable createdAt;
    @observable updatedAt;

    constructor(store, id, title, content, vote, author, createdAt, updatedAt){
        this.store = store;
        this.id = id
        this.title = title
        this.content = content
        this.vote=vote
        this.author=author
        this.createdAt = createdAt
        this.updatedAt=updatedAt;
    }

    //根据JSON对象更新帖子
    //用于根据服务器端返回的数据更新PostModel实例
    @action updateFromJS(json){
      
        this.title = json.title
        this.content = json.content
        this.vote=json.vote
        this.author=json.author
        this.createdAt = json.createdAt
        this.updatedAt=json.updatedAt;

    }

    //静态方法，创建新的PostModel实例
    //用于根据服务器端返回的数据构造PostModel实例
    static fromJS(store, object){
        return new PostModel(
            store,
            object.id,
            object.title,
            object.content,
            object.vote,
            object.author,
            object.createdAt,
            object.updatedAt,
        )
    }
}

export default PostModel