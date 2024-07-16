const express = require('express')
const Resources = require('./model')
const router = express.Router()

router.get('/', async (req, res, next) => {
    try {
        const resources = await Resources.getAllResouces()
        res.json(resources)
    } catch (err) {
        next(err)
    }
})

router.post('/', async (req, res, next) => { 
    try {
        const resource = req.body;
        const newResource = await Resources.addResource(resource);
        res.status(201).json(newResource);
    } catch (err) {
        next(err);
    }
})

router.use((err, req, res, next) => { // eslint-disable-line
    res.status(500).json({
        customMessage: 'something went wrong inside the rcipes router',
        message: err.message,
        stack:err.stack
    })
})

module.exports = router