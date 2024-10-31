const Task = require('../models/TaskModel')

const mongoose = require('mongoose')

const getTasks = async (req, res) => {
    const user_id = req.user._id
    const tasks = await Task.find({ user_id })

    return res.status(200).json(tasks)
}

const getCompletedTasks = async (req, res) => {
    const user_id = req.user._id
    const completedTask = await Task.find({ isCompleted: true, user_id })
    if (!completedTask) {
        return res.status(400).json({error: 'No such task!'})
    }

    return res.status(200).json(completedTask)
}

const getActiveTasks = async (req, res) => {
    const user_id = req.user._id
    const activeTasks = await Task.find({ isCompleted: false, user_id })
    if (!activeTasks) {
        return res.status(400).json({error: 'No such task!'})
    }

    return res.status(200).json(activeTasks)
}

const createTask = async (req, res) => {
    const { taskText, isCompleted } = req.body

    try {
        const user_id = req.user._id
        const task = await Task.create({ taskText, isCompleted, user_id })
        res.status(200).json(task)
    } catch {
        res.status(400).json({error: 'Failed to create task!'})
    }
}

const deleteTask = async (req, res) => {
    const { id } = req.params

    if (id === 'completed') {
        const task = await Task.deleteMany({ isCompleted: true })

        if (!task) {
            return res.status(400).json({error: 'Failed to delete completed tasks!'})
        }
 
        res.status(200).json(task)
        return
    }

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({error: 'Incorrect id!'})
    }

    const task = await Task.findOneAndDelete({ _id: id })

    if (!task) {
        return res.status(400).json({error: 'No such task!'})
    }
 
    res.status(200).json(task)

}

const updateTask = async (req, res) => {
    const {id} = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({error: 'Invalid task id'})
    }

    const task = await Task.findOneAndUpdate({_id: id}, req.body, {new: true})
    if (!task) {
        return res.status(400).json({error: 'No such task'})
    }

    res.status(200).json(task)
}

module.exports = { 
    getTasks, 
    getCompletedTasks, 
    getActiveTasks, 
    createTask, 
    deleteTask, 
    updateTask
}

