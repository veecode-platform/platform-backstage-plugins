/* eslint-disable @backstage/no-undeclared-imports */
import { coreServices,createBackendPlugin } from '@backstage/backend-plugin-api';
import { createRouter } from './service/router';
import { catalogServiceRef } from '@backstage/plugin-catalog-node/alpha';

/**
 * infracostPlugin backend plugin
 *
 * @public
 */
export const infracostPlugin = createBackendPlugin({
  pluginId: 'infracost',
  register(env) {
    env.registerInit({
      deps: {
        logger: coreServices.logger,
        config: coreServices.rootConfig,
        reader: coreServices.urlReader,
        permissions: coreServices.permissions,
        database: coreServices.database,
        auth: coreServices.auth,
        discovery: coreServices.discovery,
        httpRouter: coreServices.httpRouter,   
        httpAuth: coreServices.httpAuth,           // identity user
        // userInfo: coresServices.userInfo,        // identity user
        catalogClient: catalogServiceRef,
      },
      async init({
        logger,
        config,
        reader,
        database,
        auth,
        discovery,
        httpRouter,
        httpAuth,
        catalogClient,
        permissions,
      }) {
       // const model = new InfracostDatabaseModel(database);   # TO DO
        const router = await createRouter({
          logger,
          config,
          // model,
          database,
          catalogClient,
          reader,
          auth,
          httpAuth,
          // userInfo,    <<-----   identity user
          discovery,
          permissions,
        })
        httpRouter.use(router);
      },
    });
  },
});
