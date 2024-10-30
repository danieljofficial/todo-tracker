import { useState, useEffect, useContext } from "react"
import {DndContext, KeyboardSensor, PointerSensor, TouchSensor, closestCorners, useSensor, useSensors} from "@dnd-kit/core"
import {arrayMove, SortableContext, verticalListSortingStrategy, sortableKeyboardCoordinates} from "@dnd-kit/sortable"
import {restrictToParentElement, restrictToVerticalAxis} from "@dnd-kit/modifiers"
import { TasksContext } from "../Context/TaskContext";
import Task from "./Task"
import { useAuthContext } from "../Hooks/useAuthContext";


function List() {   
    const [filteredTasks, setFilteredTasks] = useState([])

    const {tasks, dispatch} = useContext(TasksContext)

    const [filter, setFilter] = useState({
        all: true,
        active: false,
        completed: false,
    })
    const { user } = useAuthContext()

    useEffect(() => {

        if (filter.active) {
            const fetchActiveTasks = async () => {
                const response = await fetch('/api/tasks/active', {
                    headers: {
                        'Authorization': `Bearer ${user.token}`
                    }
                })
    
                const json = await response.json() 
    
                if (response.json) {
                    dispatch({type: 'GET_ACTIVE_TASKS', payload: json})
                }
            }
            if (user) {
              fetchActiveTasks()  
            }
            
            return
        }

        if (filter.completed) {
            const fetchCompletedTasks = async () => {
                const response = await fetch('/api/tasks/completed', {
                    headers: {
                        'Authorization': `Bearer ${user.token}`
                    }
                })
    
                const json = await response.json() 
    
                if (response.json) {
                    dispatch({type: 'GET_COMPLETED_TASKS', payload: json})
                }
            }
            if (user) {
                fetchCompletedTasks()
            }
            
            return
        }

        const fetchTasks = async () => {
            const response = await fetch('/api/tasks', {
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }
            })

            const json = await response.json() 

            if (response.json) {
                dispatch({type: 'SET_TASKS', payload: json})
            }
        }
        if (user) {
            fetchTasks()
        }


    }, [filter, user])


    const [taskText, setTaskText] = useState()
    const [isLoading, setIsLoading] = useState(null)
    const addTask = async () => {
        if (!user) return
        if (document.getElementById("addTask").value === "") {
            return
        }
        
        setIsLoading(true)
        // Watch for errors from below.
        const newTask = {taskText, isCompleted: false}

        const response = await fetch('api/tasks', {
            method: 'POST',
            body: JSON.stringify(newTask),
            headers: {
                'content-type': 'application/json',
                'Authorization': `Bearer ${user.token}`
            }
        })

        const json = await response.json()

        if (response.ok) {
            setTaskText('')
            dispatch({type: 'CREATE_TASK', payload: json})
            setIsLoading(false)
        }
    }

    const clearCompletedTasks = async () => {
        if (!user) return
        const response = await fetch('./api/tasks/completed', {
            method: 'DELETE', 
            headers: {
                'Authorization': `Bearer ${user.token}`
            }
        })
    
            const json = await response.json()
    
            if (response.ok) {
                dispatch({type: 'DELETE_COMPLETED_TASKS', payload: json})
        }
    } 

    const handleCompletedTasks = () => {
        setFilter({
            all: false,
            active: false,
            completed: true,
        })
    }

    const handleActiveTasks = () => {       
        setFilter({
            all: false,
            active: true,
            completed: false,
        })

    }

    const handleAllTasks = () => {
        setFilter({
            all: true,
            active: false,
            completed: false,
        })
    }

    const handleDragEnd = (event) => {
        const {active, over} = event
        
        if (active.id === over.id) {
            dispatch({type: 'DND', payload: tasks})
            return
        }

        let movedArray

        const activeIndex = tasks.findIndex(task => task._id === active.id)
        const overIndex = tasks.findIndex(task => task._id === over.id)

        movedArray = arrayMove(tasks, activeIndex, overIndex)
        
        dispatch({type: "DND", payload: movedArray})

    
    }

    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(TouchSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    )
 
    return (
        <div className="listContainer">
            <div className="list">
                <div className="createTodo">
                    <label htmlFor="addTask">
                        <button disabled={isLoading} className="addTaskButton" onClick={addTask}></button>
                    </label>
                    <input 
                        type="text" 
                        value={taskText} 
                        id="addTask" 
                        name="addTask" 
                        placeholder="Create a new todo..."
                        onChange={e => setTaskText(e.target.value)}
                    />  
                               
                { isLoading && (
                    <svg>
                        <circle cx="10" cy="10" r="10"></circle>
                    </svg>
                )}
                </div>
                <DndContext 
                    modifiers={[restrictToVerticalAxis, restrictToParentElement]}
                    onDragEnd={handleDragEnd} 
                    collisionDetection={closestCorners} 
                    sensors={sensors}
                >
                            <ul className="taskList" id="tasklist">  
                            <SortableContext items={tasks} strategy={verticalListSortingStrategy}>
                            {tasks && tasks.map((task, index) => 
                                    <Task 
                                        index={index}
                                        key={task._id}
                                        task={task}
                                        id={task._id}
                                    />
                            )}
                            </SortableContext>    
                                {user && tasks.length > 0 ?
                                    <div className="underBar">           
                                        <span className="itemsLeft">{tasks && tasks.length > 1 ? `${tasks.length} items left` : `${tasks.length} item left`}</span>
                                        <button className="clear" onClick={clearCompletedTasks}>Clear completed</button>     
                                    </div> : <div className="underBar">{user ? 'Nothing to see here yet...' : 'Log in to see tasks.' }</div>
                                }
                            </ul>   
                </DndContext>
                <div className="sortTasks" >
                    <button className="all" onClick={handleAllTasks} >all</button>
                    <button className="active" onClick={handleActiveTasks}>active</button>
                    <button className="completed" onClick={handleCompletedTasks}>completed</button>
                </div>
                <div className="orderRemind">
                    Drag and drop text to reorder list.
                </div>
            </div>
        </div>
    )
}

export default List