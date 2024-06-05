import { resolvePackagePath } from '@backstage/backend-plugin-api';
import { Knex } from 'knex'


export async function applyDatabaseMigrations(knex:Knex):Promise<void>{
    const migrationsDir = resolvePackagePath(
        '@backstage/plugin-catalog-backend',
        'migrations',
    );
    await knex.migrate.latest({
        directory: migrationsDir
    })
}