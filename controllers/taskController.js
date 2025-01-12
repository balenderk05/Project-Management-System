
const { Task, Project} = require('../models');
const project = require('../models/project');


// Create a new task
exports.createTask = async (req, res) => {
    try {
        const { title, description, status,projectId } = req.body;

        if (!title || !description || !status || !projectId) {
            return res.status(400).json({ message: "All fields are required, including projectId" });
        }
        const isExist= Project.findByPk(projectId);
        if (!isExist) {
            return res.status(400).json({ message: "Project not found" });
        }

        const newTask = await Task.create({ title, description, status, projectId});
        res.status(201).json(newTask);
    } catch (error) {
        res.status(500).json({ message: 'Error creating task', error: error.message });
    }
};

// Get all tasks
exports.getAllTasks = async (req, res) => {
    const projectId = req.query.projectId;
    console.log(projectId);
    if (!projectId) {
        res.status(422).json({ 'message': "ProjectId missing!" });
    }
    try {
        const tasks = await Task.findAll({ where: { projectId: projectId } });
        res.status(200).json(tasks);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching tasks', error: error.message });
    }
};

// Get a single task by ID
exports.getTaskById = async (req, res) => {
    const { id } = req.params;
    try {
        const task = await Task.findByPk(id);
        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }
        res.status(200).json(task);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching task', error: error.message });
    }
};

// Update task by ID
exports.updateTask = async (req, res) => {
    const { id } = req.params
    const { title, description, status } = req.body;
    try {
        const task = await Task.findByPk(id);
        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }

        task.title = title || task.title;
        task.description = description || task.description;
        task.status = status || task.status;
        await task.save();
        res.status(200).json(task);
    } catch (error) {
        res.status(500).json({ message: 'Error updating task', error: error.message });
    }
};

// Delete a task by ID
exports.deleteTask = async (req, res) => {
    const { id } = req.params;
    try {
        const task = await Task.findByPk(id);
        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }
        await task.destroy();
        res.status(200).json({message:"Task Deleted Successfully"});
    } catch (error) {
        res.status(500).json({ message: 'Error deleting task', error: error.message });
    }
};
