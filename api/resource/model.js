const db = require('../../data/dbConfig')

function getAllResouces() {
    return db('resources')
}

async function addResource(resource) {
    const [resource_id] = await db('resources').insert(resource)
    return getResourceById(resource_id)
}

function getResourceById(resource_id) {
    return db('resources').where({ resource_id }).first()
}

module.exports = {
    getAllResouces,
    addResource,
    getResourceById
}
