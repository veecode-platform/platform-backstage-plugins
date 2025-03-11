import { DatabaseService, LoggerService, resolvePackagePath } from "@backstage/backend-plugin-api";
import { Knex } from "knex";
import { ANNOTATIONS_TABLE, FIXED_OPTIONS_TABLE, PLUGINS_TABLE, STACK_PLUGINS_TABLE, STACKS_TABLE } from "../utils/constants/tables";
import { IFixedOptions, IPlugin, IStack } from "@veecode-platform/backstage-plugin-vee-common";
import { UpdateFixedOptionsParams, UpdatePluginParams, UpdateStackParams, VeeStore } from "./types";

const migrationsDir = resolvePackagePath(
    '@veecode-platform/backstage-plugin-vee-backend',
    'migrations'
);
export class DatabaseVeeStore implements VeeStore {

  private constructor(
    private readonly db: Knex,
    private readonly logger: LoggerService,
  ) {}

  static async create(options: {
    database: DatabaseService;
    skipMigrations?: boolean;
    logger: LoggerService;
  }): Promise<DatabaseVeeStore> {
    const { database, skipMigrations, logger } = options;
    const client = await database.getClient();

    if (!database.migrations?.skip && !skipMigrations) {
      await client.migrate.latest({
        directory: migrationsDir,
      });
    }

    return new DatabaseVeeStore(client, logger);
  }

  /**
   * fixedOptions
   */

  private async existsType(fixedOptions: IFixedOptions): Promise<boolean> {
    const exists = await this.db.transaction(async trx => {
      const result = await trx(FIXED_OPTIONS_TABLE)
        .where('type', fixedOptions.type)
        .first();
      return result !== undefined;
    });
    return exists;
  }

  async listFixedOptions(): Promise<IFixedOptions[]> {
    try {
      const fixedOptions = await this.db.select('*').from(FIXED_OPTIONS_TABLE);
      return fixedOptions;
    } catch (error: any) {
      this.logger.error(error.message);
      return [];
    }
  }

  async getFixedOptionsById(fixedOptionsId: string) : Promise<IFixedOptions | null> {
    try {
      const fixedOptions = await this.db(FIXED_OPTIONS_TABLE).where(
        'id',
        fixedOptionsId,
      );
      return fixedOptions && fixedOptions.length > 0 ? fixedOptions[0] : null;
    } catch (error: any) {
      this.logger.error(error.message);
      return null;
    }
  }

  async createFixedOptions(fixedOptions: IFixedOptions) {
    try {
      if (await this.existsType(fixedOptions)) {
        return await this.updateFixedOption({fixedOptionsId: fixedOptions.id as string, fixedOptions});
      }
      return await this.db.transaction(async trx => {
        await trx(FIXED_OPTIONS_TABLE)
          .insert({
            type: fixedOptions.type,
            options: JSON.stringify(fixedOptions.options),
          })
          .onConflict(['type'])
          .ignore();

        const [fixedOptionCreated] = await trx(FIXED_OPTIONS_TABLE).where({
          type: fixedOptions.type,
        });

        return (fixedOptionCreated as IFixedOptions) ?? null;
      });
    } catch (error: any) {
      this.logger.error(error.message);
      return null;
    }
  }

  async updateFixedOption({ fixedOptionsId, fixedOptions }: UpdateFixedOptionsParams): Promise<IFixedOptions | null> {
    try {
      const updateData: Partial<Record<keyof IFixedOptions, string>> = {};
  
      if (fixedOptions.type) updateData.type = fixedOptions.type;
      if (fixedOptions.options) updateData.options = JSON.stringify(fixedOptions.options);
      if (Object.keys(updateData).length === 0) return null;
      
      return await this.db.transaction(async trx => {
        const updateFixedOptionRowsCount = await trx(FIXED_OPTIONS_TABLE)
          .where("id", fixedOptionsId)
          .update(updateData);
  
        if (updateFixedOptionRowsCount === 1) {
          const [updatedFixedOption] = await trx(FIXED_OPTIONS_TABLE).where("id", fixedOptionsId);
          return updatedFixedOption as IFixedOptions;
        }
        return null;
      });
    } catch (error: any) {
      this.logger.error(error.message);
      return null;
    }
  }
  

  async deleteFixedOption(fixedOptionsId: string) {
    try {
      const operation = await this.db(FIXED_OPTIONS_TABLE)
        .where('id', fixedOptionsId)
        .delete();
      return !!operation;
    } catch (error: any) {
      this.logger.error(error.message);
      return false;
    }
  }

