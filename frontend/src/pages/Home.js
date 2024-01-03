import { useEffect } from "react"
import { ToDoDetails } from "../components/ToDoDetails"
import { ToDoForm } from "../components/ToDoForm"
import { UseToDoContext } from "../hooks/UseToDoContext"

export const Home = () => {
    // const [toDos, setToDos] = useState(null) // changes will only occur after window reloads, therefore we need a global variable to store the todos
    const {toDos, dispatch} = UseToDoContext() // todos is a global variable, dispatch is the function that allow us to make changes to the global variable

    useEffect(() => {
        const getToDos = async () => {
            const response = await fetch('/api/todo') // hitting the api call in server.js [app.get('/api/todods')]
            const json = await response.json()
            if (response.ok) {
                // setToDos(json)
                dispatch({type:'SET_TODOS', payload:json})
            }    
        }
        getToDos()
    }, [dispatch]) // because dispatch function is not delcared in useEffect, so we need to declare dependencies, 
                    // we cant create dispatch in UseEffect because UseEffect is only triggered when first rendered.

    // console.log(toDos)

    return (
        <div className="home">
            <div className="todos">
                {toDos && toDos.map((toDo) => (
                    <ToDoDetails key={toDo._id} toDo={toDo}/>
                ))}
            </div>
            <ToDoForm/>
        </div>

    )
}

