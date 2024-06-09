
import { PluginEnvironment } from '../types';
import { Router } from 'express';
import {
  DatabaseInfracostStore,
  createRouter,
} from '@veecode-platform/backstage-plugin-infracost-backend';

export default async function createPlugin({
  logger,
  database,
  config,
}: PluginEnvironment): Promise<Router> {
  const db = await DatabaseInfracostStore.create({
    database: database,
    logger
  });
  return await createRouter({
    logger,
    database: db,
    config,
  });
}