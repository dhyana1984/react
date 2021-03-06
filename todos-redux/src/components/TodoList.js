import Todo from "./Todo";
import React from 'react'
import PropTypes from 'prop-types'

const TodoList = ({todos,onTodoClick})=> (
    <ul>
        {
            todos.map(todo =>
                <Todo key={todo.id} {...todo} onClick={() =>onTodoClick(todo.id)}/>
                )
        }
    </ul>
)

TodoList.PropTypes = {
    todos : PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number.isRequired,
        completed:PropTypes.bool.isRequired,
        text: PropTypes.string.isRequired
    }).isRequired).isRequired,

    onTodoClick: PropTypes.func
}

export default TodoList