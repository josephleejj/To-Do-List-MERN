import { useState } from "react";
import { UseToDoContext } from "../hooks/UseToDoContext"
import { format } from 'date-fns'; 
import { useAuthContext } from "../hooks/useAuthContext";
import dayjs from 'dayjs';
// import DatePicker from 'react-datepicker';
// import 'react-datepicker/dist/react-datepicker.css';


export const ToDoDetails = ({ toDo }) => {
    const {dispatch} = UseToDoContext() // todos is a global variable, dispatch is the function that allow us to make changes to the global variable
    const [isEditing, setIsEditing] = useState(false)
    const [editedTask, setEditedTask] = useState(toDo.task)
    const [editedDeadline, setEditedDeadline] = useState(toDo.deadline)

    const [error, setError] = useState(null)
    const [emptyFields, setEmptyFields] = useState([]) // empty fields from controller

    const {user} = useAuthContext()


    const handleEditClick = () => {
        setIsEditing(true)
    }

    const handleCancelClick = () => {
        setEditedTask(toDo.task);
        setEditedDeadline(toDo.deadline);
        setIsEditing(false);
        setEmptyFields([])
        setError(null)
      };


    // const handleSaveClick = (e) => {
    //     e.preventDefault()
    //     editToDo(toDo._id, { task: editedTask, deadline: editedDeadline });
    //     setIsEditing(false);
    
    //   };
    

    // const editToDo = async (toDoId, updatedToDo) => {
    //     const response = await fetch('api/todos/' + toDoId, {
    //         method: 'PATCH',
    //         headers: {
    //             'Content-Type': 'application/json'
    //         },
    //         body: JSON.stringify(updatedToDo)
    //     })

    //     const json = await response.json()

    //     if (!response.ok) {
    //         setError(json.error)
    //         setEmptyFields(json.emptyFields)
            
    //     }
        
    //     if (response.ok) {
    //         setError(null)
    //         dispatch({type:'EDIT_TODO', payload:json})
    //         console.log('To-Do Edited', json)
    //     }

    // }
    const handleSaveClick = async (e) => {
        e.preventDefault();

        if (!user) {
          setError('You must be logged in')
          return
      }
      
        const response = await fetch('api/todo/' + toDo._id, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${user.token}`
          },
          body: JSON.stringify({ task: editedTask, deadline: editedDeadline })
        });
      
        const json = await response.json();
      
        if (!response.ok) {
          setError(json.error);
          setEmptyFields(json.emptyFields);
        }
      
        if (response.ok) {
          setError(null);
          dispatch({ type: 'EDIT_TODO', payload: json });
          console.log('To-Do Edited', json);
          setIsEditing(false);
        }
      };
      
      


    const deleteToDo = async () => {
      if (!user) {
        return
    }
        const response = await fetch('api/todo/' + toDo._id, {
            method: 'DELETE',
            headers: {
              'Authorization': `Bearer ${user.token}`
            }
        })

        const json = await response.json()

        if (!response.ok) {
            console.log(json.error)
            
        }
        
        if (response.ok) {
            dispatch({type:'DELETE_TODO', payload:json})
            console.log('To-Do Deleted', json)
        }

    }

    const toggleComplete = async () => {
      if (!user) {
        return
    }
      const response = await fetch('api/todo/' + toDo._id, {
          method: 'PATCH',
          headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${user.token}`

          },
          body: JSON.stringify({
              task: toDo.task,
              deadline: toDo.deadline,
              done: !toDo.done, // Toggle the value of 'done'
          })
      })

      const json = await response.json()

      if (!response.ok) {
          console.log(json.error)
          
      }
      
      if (response.ok) {
          dispatch({type:'EDIT_TODO', payload:json})
          console.log('To-Do Edited', json)
      }

    }


    // const formattedDeadline = dayjs(editedDeadline).format('YYYY-MM-DD');
    // console.log('editedDeadline:', editedDeadline);
    // console.log('formattedDeadline:', formattedDeadline);
    return (
        <div className="todo-details">
          <div className={toDo.done ? 'strikethrough' : ''}>
            {isEditing ? (
              <form onSubmit={handleSaveClick}>
                <label>
                  Task:
                  <input
                    type="text"
                    value={editedTask}
                    onChange={(e) => setEditedTask(e.target.value)}
                    className={emptyFields.includes('task') ? 'error' : ''}
                  />
                </label>
                <label>
                  Deadline:
                  <input
                    type="date"
                    // value={formattedDeadline}
                    value={dayjs(editedDeadline).format('YYYY-MM-DD')}
                    onChange={(e) => {
                      // console.log("onChange: ", e.target.value);
                      // setEditedDeadline(e.target.value);}}
                      setEditedDeadline(new Date(e.target.value));}}
                    className={emptyFields.includes('deadline') ? 'error' : ''}
                  />
                </label>
                <button>Save</button>
                <button type="button" onClick={handleCancelClick}>
                  Cancel
                </button>
                {error && <div className="error">{error}</div>}
                

              </form>
            ) : (
              <div>
                <h4>{toDo.task}</h4>
                <p>
                  <strong>Deadline: </strong>
                  {format(new Date(toDo.deadline), 'dd MMM, yyyy')}
                </p>
                <p>
                  <strong>Status: </strong>
                  {toDo.done ? 'Completed' : 'Not Completed'}
                </p>
              </div>
            )}
          </div>
          <div>
            <span className="material-symbols-outlined" onClick={deleteToDo}>
              Delete
            </span>
            <input
              type="checkbox"
              className="icons"
              checked={toDo.done}
              onChange={toggleComplete}
            />
            <button onClick={handleEditClick}>Edit</button>
          </div>
        </div>
      );
}