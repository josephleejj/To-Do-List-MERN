import { useState } from "react"
import { UseToDoContext } from "../hooks/UseToDoContext"
import { useAuthContext } from "../hooks/useAuthContext"

export const ToDoForm = () => {
    const {dispatch} = UseToDoContext() // todos is a global variable, dispatch is the function that allow us to make changes to the global variable

    const [task, setTask] = useState('')
    const [deadline, setDeadline] = useState('')
    const [error, setError] = useState(null)
    const [emptyFields, setEmptyFields] = useState([]) // empty fields from controller

    const {user} = useAuthContext()

    const addTask = async (e) => {
        e.preventDefault()

        if (!user) {
            setError('You must be logged in')
            return
        }

        // const user_id = user
        const toDo = {task, deadline}
        // console.log("todo: ", JSON.stringify(toDo))
        
        // console.log("user", user)

        const response = await fetch('/api/todo', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`
            },
            body: JSON.stringify(toDo)
        })
        // console.log("IM HERE")

        const json = await response.json()

        console.log("IM HERE(2)")
        if (!response.ok) {
            setError(json.error)
            console.log("IM HERE (3)", json)

            setEmptyFields(json.emptyFields)
            
        }
        
        if (response.ok) {
            setTask('')
            setDeadline('')
            setError(null) // set to null in case there is an error previously
            setEmptyFields([])
            dispatch({type:'CREATE_TODO', payload:json})
            console.log('New To-Do Added', json)
        }
    }
    
    return (
        <form className="todoform" onSubmit={addTask}>
            <h3> Add A New To-Do </h3>
            
            <label>Task:</label>
            <input
            type="text"
            onChange={(e) => setTask(e.target.value)}
            value={task}
            // className={emptyFields.includes('task') ? 'error' : ''}
            />

            <label>Deadline:</label>
            <input
            type="date"
            onChange={(e) => setDeadline(e.target.value)}
            value={deadline}
            // className={emptyFields.includes('deadline') ? 'error' : ''}
            />

            <button>Add To-Do</button>
            {error && <div className="error">{error}</div>}

        </form>

    )
}