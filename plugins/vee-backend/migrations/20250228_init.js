exports.up = async function up(knex) {
    try{
        await knex.schema
        /**
         * Fixed options table
         */
        .createTable('fixed_options', table => {
            table.comment('Register the fixed options of the code analyzer');
            table.uuid('id').defaultTo(knex.fn.uuid()).primary().notNullable().comment('Auto-generated Id of the fixed_options item');
            table.string('type', 255).notNullable().unique().comment('Type of the entity that the fixed option will be part of');
            table.timestamps(true, true);
        })
        /**
         * Option table
         */
        .createTable('options', table => {
            table.comment('Register options for the fixed options table');
            table.uuid('id').defaultTo(knex.fn.uuid()).primary().notNullable().comment('Auto-generated Id of the option item');
            table.uuid('fixed_option_id').notNullable();
            table.foreign('fixed_option_id').references('id').inTable('fixed_options').onDelete('CASCADE');
            table.string('label',255).notNullable().unique().comment('Label of each option');
            table.string('prompt',255).notNullable().comment('Prompt for each option');
            table.timestamps(true, true);
        })
        /**
            * Stack table
        */
        .createTable('stacks', table => {
            table.comment('Register stacks for use in template generation');
            table.uuid('id').defaultTo(knex.fn.uuid()).primary().notNullable().comment('Auto-generated Id of the stack item');
            table.string('name',255).notNullable().unique().comment('Name of the stack');
            table.string('source',255).notNullable().comment('Support source for template generation');
            table.string('icon',255).comment('Icon for the stack');
            table.timestamps(true, true);
        })
        /**
         *  plugins table
         */
        .createTable('plugins', table => {
            table.comment('Table of plugins that will serve the stacks');
            table.uuid('id').defaultTo(knex.fn.uuid()).primary().notNullable().comment('Auto-generated Id of plugin');
            table.string('name',255).notNullable().unique().comment('Plugin name');
            table.string('docs',255).notNullable().comment('Docs');
            table.timestamps(true, true);
        })
        /**
         * Annotations plugin Table
         */
        .createTable('annotations',table => {
            table.comment('List of annotations belonging to a plugin');
            table.uuid('id').defaultTo(knex.fn.uuid()).primary().notNullable().comment('Auto-generated Id of annotation');
            table.uuid('plugin_id').notNullable();
            table.foreign('plugin_id').references('id').inTable('plugins').onDelete('CASCADE');
            table.text('annotation').notNullable().comment('Annotation for plugin use');
            table.timestamps(true, true);
        })
        /**
         *  stack_plugins
         */
        .createTable('stack_plugins', table => {
            table.comment('Intermediate table to help assign plugins to each stack');
            table.uuid('stack_id').notNullable();
            table.uuid('plugin_id').notNullable();
            table.foreign('stack_id').references('id').inTable('stacks').onDelete('CASCADE');
            table.foreign('plugin_id').references('id').inTable('plugins').onDelete('CASCADE');
            table.timestamps(true, true);
            table.primary(['stack_id', 'plugin_id']);
        })
        // /**
        //  *  template_catalog manager
        //  */
        // .createTable('template_catalog', table => {
        //     table.comment('Catalog Template manager');
        //     table.uuid('id').defaultTo(knex.fn.uuid()).primary().notNullable().comment('Auto-generated Id of the option item');
        //     table.string('url', 255).notNullable().unique().comment('The URL of the template catalog');
        //     table.string('environment', 255).notNullable().unique().comment('Which environment will be published');
        //     table.timestamps(true, true);
        // })
    }
    catch(err){
        console.log(`ERROR MIGRATE:UP ${err}`);
        return false;
    } 
    finally {
        knex.destroy()
    }
    return true
}

/**
 * @param { import('knex'.Knex)} knex
 */
exports.down = async function down(knex){
    try{
        await knex.schema.dropTable('stack_plugins');
        await knex.schema.dropTable('annotations');
        await knex.schema.dropTable('options');
        await knex.schema.dropTable('plugins');
        await knex.schema.dropTable('stacks');
        await knex.schema.dropTable('fixed_options');
    }catch(err){
        console.error(`ERROR MIGRATE:DOWN ${err}`)
    }
    finally{
        knex.destroy();
    }
    return true
}