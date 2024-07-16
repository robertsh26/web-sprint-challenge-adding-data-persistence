const express = require('express')
const Projects = require('./model')
const router = express.Router()

router.get('/', async (req, res, next) => {
    try {
        const projects = await Projects.getAllProjects()
        res.json(projects)
    } catch (err) {
        next(err)
    }
})

router.post('/', async (req, res, next) => {
    try {
        const project = req.body
        if (project.project_completed === undefined) {
            project.project_completed = false
        }
        const newProject = await Projects.addProject({
            ...project,
            project_completed: project.project_completed ? 1 : 0
        })
        res.status(201).json(newProject)
    } catch (err) {
        next (err)
    }
})

router.use((err, req, res, next) => { // eslint-disable-line
    res.status(500).json({
        customMessage: 'something went wrong inside the projects router',
        message: err.message,
        stack:err.stack
    })
})

module.exports = router