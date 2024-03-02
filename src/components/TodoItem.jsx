import React, { useState } from 'react'
import { useTodo } from '../context';

const TodoItem = ({ todo }) => {
    const [isTodoEditable, setisTodoEditable] = useState(false)
    const [todoMsg, settodoMsg] = useState(todo.todo)

    const { updateTodo, deleteTodo, toggleComplete } = useTodo()

    const editTodo = () => {
        updateTodo(todo.id, { ...todo, todo: todoMsg })
        setisTodoEditable(false)
    }

    const toggleCompleted = ()=>{
        toggleComplete(todo.id)
    } 
    return (
        <div
            className={`flex border border-black/10 rounded-lg px-3 py-1.5 gap-x-3 shadow-sm shadow-white/50 duration-300  text-black ${todo.completed ? "bg-gradient-to-r from-purple-400 to-blue-400" : "bg-[#e4e3f683]"
                }`}
        >
            <input
                type="checkbox"
                className="cursor-pointer"
                checked={todo.completed}
                onChange={toggleCompleted}
            />
            <input
                type="text"
                className={`border text-white outline-none w-full bg-transparent rounded-lg ${isTodoEditable ? "border-white/40 px-2" : "border-transparent"
                    } ${todo.completed ? "line-through" : ""} `}
                value={todoMsg}
                onChange={(e) => settodoMsg(e.target.value)}
                readOnly={!isTodoEditable}
            />
            {/* Edit, Save Button */}
            <button
                className="inline-flex w-8 h-8 rounded-lg text-2xl justify-center items-center text-white hover:text-black  shrink-0 disabled:opacity-50"
                onClick={() => {
                    if (todo.completed) return;

                    if (isTodoEditable) {
                        editTodo();
                    } else setisTodoEditable((prev) => !prev);
                }}
                disabled={todo.completed}
            >
                {isTodoEditable ? <i class="ri-file-2-fill"></i> : <i class="ri-file-edit-fill"></i>}
            </button>
            {/* Delete Todo Button */}
            <button
                className="inline-flex w-8 h-8 rounded-lg text-2xl justify-center items-center text-white hover:text-black shrink-0"
                onClick={() => deleteTodo(todo.id)}
            >
                <i class="ri-close-large-line"></i>
            </button>
        </div>
    )
}

export default TodoItem