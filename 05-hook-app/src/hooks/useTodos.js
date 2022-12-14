import { useEffect, useReducer, useState } from "react"
import { todoReducer } from "../08-useReducer/todoReducer"

export const useTodos = () => {

    const init = () => JSON.parse(localStorage.getItem('todos')) || []
    const [todos, dispatch] = useReducer(todoReducer, [], init)
    useEffect(() => {
        localStorage.setItem('todos', JSON.stringify(todos))                
    }, [todos])

    const onNewTodo = todo => {
        const action = {
            type: '[TODO] Add Todo',
            payload: todo
        }
        dispatch(action)
    }

    const onDeleteTodo = (id) => {
        const action = {
            type: '[TODO] Remove Todo',
            payload: id
        }
        dispatch(action)
    }

    const onToogleTodo = (id) => {
        const action = {
            type: '[TODO] Toogle Todo',
            payload: id
        }
        dispatch(action)
    }

    return {
        todos,
        onNewTodo,
        onDeleteTodo,
        onToogleTodo,
        todosTotal: todos.length,
        todosPending: todos.filter(t=>!t.done).length
    }
}