  /**
   *  Stacks
   */

  private async existsStack(stack: IStack): Promise<boolean> {
    const exists = await this.db.transaction(async trx => {
      const result = await trx(STACKS_TABLE).where('name', stack.name).first();
      return result !== undefined;
    });
    return exists;
  }

  async listStacks(): Promise<IStack[]> {
    try {
      const rows = await this.db(STACKS_TABLE)
        .select(
          `${STACKS_TABLE}.id`,
          `${STACKS_TABLE}.name`,
          `${STACKS_TABLE}.source`,
          `${STACKS_TABLE}.created_at`,
          `${STACKS_TABLE}.updated_at`,
          `${PLUGINS_TABLE}.id as plugin_id`,
          `${PLUGINS_TABLE}.name as plugin_name`,
          `${ANNOTATIONS_TABLE}.id as annotation_id`,
          `${ANNOTATIONS_TABLE}.annotation as annotation_annotation`
        )
        .leftJoin(STACK_PLUGINS_TABLE, `${STACKS_TABLE}.id`, '=', `${STACK_PLUGINS_TABLE}.stack_id`)
        .leftJoin(PLUGINS_TABLE, `${STACK_PLUGINS_TABLE}.plugin_id`, '=', `${PLUGINS_TABLE}.id`)
        .leftJoin(ANNOTATIONS_TABLE, `${PLUGINS_TABLE}.id`, '=', `${ANNOTATIONS_TABLE}.plugin_id`);
  
      const stacksMap = new Map<string, IStack>();
  
      rows.forEach(row => {
        if (!stacksMap.has(row.id)) {
          stacksMap.set(row.id, {
            id: row.id,
            name: row.name,
            source: row.source,
            created_at: row.created_at,
            updated_at: row.updated_at,
            plugins: []
          });
        }
        if (row.plugin_id) {
          const stack = stacksMap.get(row.id);
          if (stack && stack.plugins) {
            let plugin = stack.plugins.find(p => p.id === row.plugin_id);
            if (!plugin) {
              plugin = {
                id: row.plugin_id,
                name: row.plugin_name,
                annotations: []
              };
              stack.plugins.push(plugin);
            }
            if (row.annotation_id) {
              plugin.annotations.push({
                id: row.annotation_id,
                plugin_id: row.plugin_id,
                annotation: row.annotation_annotation
              });
            }
          }
        }
      });
  
      const stacks = Array.from(stacksMap.values());
      return stacks;
    } catch (error: any) {
      this.logger.error(error.message);
      return [];
    }
  }
  
  async getStackById(stackId: string): Promise<IStack | null> {
    try {
      const rows = await this.db(STACKS_TABLE)
        .select(
          `${STACKS_TABLE}.id`,
          `${STACKS_TABLE}.name`,
          `${STACKS_TABLE}.source`,
          `${STACKS_TABLE}.created_at`,
          `${STACKS_TABLE}.updated_at`,
          `${PLUGINS_TABLE}.id as plugin_id`,
          `${PLUGINS_TABLE}.name as plugin_name`,
          `${ANNOTATIONS_TABLE}.id as annotation_id`,
          `${ANNOTATIONS_TABLE}.annotation as annotation_annotation`
        )
        .leftJoin(STACK_PLUGINS_TABLE, `${STACKS_TABLE}.id`, '=', `${STACK_PLUGINS_TABLE}.stack_id`)
        .leftJoin(PLUGINS_TABLE, `${STACK_PLUGINS_TABLE}.plugin_id`, '=', `${PLUGINS_TABLE}.id`)
        .leftJoin(ANNOTATIONS_TABLE, `${PLUGINS_TABLE}.id`, '=', `${ANNOTATIONS_TABLE}.plugin_id`)
        .where(`${STACKS_TABLE}.id`, stackId);
  
      if (rows.length === 0) {
        return null;
      }
  
      const stack: IStack = {
        id: rows[0].id,
        name: rows[0].name,
        source: rows[0].source,
        created_at: rows[0].created_at,
        updated_at: rows[0].updated_at,
        plugins: []
      };
  
      rows.forEach(row => {
        if (row.plugin_id) {
          let plugin = stack.plugins!.find(p => p.id === row.plugin_id);
          if (!plugin) {
            plugin = {
              id: row.plugin_id,
              name: row.plugin_name,
              annotations: []
            };
            stack.plugins!.push(plugin);
          }
          if (row.annotation_id) {
            plugin.annotations.push({
              id: row.annotation_id,
              plugin_id: row.plugin_id,
              annotation: row.annotation_annotation
            });
          }
        }
      });
  
      return stack;
    } catch (error: any) {
      this.logger.error(error.message);
      return null;
    }
  }

