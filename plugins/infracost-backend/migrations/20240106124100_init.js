exports.up = async function up(knex) {
    await knex.schema.createTable('infracost', table => {
      table.comment('The table of infracost details');
  
    //   table
    //     .string('user_entity_ref')
    //     .notNullable()
    //     .comment('The entityRef of the user');
    //   table.string('bucket').notNullable().comment('Name of the bucket');
    //   table.string('key').notNullable().comment('Key of a bucket value');
    //   table.text('value').notNullable().comment('The value');
  
    //   table.primary(['user_entity_ref', 'bucket', 'key']);
    });
  };
  
  /**
   * @param {import('knex').Knex} knex
   */
  exports.down = async function down(knex) {
    await knex.schema.dropTable('infracost');
  };