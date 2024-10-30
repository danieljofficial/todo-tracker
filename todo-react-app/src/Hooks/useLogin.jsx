import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

export const useLogin = () => {
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(null)
    const { dispatch } = useAuthContext()

    const login = async (email, password) => {
        setError(null)
        setIsLoading(true);

        const response = await fetch('./api/user/login', {
            method: 'POST',
            headers: {'content-type': 'application/json'},
            body: JSON.stringify({email, password})
        })

        const json = await response.json()
        console.log('The json is', json)

        if (!response.ok) {
            setError(json.error)
            setIsLoading(false)
        }

        if (response.ok) {
            localStorage.setItem('user', JSON.stringify(json))
            dispatch({type: 'LOGIN', payload: json})
            setIsLoading(false)
        }
        
    }

    return {login, error, isLoading}
}