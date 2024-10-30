const express = require('express')

const {
    getTasks, 
    getCompletedTasks, 
    getActiveTasks, 
    createTask, 
    deleteTask, 
    updateTask
} = require('../controllers/taskController')
const requireAuth = require('../middleware/requireAuth')
const router = express.Router()

router.use(requireAuth)

router.get('/', getTasks)
router.get('/completed', getCompletedTasks)
router.get('/active', getActiveTasks)
router.post('/', createTask)
router.delete('/:id', deleteTask)
router.patch('/:id', updateTask)

module.exports = router