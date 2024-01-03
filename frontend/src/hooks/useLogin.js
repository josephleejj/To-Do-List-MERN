import { useState } from "react";
import { useAuthContext } from './useAuthContext'

export const useLogin = () => {
    // it is only initalized once when the component is initially rendered.
    // thats why we need to reset the error.
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(null)
    const {dispatch} = useAuthContext()
    
        const login = async (email, password) => {
            setIsLoading(true)
            setError(null) // reset the error to be null after every request

            // ensure proxy is set in package.json 
            const response = await fetch('/api/user/login', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({email, password})
            })

            const json = await response.json()
            if (!response.ok) {
                setIsLoading(false)
                setError(json.error)
            }

            if (response.ok) {
                // save user and jwt in local storage --> inspect element, application, local storage
                localStorage.setItem('user', JSON.stringify(json))

                // update auth context
                dispatch({type: 'LOGIN', payload:json})
                
                // update loading state
                setIsLoading(false)
            }
        }

    return { login, isLoading, error}

}
