const express = require('express')

const { getToDos, getToDo, addToDo, deleteToDo, updateToDo } = require('../controllers/toDoController')

const requireAuth = require('../middleware/requireAuth')

const router = express.Router()

// require auth for all todo routes
router.use(requireAuth)

// get all todos (GET)
router.get('/', getToDos)

// get a todo (GET)
router.get('/:id', getToDo)

// add todo (POST)
router.post('/', addToDo)

// delete todo (DELETE)
router.delete('/:id', deleteToDo)

// update todo (PATCH)
router.patch('/:id', updateToDo)

module.exports = router