  async createStack(stack: IStack): Promise<IStack | null> {
    try {
      if (await this.existsStack(stack)) {
        return await this.updateStack({ stackId: stack.id as string, stack });
      }
      return await this.db.transaction(async trx => {
        await trx(STACKS_TABLE)
          .insert({
            name: stack.name,
            source: stack.source
          })
          .onConflict(['name'])
          .ignore();
  
        const [stackCreated] = await trx(STACKS_TABLE)
          .where({ name: stack.name });
  
        if (!stackCreated) {
          throw new Error('Failed to retrieve the created stack');
        }
  
        if (stack.plugins?.length) {
          const stackPluginsData = stack.plugins.map(plugin => ({
            stack_id: stackCreated.id,
            plugin_id: plugin.id,
          }));
          await trx(STACK_PLUGINS_TABLE).insert(stackPluginsData);
        }
  
        return stackCreated as IStack;
      });
    } catch (error: any) {
      this.logger.error(error.message);
      return null;
    }
  }

  async updateStack({stackId, stack}: UpdateStackParams): Promise<IStack | null> {
    try {
      const updateData: Partial<Record<keyof IStack, string>> = {};
  
      if (stack.name) updateData.name = stack.name;
      if (stack.source) updateData.source = stack.source;
      if (Object.keys(updateData).length === 0) return null;
    
      return await this.db.transaction(async trx => {
        const updateStackRowCount = await trx(STACKS_TABLE)
          .where('id', stackId)
          .update(updateData);

        if (updateStackRowCount === 1) {
          const [updatedStack] = await trx(STACKS_TABLE).where("id", stackId);

          if (stack.plugins?.length) {
            await trx(STACK_PLUGINS_TABLE)
              .where('stack_id', stackId)
              .delete();

            const stackPluginsData = stack.plugins.map(plugin => ({
              stack_id: stackId,
              plugin_id: plugin.id,
            }));
            await trx(STACK_PLUGINS_TABLE).insert(stackPluginsData);
          }

          return updatedStack as IStack;
        }
        return null;
      });
    } catch (error: any) {
      this.logger.error(error.message);
      return null;
    }
  }

  async deleteStack(stackId: string): Promise<boolean> {
    try {
      return await this.db.transaction(async trx => {
        await trx(STACK_PLUGINS_TABLE)
          .where('stack_id', stackId)
          .delete();

        const operation = await trx(STACKS_TABLE)
          .where('id', stackId)
          .delete();

        return !!operation;
      });
    } catch (error: any) {
      this.logger.error(error.message);
      return false;
    }
  }

  /**
   * Plugins
   */
  private async existsPlugin(plugin: IPlugin): Promise<boolean> {
    const exists = await this.db.transaction(async trx => {
      const result = await trx(PLUGINS_TABLE)
        .where('name', plugin.name)
        .first();
      return result !== undefined;
    });
    return exists;
  }


  async listPlugins(): Promise<IPlugin[]> {
    try {
      const rows = await this.db(PLUGINS_TABLE)
        .select(
          `${PLUGINS_TABLE}.id`,
          `${PLUGINS_TABLE}.name`,
          `${PLUGINS_TABLE}.created_at`,
          `${PLUGINS_TABLE}.updated_at`,
          `${ANNOTATIONS_TABLE}.id as annotation_id`,
          `${ANNOTATIONS_TABLE}.plugin_id as annotation_plugin_id`,
          `${ANNOTATIONS_TABLE}.annotation as annotation_annotation`
        )
        .leftJoin(ANNOTATIONS_TABLE, `${PLUGINS_TABLE}.id`, '=', `${ANNOTATIONS_TABLE}.plugin_id`);
  
      const pluginsMap = new Map<string, IPlugin>();
  
      rows.forEach(row => {
        if (!pluginsMap.has(row.id)) {
          pluginsMap.set(row.id, {
            id: row.id,
            name: row.name,
            annotations: [],
            created_at: row.created_at,
            updated_at: row.updated_at,
          });
        }
        if (row.annotation_id) {
          const plugin = pluginsMap.get(row.id);
          plugin?.annotations.push({
            id: row.annotation_id,
            plugin_id: row.annotation_plugin_id,
            annotation: row.annotation_annotation
          });
        }
      });
  
      const plugins = Array.from(pluginsMap.values());
      return plugins;
    } catch (error: any) {
      this.logger.error(error.message);
      this.logger.error('Plugins not loaded');
      return [];
    }
  }

