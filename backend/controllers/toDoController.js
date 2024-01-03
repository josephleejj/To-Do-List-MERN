const mongoose = require('mongoose')
const toDoModel = require('../models/toDoModel')

// get all todos
const getToDos = async (req, res) => {
    const toDos = await toDoModel.find({}).sort({deadline:-1})
    res.status(200).json(toDos)
}

// find a todo
const getToDo = async (req, res) => {
    const {id} = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: "Invalid To Do"}) 
    }

    const toDo = await toDoModel.findOne({_id:id})
    
    if (!toDo) {
        return res.status(400).json({ error: "No such To Do"})
    }

    res.status(200).json(toDo)
    
}


// add todo
const addToDo = async (req, res) => {    
    const {task, deadline} = req.body
    let emptyFields = []

    if (!task) {
        emptyFields.push('task')
    }
    if (!deadline) {
        emptyFields.push('deadline')
    }
    if (emptyFields.length > 0) {
        return res.status(400).json({error: 'Please fill in all the fields', emptyFields}) 
    }
    
    try {
        const toDo = await toDoModel.create({
            task: task,
            deadline: deadline
        })
        res.status(200).json(toDo)

    } catch (error) {
        res.status(400).json({error:error.message})
    }
}

// delete a todo
const deleteToDo = async (req, res) => {
    const {id} = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: "Invalid To Do"})
    }

    const toDo = await toDoModel.findOneAndDelete({_id:id})

    if (!toDo) {
        return res.status(400).json({ error: "No such To Do"})
    }

    res.status(200).json(toDo)

}


// update a todo
const updateToDo = async (req, res) => {
    const {task, deadline} = req.body    

    let emptyFields = []
    if (!task) {
        emptyFields.push('task')
    }
    if (!deadline) {
        emptyFields.push('deadline')
    }
    if (emptyFields.length > 0) {
        return res.status(400).json({error: 'Please fill in all the fields', emptyFields}) 
    }

    const {id} = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: "Invalid To Do"})
    }

    const toDo = await toDoModel.findOneAndUpdate(
        {_id:id}, 
        {...req.body},
        { new: true }
    )

    if (!toDo) {
        res.status(400).json({error:error.message})
    }

    res.status(200).json(toDo)

}



module.exports = { getToDos, getToDo, addToDo, deleteToDo, updateToDo }