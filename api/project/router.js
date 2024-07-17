const express = require('express');
const Projects = require('./model');
const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const projects = await Projects.getAllProjects();
    res.json(projects);
  } catch (err) {
    next(err);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const { project_name, project_description, project_completed } = req.body;

    if (!project_name) {
      return res.status(400).json({
        message: 'project_name is required'
      });
    }

    const newProject = await Projects.addProject({
      project_name,
      project_description,
      project_completed: project_completed ? 1 : 0
    });

    
    res.status(201).json({
      project_name: newProject.project_name,
      project_description: newProject.project_description,
      project_completed: !!newProject.project_completed 
    });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
