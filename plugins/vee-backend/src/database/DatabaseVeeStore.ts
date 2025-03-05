import { DatabaseService, LoggerService, resolvePackagePath } from "@backstage/backend-plugin-api";
import { Knex } from "knex";
import { FIXED_OPTIONS_TABLE, PLUGINS_TABLE, STACKS_TABLE } from "../utils/constants/tables";
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
      const stacks = await this.db.select('*').from(STACKS_TABLE);
      return stacks;
    } catch (error: any) {
      this.logger.error(error.message);
      return [];
    }
  }

  async getStackById(stackId: string): Promise<IStack | null> {
    try {
      const stack = await this.db(STACKS_TABLE).where('id', stackId);
      return stack && stack.length > 0 ? stack[0] : null;
    } catch (error: any) {
      this.logger.error(error.message);
      return null;
    }
  }

  async createStack(stack: IStack): Promise<IStack | null> {
    try {
      if (await this.existsStack(stack)) {
        return await this.updateStack({stackId: stack.id as string, stack});
      }
      return await this.db.transaction(async trx => {
        await trx(STACKS_TABLE)
          .insert({
            name: stack.name,
            source: stack.source,
            icon: stack.icon ?? null,
            plugins: JSON.stringify(stack.plugins),
          })
          .onConflict(['name'])
          .ignore();

        const [stackCreated] = await trx(STACKS_TABLE).where({
          name: stack.name,
        });

        return (stackCreated as IStack) ?? null;
      });
    } catch (error: any) {
      this.logger.error(error.message);
      return null;
    }
  }

  async updateStack({stackId, stack}: UpdateStackParams): Promise<IStack | null> {
    try {
      const updateData: Partial<Record<keyof IStack, string>> = {};
  
      if (stack.icon) updateData.icon = stack.icon;
      if (stack.name) updateData.name = stack.name;
      if (stack.source) updateData.source = stack.source;
      if (stack.plugins) updateData.plugins = JSON.stringify(stack.plugins);
      if (Object.keys(updateData).length === 0) return null;
    
      return await this.db.transaction(async trx => {
        const updateStackRowCount = await trx(STACKS_TABLE)
          .where('id', stackId)
          .update(updateData);

          if (updateStackRowCount === 1) {
            const [updatedStack] = await trx(STACKS_TABLE).where("id", stackId);
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
      const operation = await this.db(STACKS_TABLE)
        .where('id', stackId)
        .delete();
      return !!operation;
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
      const plugins = await this.db.select('*').from(PLUGINS_TABLE);
      return plugins;
    } catch (error: any) {
      this.logger.error(error.message);
      return [];
    }
  }

  async getPluginById(pluginId: string): Promise<IPlugin[] | null> {
    try {
      const plugin = await this.db(PLUGINS_TABLE).where('id', pluginId);
      return plugin && plugin.length > 0 ? plugin[0] : null;
    } catch (error: any) {
      this.logger.error(error.message);
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
            name: plugin.name,
            annotations: JSON.stringify(plugin.annotations),
          })
          .onConflict(['name'])
          .ignore();

        const [pluginCreated] = await trx(PLUGINS_TABLE).where({
          name: plugin.name,
        });

        return (pluginCreated as IPlugin) ?? null;
      });
    } catch (error: any) {
      this.logger.error(error.message);
      return null;
    }
  }

  async updatePlugin({pluginId, plugin}:UpdatePluginParams): Promise<IPlugin | null> {
    try {
      const updateData: Partial<Record<keyof IPlugin, string>> = {};
  
      if (plugin.name) updateData.name = plugin.name;
      if (plugin.annotations) updateData.annotations = JSON.stringify(plugin.annotations)
      if (Object.keys(updateData).length === 0) return null;

      return await this.db.transaction(async trx => {
        const updatePluginRowsCount = await trx(PLUGINS_TABLE)
          .where('id', pluginId)
          .update(updateData);

          if (updatePluginRowsCount === 1) {
            const [updatedPlugin] = await trx(PLUGINS_TABLE).where("id", pluginId);
            return updatedPlugin as IPlugin;
          }
          return null;
      });
    } catch (error: any) {
      this.logger.error(error.message);
      return null;
    }
  }

  async deletePlugin(pluginId: string): Promise<boolean> {
    try {
      const operation = await this.db(PLUGINS_TABLE)
        .where('id', pluginId)
        .delete();

      return !!operation;
    } catch (error: any) {
      this.logger.error(error.message);
      return false;
    }
  }
}