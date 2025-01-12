const express = require("express");
const router = express.Router();
const projectController = require("../controllers/projectController");
const authMiddleware = require('../middleware/auth');

router.post("/project", authMiddleware, projectController.createProject);

router.post("/projects/:id",authMiddleware, projectController.assignProject);

router.get("/projects",authMiddleware, projectController.getAllProjects);

// Get a single project by ID
router.get("/project/:id",authMiddleware, projectController.getProjectById);

// Update a project
router.put("/projects/:id",authMiddleware, projectController.updateProject);

// Soft delete a project
router.delete("/projects/:id",authMiddleware, projectController.deleteProject);

module.exports = router;
