import { coreServices, createBackendPlugin } from "@backstage/backend-plugin-api";
import { createRouter } from "./service/router";
import { DatabaseInfracostStore } from "./database";


/**
 *  Infracost Plugin
 *  @alpha
 */


export const infracostPlugin = createBackendPlugin({
  pluginId: 'infracost',
  register(env) {
    env.registerInit({
      deps: {
        httpRouter: coreServices.httpRouter,
        logger: coreServices.logger,
        database: coreServices.database,
        config: coreServices.rootConfig,
        auth: coreServices.auth,
        httpAuth: coreServices.httpAuth
      },
      async init({ httpRouter, logger, database, config, auth, httpAuth }) {
        const db = await DatabaseInfracostStore.create({
          database: database,
          logger
        });
        httpRouter.use(
          await createRouter({
            logger,
            database: db,
            config,
            auth,
            httpAuth
          }),
        );
      },
    });
  },
});