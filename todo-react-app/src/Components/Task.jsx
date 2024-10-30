import {useSortable} from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import { useContext, useState } from "react"
import { TasksContext } from "../Context/TaskContext"
import { useAuthContext } from "../Hooks/useAuthContext"

const Task = ({ onTaskChecked, index, task, id}) => {

    const {attributes, listeners, setNodeRef, transform, transition} = useSortable({id: task._id})

    const {dispatch} = useContext(TasksContext)
    
    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    }
    const { user } = useAuthContext()
    
    const [isLoading, setIsLoading] = useState()
    const removeTask = async () => {
        if (!user) return
        setIsLoading(true)
        const response = await fetch('./api/tasks/' + task._id, {
            method: 'DELETE', 
            headers: {
                'Authorization': `Bearer ${user.token}`
            }
        })

        const json = await response.json()

        if (response.ok) {
            dispatch({type: 'DELETE', payload: json})
            setIsLoading(false)
        }
    }

    const updateTask = async () => {
        if (!user) return
        setIsLoading(true)
        const updatedTask = {isCompleted: !task.isCompleted}
        const response = await fetch('./api/tasks/' + task._id, {
        method: 'PATCH',
        body: JSON.stringify(updatedTask),
        headers: {
            'Accept': 'application/json',
            'Content-type': 'application/json',
            'Authorization': `Bearer ${user.token}`
        }
        })

        const json = await response.json()
        if (response.ok) {
            dispatch({type: 'UPDATE_TASK', payload: json})
            setIsLoading(false)
        }
    }
 

    return (
            <label htmlFor={`Item${index + 1}`}  ref={setNodeRef} style={style} className="taskElement">  
                <input disabled={isLoading} onChange={updateTask} type="checkbox" name="" id={`Item${index + 1}`} className="taskInput" checked={task.isCompleted}/>                   
                <div {...attributes} {...listeners} className="taskText" >{task.taskText}</div>
                <button disabled={isLoading} className="deleteButton" onClick={removeTask} >
                    <img src="../src/assets/icon-cross.svg" alt="" id="cross"/> 
                </button> 
                { isLoading && (
                    <svg>
                        <circle cx="10" cy="10" r="10"></circle>
                    </svg>
                )}                    
            </label>    
    )       
}

export default Task