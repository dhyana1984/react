import {observable, computed, action} from "mobx"
import { observer } from "mobx-react";
import React, { Component } from "react";
import ReactDOM from "react-dom";

class Todo {
    id =Math.random();
    @observable title ="";
    @observable finished =false;

    constructor(title) {
        this.title = title;
      }
}

class TodoList{
    @observable todos = []

    @computed
    get unfinishedTodoCount(){
        return this.todos.filter(t => !t.finished).length
    }
}

//使用@observer装饰器创建reaction
@observer
class TodoListView extends Component{
    render(){
        return (
            <div>
                <ul>
                    {this.props.todoList.todos.map(t =>(
                        <TodoView todo={t} key={t.id}/>
                    ))}
                </ul>
                Tasks left: {this.props.todoList.unfinishedTodoCount}
            </div>
        )
    }
}

const TodoView = observer(({todo}) =>{
    //定义action, 改变todo.finish
    const handleClick = action(() => todo.finished= !todo.finished)
    return (
        <li>
            <input type="checkbox" checked ={todo.finished} onClick={handleClick}/>
            {todo.title}
        </li>
    )
})

const store = new TodoList();
let a = new Todo()
a.title="Task3"
store.todos.push(new Todo("Task1"));
store.todos.push(new Todo("Task2"));
store.todos.push(a);
ReactDOM.render(<TodoListView todoList={store}/>,document.getElementById("root"))