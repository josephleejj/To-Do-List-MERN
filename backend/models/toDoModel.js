const mongoose = require('mongoose')
const Schema = mongoose.Schema

const toDoSchema = new Schema ({
	task: {
		type: String,
		required: true,
	},
    done: {
        type: Boolean,
        default: false,
    },
    deadline: {
        type: Date,
    },
})

module.exports = mongoose.model('toDo', toDoSchema)
