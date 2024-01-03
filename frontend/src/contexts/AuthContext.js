import { createContext, useEffect, useReducer } from "react";

export const AuthContext = createContext()

export const authReducer  = (state, action) => {
    switch (action.type) {
        case 'LOGIN':
            return { user:action.payload}
        case 'LOGOUT':
            return {user:null}
        // none of the switch case matches, return the original state
        default:
            return state
    }
}

export const AuthContextProvider = ({ children }) => {
    // useReducer takes in a reducer function (created above) and the initial value of state.
    // useReducer is similar to useState, but it allows for more complex logic and it takes in a dispatch ({ type, payload})
    // it returns the current state, and the dispatch function. the dispatch function is used for accessing the reducer later.
    const [state, dispatch] = useReducer(authReducer, {
        user:null
    })

    // useEffect takes in a function and an array of dependencies (input into the array if present)
    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'))
        
        if (user) {
            dispatch({type:'LOGIN', payload:user})
        }
    }, [])


    console.log('AuthContext state: ', state)
    return ( 
        /* 
            it returns a template, which is the context we created above
            whatever value we set here will be made available to our components
            
            in provider, we are wrapping children (in index.js) as components to access context.
            this means that all components in children can access this context.
         */
        <AuthContext.Provider value={{...state, dispatch}}>
            { children } 
        </AuthContext.Provider>
    )
}