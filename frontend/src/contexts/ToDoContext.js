import { createContext, useReducer } from "react";

export const ToDoContext = createContext()


export const ToDoReducer = (state, action) => {
    switch (action.type) {
        case 'SET_TODOS':
            return {
                toDos: action.payload
            }
        case 'CREATE_TODO':
            return {
                toDos: [action.payload, ...state.toDos]
            }
        case 'DELETE_TODO':
            return {
                toDos: state.toDos.filter(toDo=> toDo._id !== action.payload._id)
            }
        case 'EDIT_TODO':
            // console.log('here', action.payload._id, action.payload.done, action.payload.task);
            return {
                toDos: state.toDos.map(toDo =>
                    toDo._id === action.payload._id 
                    ? {...toDo, ...action.payload}
                    : toDo)
            }
        default:
            return state
    }
}


export const ToDoContextProvider = ({ children }) => {

    const [state, dispatch] = useReducer(ToDoReducer, {
        toDos: null
    })


    return (
        <ToDoContext.Provider value={{...state, dispatch}}>
            { children }
        </ToDoContext.Provider>
    )
}