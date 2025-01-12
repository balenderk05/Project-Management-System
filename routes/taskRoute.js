const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');
const authMiddleware = require('../middleware/auth')

// Create a new task
router.post('/addTask', authMiddleware, taskController.createTask);

// Get all tasks
router.get('/project', authMiddleware, taskController.getAllTasks);

// Get a task by ID
router.get('/:id', authMiddleware, taskController.getTaskById);

// Update a task by ID
router.put('/:id', authMiddleware, taskController.updateTask);

// Delete a task by ID
router.delete('/:id', authMiddleware, taskController.deleteTask);

module.exports = router;
