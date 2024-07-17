const db = require('../../data/dbConfig')

async function getAllTasks() {
    const tasks = await db('tasks as t')
        .join('projects as p', 't.project_id', 'p.project_id')
        .select(
            't.task_id',
            't.task_description',
            't.task_notes',
            't.task_completed',
            'p.project_name',
            'p.project_description'
        )
    return tasks.map(task => ({
        ...task,
        task_completed: task.task_completed === 1
    }))
} 

async function addTask(task) {
    const [task_id] = await db('tasks').insert(task)
    return getTaskById(task_id)
}

async function getTaskById(task_id) {
    const task = await db('tasks')
        .where({ task_id })
        .first()
    return {
        ...task,
        task_completed: task.task_completed === 1
    }
}

module.exports = {
    getAllTasks,
    addTask,
    getTaskById
}