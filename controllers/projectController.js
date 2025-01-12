const { Project,User } = require("../models");
;

module.exports = {
  async createProject(req, res) {
    console.log(req.user);
    
    try {
      const {
        projectName,
        descriptions,
      } = req.body;
  
      if (!req.user) {
        return res.status(400).json({ message: "User not authenticated" });
      }
  
      const project = await Project.create({
        projectName,
        descriptions,
        ownerId: req.user.id, // Ensure req.User.id is available
      });

      return res.status(201).json({
        message: "Project created successfully",
        project,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Server error", error });
    }
  },

  // Read all projects
  async getAllProjects(req, res) {
    try {
      const projects = await Project.findAll();

      return res.status(200).json({ projects });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Server error", error });
    }
  },

  // Read a single project by ID
  async getProjectById(req, res) {
    try {
      const { id } = req.params;

      const project = await Project.findByPk(id);

      if (!project ) {
        return res.status(404).json({ message: "Project not found" });
      }

      return res.status(200).json({ project });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Server error", error });
    }
  },

  // Update a project
  async updateProject(req, res) {
    try {
      const { id } = req.params;
      const {
        projectName,
        // projectOwner,
        // assignedMembers,
        descriptions,
        status,
      } = req.body;

      const [updatedRows] = await Project.update(
        { projectName, descriptions },
        { where: { id } }
      );

      if (updatedRows === 0) {
        return res.status(404).json({ message: "Project not found" });
      }

      const updatedProject = await Project.findByPk(id);

      return res.status(200).json({
        message: "Project updated successfully",
        project: updatedProject,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Server error", error });
    }
  },

  // Soft delete a project (update status to 'deleted')
  async deleteProject(req, res) {
    try {
      const { id } = req.params;

      const [updatedRows] = await Project.update(
        { status: "deleted" },
        { where: { id } }
      );

      if (updatedRows === 0) {
        return res.status(404).json({ message: "Project not found" });
      }

      return res.status(200).json({ message: "Project deleted successfully" });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Server error", error });
    }
  },

  async assignProject(req, res) {
    try {
      const { userId, projectId } = req.body;
  
      const project = await Project.findByPk(projectId);
  
      if (!project) {
        return res.status(404).json({ message: "Project not found" });
      }
  
      // Ensure assignedMembers is an array, even if it's null or undefined
      let assignedMembers = Array.isArray(project.assignedMembers) ? project.assignedMembers : [userId];
  
      // Check if userId is already assigned
      if (assignedMembers.includes(userId)) {
        return res
          .status(400)
          .json({ message: "User is already assigned to this project" });
      }
  
      // Add the new userId to the assignedMembers array
      assignedMembers.push(userId);
  
      // Update the project with the new assignedMembers array
      await project.update({ assignedMembers });
  
      return res.status(200).json({
        message: "User assigned to project successfully",
        assignedMembers, // Return the updated assigned members list
        project,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Server error", error });
    }
  }
  

  
 };
