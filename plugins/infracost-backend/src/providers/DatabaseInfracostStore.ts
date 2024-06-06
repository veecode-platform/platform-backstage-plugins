import { Knex } from "knex";
import { LoggerService, resolvePackagePath } from "@backstage/backend-plugin-api";
import { InfracosteStore } from "./InfracostStore";
import { PluginDatabaseManager } from "@backstage/backend-common";

const migrationsDir = resolvePackagePath(
  '@veecode-platform/backstage-plugin-infracost-backend',
  'migrations'
)

/**
 * @public
 */

export class DatabaseInfracostStore /* implements InfracosteStore*/ {
  static async create(options:{
    database: PluginDatabaseManager
  }):Promise<DatabaseInfracostStore>{
    const { database } = options;
    const client = await database.getClient();

    if(!database.migrations?.skip){
      await client.migrate.latest({
        directory: migrationsDir
      })
    }
    return new DatabaseInfracostStore(client)
  }
  private constructor(private readonly db: Knex) {}

  // to do
}