  async getPluginById(pluginId: string): Promise<IPlugin | null> {
    try {
      const pluginRow = await this.db(PLUGINS_TABLE)
        .select(
          `${PLUGINS_TABLE}.id`,
          `${PLUGINS_TABLE}.name`,
          `${PLUGINS_TABLE}.created_at`,
          `${PLUGINS_TABLE}.updated_at`
        )
        .where('id', pluginId)
        .first();
  
      if (!pluginRow) {
        return null;
      }
  
      const annotationRows = await this.db(ANNOTATIONS_TABLE)
        .select(
          `${ANNOTATIONS_TABLE}.id as annotation_id`,
          `${ANNOTATIONS_TABLE}.plugin_id as annotation_plugin_id`,
          `${ANNOTATIONS_TABLE}.annotation as annotation_annotation`
        )
        .where('plugin_id', pluginId);
  
      const plugin: IPlugin = {
        id: pluginRow.id,
        name: pluginRow.name,
        annotations: annotationRows.map(row => ({
          id: row.annotation_id,
          plugin_id: row.annotation_plugin_id,
          annotation: row.annotation_annotation
        })),
        created_at: pluginRow.created_at,
        updated_at: pluginRow.updated_at,
      };
  
      return plugin;
    } catch (error: any) {
      this.logger.error(`Error in getPluginById: ${error.message}`);
      return null;
    }
  }

  async createPlugin(plugin: IPlugin): Promise<IPlugin | null> {
    try {
      if (await this.existsPlugin(plugin)) {
        return await this.updatePlugin({pluginId: plugin.id as string, plugin});
      }
      return await this.db.transaction(async trx => {
        await trx(PLUGINS_TABLE)
          .insert({
            name: plugin.name
          })
          .onConflict(['name'])
          .ignore();

        const [pluginCreated] = await trx(PLUGINS_TABLE).where({
          name: plugin.name,
        });

        if(plugin.annotations?.length){
          const annotationsData = plugin.annotations.map(annotation => ({
            plugin_id: pluginCreated.id,
            annotation: JSON.stringify(annotation)
          }));
          await trx(ANNOTATIONS_TABLE).insert(annotationsData)
        }

        return pluginCreated as IPlugin ?? null;
      });
    } catch (error: any) {
      this.logger.error(error.message);
      return null;
    }
  }

  async updatePlugin({pluginId, plugin}: UpdatePluginParams): Promise<IPlugin | null> {
    try {
      const updateData: Partial<Record<keyof IPlugin, string>> = {};
    
      if (plugin.name) updateData.name = plugin.name;
      if (Object.keys(updateData).length === 0 && !plugin.annotations?.length) return null;
  
      return await this.db.transaction(async trx => {
        if (Object.keys(updateData).length > 0) {
          const updatePluginRowsCount = await trx(PLUGINS_TABLE)
            .where('id', pluginId)
            .update(updateData);
  
          if (updatePluginRowsCount !== 1) {
            return null;
          }
        }
        if (plugin.annotations?.length) {
          await trx(ANNOTATIONS_TABLE)
            .where('plugin_id', pluginId)
            .delete();
  
          const annotationsData = plugin.annotations.map(annotation => ({
            plugin_id: pluginId,
            annotation: JSON.stringify(annotation)
          }));
          await trx(ANNOTATIONS_TABLE).insert(annotationsData);
        }
        const [updatedPlugin] = await trx(PLUGINS_TABLE).where("id", pluginId);
        return updatedPlugin as IPlugin;
      });
    } catch (error: any) {
      this.logger.error(`Error in updatePlugin: ${error.message}`);
      return null;
    }
  }

  async deletePlugin(pluginId: string): Promise<boolean> {
    try {
      return await this.db.transaction(async trx => {
        await trx(ANNOTATIONS_TABLE)
          .where('plugin_id', pluginId)
          .delete();
  
        const operation = await trx(PLUGINS_TABLE)
          .where('id', pluginId)
          .delete();
  
        return !!operation;
      });  
    } catch (error: any) {
      this.logger.error(error.message);
      return false;
    }
  }
}