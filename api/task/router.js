const express = require('express');
const Tasks = require('./model');
const router = express.Router();

router.get('/', async (req, res, next) => {
    try {
        const tasks = await Tasks.getAllTasks();
        res.json(tasks);
    } catch (err) {
        next(err);
    }
});

router.post('/', async (req, res, next) => {
    try {
        const task = req.body;
        if (task.task_completed === undefined) {
            task.task_completed = false;
        }
        const newTask = await Tasks.addTask({
            ...task,
            task_completed: task.task_completed ? 1 : 0
        });
        res.status(201).json(newTask);
    } catch (err) {
        next(err);
    }
});

module.exports = router