import { useAuthContext } from "./useAuthContext"
import { TasksContext } from "../Context/TaskContext"
import { useContext } from "react"

export const useLogout = () => {
    const {dispatch: tasksDispatch} = useContext(TasksContext)
    const {dispatch} = useAuthContext()
    const logout = () => {
        localStorage.removeItem('user')
        dispatch({type: 'LOGOUT'})    
        tasksDispatch({type: 'SET_TASKS', payload: []})
    }

    return {logout}
}