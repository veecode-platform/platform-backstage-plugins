/* eslint-disable @backstage/no-undeclared-imports */
import { PluginDatabaseManager } from '@backstage/backend-common';
import { resolvePackagePath } from '@backstage/backend-plugin-api';
import { NotFoundError } from '@backstage/errors';
import { JsonValue } from '@backstage/types';
import { Knex } from 'knex';
// import types

const migrationsDir = resolvePackagePath('nome-do-plugin','migrations'); // to do


// TO DO