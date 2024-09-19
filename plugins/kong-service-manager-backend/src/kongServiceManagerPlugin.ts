import {
  coreServices,
  createBackendPlugin,
} from '@backstage/backend-plugin-api';
import { createRouter } from './service/router';

/**
 * kongServiceManagerPlugin backend plugin
 *
 * @public
 */
export const kongServiceManagerPlugin = createBackendPlugin({
  pluginId: 'kong',
  register(env) {
    env.registerInit({
      deps: {
        httpRouter: coreServices.httpRouter,
        logger: coreServices.logger,
        permissions: coreServices.permissions,
        discovery: coreServices.discovery,
        config: coreServices.rootConfig,
        auth: coreServices.auth,
        httpAuth: coreServices.httpAuth
      },
      async init({
        httpRouter,
        logger,
        permissions,
        discovery,
        config,
        auth,
        httpAuth
      }) {
        httpRouter.use(
          await createRouter({
            logger,
            permissions,
            discovery,
            config,
            auth,
            httpAuth
          }),
        );
        httpRouter.addAuthPolicy({
          path: '/health',
          allow: 'unauthenticated',
        });
      },
    });
  },
});
