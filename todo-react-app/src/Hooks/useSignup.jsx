import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

export const useSignup = () => {
    const [isLoading, setIsLoading] = useState(null)
    const [error, setError] = useState(null)
    const { dispatch } = useAuthContext()
    const signup = async (userName, email, password) => {
        setIsLoading(true)
        setError(null)
        const response = await fetch('/api/user/signup', {
            method: 'POST', 
            headers: {'content-type': 'application/json'},
            body: JSON.stringify({userName, email, password})
        })
        console.log( response)
        const json = await response.json()
        
        if (!response.ok) {
            setIsLoading(false)
            setError(json.error)
        } 
        if (response.ok) {
            localStorage.setItem('user', JSON.stringify(json))
            dispatch({type: 'LOGIN', payload: json})

            setIsLoading(false)
        }

        setTimeout(() => {
            setIsLoading(false)
        }, 30000);
    }

    return { signup, isLoading, error}
}