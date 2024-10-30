import { createContext, useReducer } from "react";
import { arrayMove } from "@dnd-kit/sortable";

export const TasksContext = createContext();

export const  tasksReducer =  (state, action) => {
    switch (action.type) {
        case "SET_TASKS":
            return {
                tasks: action.payload
            };
        case "CREATE_TASK":
            return {
                tasks: [action.payload, ...state.tasks]
            };
        case "DELETE":
            return {
                tasks: state.tasks.filter((t) => t._id !== action.payload._id)
            };
        case "DELETE_COMPLETED_TASKS":
            return {
                tasks: state.tasks.filter((t) => t.isCompleted !== true)
            };
        case "GET_ACTIVE_TASKS":
            return {
                tasks: action.payload
            };
        case "GET_COMPLETED_TASKS":
            return {
                tasks: action.payload
            };
        case "UPDATE_TASK":
            console.log(action.payload)
            const findItem = state.tasks.findIndex(task => task._id === action.payload._id)
            state.tasks.splice(findItem, 1, action.payload)
            return {
                tasks: state.tasks
            };
        case "DND":
            // const {active, over} = action.payload
            // console.log('active: ' + active.id)
            // console.log('over: ' + over.id)
            // let movedArray

            // if (active.id === over.id) {
                // async function test () {
                //     return {tasks: await state.tasks}
                    
                // } 
                // test()
                // return {
                    // tasks: state.tasks
                // }

            // }

            // let activeIndex = state.tasks.findIndex(task => task._id === active.id)
            // let overIndex = state.tasks.findIndex(task => task._id === over.id)
            // console.log(activeIndex)
            // console.log(overIndex)

            // movedArray = arrayMove(state.tasks, activeIndex, overIndex)
            // console.log(movedArray)

            return {
                tasks: action.payload
            };
        default:
            return state
    }
}

export const TasksContextProvider = ({children}) => {
    const [state, dispatch] = useReducer(tasksReducer, {
        tasks: []
    })

    return (
        <TasksContext.Provider value={{...state, dispatch}}>
            {children}
        </TasksContext.Provider>
    )
}