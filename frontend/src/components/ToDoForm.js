import { useState } from "react"
import { UseToDoContext } from "../hooks/UseToDoContext"

export const ToDoForm = () => {
    const {dispatch} = UseToDoContext() // todos is a global variable, dispatch is the function that allow us to make changes to the global variable
    const [task, setTask] = useState('')
    const [deadline, setDeadline] = useState('')
    const [error, setError] = useState(null)
    const [emptyFields, setEmptyFields] = useState([]) // empty fields from controller


    const addTask = async (e) => {
        e.preventDefault()

        const toDo = {task, deadline}

        const response = await fetch('/api/todo', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(toDo)
        })

        const json = await response.json()

        if (!response.ok) {
            setError(json.error)
            setEmptyFields(json.emptyFields)
            
        }
        
        if (response.ok) {
            setTask('')
            setDeadline('')
            setError(null) // set to null in case there is an error previously
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
            className={emptyFields.includes('task') ? 'error' : ''}
            />

            <label>Deadline:</label>
            <input
            type="date"
            onChange={(e) => setDeadline(e.target.value)}
            value={deadline}
            className={emptyFields.includes('deadline') ? 'error' : ''}
            />

            <button>Add To-Do</button>
            {error && <div className="error">{error}</div>}

        </form>

    )
}