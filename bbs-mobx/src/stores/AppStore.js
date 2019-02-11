
//AppStore管理的state包括应用当前的请求数量requestQuantity和应用错误信息error
import { computed, observable, action } from "mobx";


class AppStore{
    @observable requestQuantity = 0;
    @observable error = null

    //这个computed value直接标识是否显示Loading效果
    @computed get isLoading(){
        return this.requestQuantity >0;
    }

    //当前进行的请求数量加1
    @action increaseRequest(){
        this.requestQuantity +=1;
    }

    //当前请求数量减1
    @action decreaseRequest(){
        if(this.requestQuantity>0){
            this.requestQuantity -=1;
        }
    }

    //设置错误信息
    @action setError(err){
        this.error=err
    }

    //删除错误信息，因为会作为回调函数被单独调用，所以这里要绑定this
    //action.bound就是绑定this, 因为存在removeError不是通过AppStore实例调用的场景，而是直接作为组件的回调函数被使用
    //绑定的目的是使removeError的this一直指向AppStore实例
    @action.bound removeError(){
        this.error=null;
    }
}

export default AppStore;