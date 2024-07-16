
exports.up = async function(knex) {
  await knex.schema
    .createTable('resources', table => {
        table.increments('resource_id')
        table.string('resource_name').notNullable().unique()
        table.text('resource_description')
    })
};


exports.down = async function(knex) {
  await knex.schema.dropTableIfExists('resources')
};
