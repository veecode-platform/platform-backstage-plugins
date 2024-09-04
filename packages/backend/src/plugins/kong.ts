import { PluginEnvironment } from '../types';
import { Router } from 'express';
import {createRouter} from '@veecode-platform/plugin-kong-service-manager-backend';

export default async function createPlugin({
  logger,
  discovery,
  config
}: PluginEnvironment): Promise<Router> {

  return await createRouter({
    logger,
    discovery,
    config
  });
}