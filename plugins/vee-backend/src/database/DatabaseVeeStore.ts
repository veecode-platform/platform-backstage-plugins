import { DatabaseService, LoggerService, resolvePackagePath } from "@backstage/backend-plugin-api";
import { Knex } from "knex";

const migrationsDir = resolvePackagePath(
    '@veecode-platform/backstage-plugin-vee-backend',
    'migrations'
);

export class DatabaseVeeStore {

protected constructor(    
  protected readonly db: Knex,
  protected readonly logger: LoggerService
){}

 static async create(options:{
    database: DatabaseService,
    skipMigrations?: boolean,
    logger: LoggerService
  }): Promise<DatabaseVeeStore> {
    const {database, skipMigrations,  logger} = options;
    const client = await database.getClient();
    
    if (!database.migrations?.skip && !skipMigrations ) {
      await client.migrate.latest({
        directory: migrationsDir
      })
     }
    return new DatabaseVeeStore(client,logger)
  }



}