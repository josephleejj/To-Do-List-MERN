import { ToDoContext } from "../contexts/ToDoContext";
import { useContext } from "react";


export const UseToDoContext = () => {
    const context = useContext(ToDoContext)

    if (!context) {
        throw Error('useToDoContext must be used inside an ToDoContextProvider')
    }
   
    return context
}