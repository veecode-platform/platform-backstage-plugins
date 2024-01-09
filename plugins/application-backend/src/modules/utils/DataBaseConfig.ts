import { PluginDatabaseManager } from "@backstage/backend-common";

import { PlatformConfig } from "./PlatformConfig";
import knexFactory from 'knex';

export class DataBaseConfig {

  private static _instance: DataBaseConfig
  public pluginDatabaseManager: PluginDatabaseManager;
  public constructor() {
    this.pluginDatabaseManager = {
      getClient: async () => {
        const knex = knexFactory({
          client: 'pg',
          connection: {
            user: (await PlatformConfig.Instance.getConfig()).getString('backend.database.connection.user'),
            database: (await PlatformConfig.Instance.getConfig()).getString('backend.database.connection.database'),
            password: (await PlatformConfig.Instance.getConfig()).getString('backend.database.connection.password'),
            port: (await PlatformConfig.Instance.getConfig()).getNumber('backend.database.connection.port'),
            host: (await PlatformConfig.Instance.getConfig()).getString('backend.database.connection.host'),
          },
        })
        knex.client.pool.on('createSuccess', (_eventId: any, resource: any) => {
          resource.run('PRAGMA foreign_keys = ON', () => { });
        });
        return knex;
      }
    }
  }


  public async getClient() {
    return this.pluginDatabaseManager.getClient()
  }


  public static get Instance() {
    return this._instance || (this._instance = new this());
  }




}


