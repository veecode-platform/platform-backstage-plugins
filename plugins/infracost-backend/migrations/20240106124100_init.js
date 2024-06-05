exports.up = async function up(knex) {
    await knex.schema.createTable('infracost_projects_estimate', table => {
     table
     .comment('Registered infracost projects estimate from catalog');
     table
     .uuid('id')
     .primary()
     .notNullable()
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
     .decimal('total_hourly_cost',20,16)
     .notNullable()
     .comment('The total hourly cost');
     table
     .decimal('total_monthly_cost',20,16)
     .notNullable()
     .comment('The total monthly cost') ; 
     table
     .decimal('total_monthly_usage_cost',20,16)
     .notNullable()
     .comment('The total monthly usage cost');
     table
     .decimal('past_total_hourly_cost',20,16)
     .notNullable()
     .comment('The past total hourly cost'); 
     table
     .decimal('past_total_monthly_cost',20,16)
     .notNullable()
     .comment('The past total monthly cost'); 
     table
     .decimal('past_total_monthly_usage_cost',20,16)
     .notNullable()
     .comment('The total monthly usage cost'); 
     table
     .decimal('diff_total_hourly_cost',20,16)
     .notNullable()
     .comment('The diff total hourly cost'); 
     table
     .decimal('diff_total_monthly_cost',20,16)
     .notNullable()
     .comment('The diff total monthly cost');
     table
     .decimal('diff_total_monthly_usage_cost',20,16)
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
    });
  };
  
  /**
   * @param {import('knex').Knex} knex
   */
  exports.down = async function down(knex) {
    await knex.schema.dropTable('infracost_projects_estimate');
  };