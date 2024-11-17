import { createContext, useReducer, useEffect } from "react";
import {jwtDecode} from "jwt-decode"

export const AuthContext = createContext()

export const authReducer = (state, action) => {
    switch (action.type) {
        case 'LOGIN':
            return {
                user: action.payload
            }            
        case 'LOGOUT':
            return {
                user: null
            }
        default:
            return state
    }
}

export const AuthContextProvider = ({ children}) => {
    const [state, dispatch] = useReducer(authReducer, {
        user: null
    })
    
    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'))
        if (user) {
            const token = user.token
            const decodedToken = jwtDecode(token)
            const currentTime = Math.floor(Date.now() / 1000)
            
            if (decodedToken.exp > currentTime) {
                dispatch({type: 'LOGIN', payload: user})
            } else {
                localStorage.removeItem("user")
                dispatch({ type: "LOGOUT"})
            }
        }
    }, [])

    return (
        <AuthContext.Provider value={{...state, dispatch}}>
            { children }
        </AuthContext.Provider>
    )
}