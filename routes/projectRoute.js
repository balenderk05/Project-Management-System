const express = require("express");
const router = express.Router();
const projectController = require("../controllers/projectController");

router.post("/projects", projectController.createProject);

router.post("/projects/assign", projectController.assignProject);

router.get("/projects", projectController.getAllProjects);

// Get a single project by ID
router.get("/projects/:id", projectController.getProjectById);

// Update a project
router.put("/projects/:id", projectController.updateProject);

// Soft delete a project
router.delete("/projects/:id", projectController.deleteProject);

module.exports = router;
