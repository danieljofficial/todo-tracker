const mongoose = require('mongoose');

const Schema = mongoose.Schema

const taskSchema = new Schema ({
    taskText: {
        type: String,
        required: true
    },
    isCompleted: {
        type: Boolean,
        required: true
    },
    user_id: {
        type: String,
        required: true
    }
}, {timestamps: true})

module.exports = mongoose.model('Task', taskSchema)