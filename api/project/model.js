const db = require('../../data/dbConfig')

function getAllProjects() {
    return db('projects').then(projects =>
        projects.map(project => ({
            ...project,
            project_completed: project.project_completed === 1
        }))
    )
}

async function addProject(project) {
    const [project_id] = await db('projects').insert(project)
    return getProjectById(project_id)
}

function getProjectById(project_id) {
    return db('projects')
        .where({ project_id })
        .first()
        .then(project => ({
            ...project,
            project_completed: project.project_completed === 1
        }))
}

module.exports = {
    getAllProjects,
    addProject,
    getProjectById
}
