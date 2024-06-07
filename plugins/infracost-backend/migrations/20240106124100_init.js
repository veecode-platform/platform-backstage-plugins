exports.up = async function up(knex) {
    await knex.schema
    /**
     * all infracost_projects_estimate
    */ 
    .createTable('infracost_projects_estimate', table => {
     table
     .comment('Registered infracost projects estimate from catalog');
     table
     .uuid('id')
     .defaultTo(knex.fn.uuid())
     .primary()
     .notNullable()
     .unique()
     .comment('Auto-generated ID of the Infracost estimate component');
     table
     .string('name',255)
     .notNullable()
     .comment('Name of Infracost estimate component');
     table
     .string('currency',50)
     .notNullable()
     .comment('The currency used in the estimate');
     table
     .jsonb('projects')
     .comment('The projects that belong to the estimate');
     table
     .string('total_hourly_cost',50)
     .notNullable()
     .comment('The total hourly cost');
     table
     .string('total_monthly_cost',50)
     .notNullable()
     .comment('The total monthly cost') ; 
     table
     .string('total_monthly_usage_cost',50)
     .notNullable()
     .comment('The total monthly usage cost');
     table
     .string('past_total_hourly_cost',50)
     .notNullable()
     .comment('The past total hourly cost'); 
     table
     .string('past_total_monthly_cost',50)
     .notNullable()
     .comment('The past total monthly cost'); 
     table
     .string('past_total_monthly_usage_cost',50)
     .notNullable()
     .comment('The total monthly usage cost'); 
     table
     .string('diff_total_hourly_cost',50)
     .notNullable()
     .comment('The diff total hourly cost'); 
     table
     .string('diff_total_monthly_cost',50)
     .notNullable()
     .comment('The diff total monthly cost');
     table
     .string('diff_total_monthly_usage_cost',50)
     .notNullable()
     .comment('The diff total monthly usage cost');  
     table
     .jsonb('sumary')
     .comment('The total summarized costs of all the projects in the estimate');
     table
     .timestamp('time_generated')
     .defaultTo(knex.fn.now())
     .notNullable()
     .comment('Time the estimate was generated');
     table
     .timestamp('created_at')
     .defaultTo(knex.fn.now())
     .notNullable()
     .comment('Time the estimate was create');
     table
     .timestamp('updated_at')
     .defaultTo(knex.fn.now())
     .notNullable()
     .comment('Time the estimate was updated');
     table.unique(['name'])
    });
  };
  
  /**
   * @param {import('knex').Knex} knex
   */
  exports.down = async function down(knex) {
    try {
      await knex.schema.dropTable('infracost_projects_estimate');
    }catch(e){
      console.error('Error Migrate: DOWN',e)
    } finally {
      knex.destroy();
    }
    return true;
  };