/* eslint-disable @backstage/no-undeclared-imports */
import { PluginDatabaseManager, UrlReader, errorHandler } from '@backstage/backend-common';
import { AuthService, DiscoveryService, HttpAuthService, LoggerService, PermissionsService } from '@backstage/backend-plugin-api';
import { Config } from '@backstage/config';
import express from 'express';
import Router from 'express-promise-router';
import { CatalogApi } from '@backstage/catalog-client';
import { IdentityApi } from '@backstage/plugin-auth-node';

export interface RouterOptions {
  logger: LoggerService;
  config: Config;
  reader: UrlReader;
  database: PluginDatabaseManager;
  catalogClient: CatalogApi;
  permissions?: PermissionsService;
  auth?: AuthService;
  httpAuth?: HttpAuthService;
  identity?: IdentityApi;
  discovery?: DiscoveryService;
}

export async function createRouter(
  options: RouterOptions,
): Promise<express.Router> {
  const { logger } = options;

  const router = Router();
  router.use(express.json());

  router.get('/health', (_, response) => {
    logger.info('PONG!');
    response.json({ status: 'ok' });
  });

  router.use(errorHandler());
  return router;
}


/* Idendity user
export interface RouterOptions {
  logger: LoggerService;
  userInfo: UserInfoService;
  httpAuth: HttpAuthService;
}

export async function createRouter(
  options: RouterOptions,
): Promise<express.Router> {
  const { userInfo, httpAuth } = options;

  router.post('/me', async (req, res) => {
    const credentials = await httpAuth.credentials(req, {
      // This rejects request from non-users. Only use this if your plugin needs to access the
      // user identity, most of the time it's enough to just call `httpAuth.credentials(req)`
      allow: ['user'],
    });

    const userInfo = await userInfo.getUserInfo(credentials);

    res.json({
      // The catalog entity ref of the user.
      userEntityRef: userInfo.userEntityRef,

      // The list of entities that this user or any teams this user is a part of owns.
      ownershipEntityRefs: userInfo.ownershipEntityRefs,
    });
  });

  // ...
} 
*/