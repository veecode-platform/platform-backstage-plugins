import {
  coreServices,
  createBackendPlugin,
} from '@backstage/backend-plugin-api';
import { createRouter } from './services/router';
/**
 * vee backend plugin
 *
 * @public
 */
export const veePlugin = createBackendPlugin({
  pluginId: 'vee',
  register(env) {
    env.registerInit({
      deps: {
        logger: coreServices.logger,
        auth: coreServices.auth,
        httpAuth: coreServices.httpAuth,
        httpRouter: coreServices.httpRouter,
        permissions: coreServices.permissions,
        discovery: coreServices.discovery,
        config: coreServices.rootConfig,
      },
      async init({
        logger,
        auth,
        httpAuth,
        httpRouter,
        permissions,
        discovery,
        config,
      }) {
        if(config.has('vee'))
          {
            httpRouter.use(
            await createRouter({
              logger,
              auth,
              httpAuth,
              httpRouter,
              discovery,
              permissions,
              config
            }),
            );
            httpRouter.addAuthPolicy({
              path: '/health',
              allow: 'unauthenticated',
            });
          }else{
            logger.warn(
              'Failed to initialize Ai Chat backend: valid openai config is missing',
            );
          }
        },
      });
  },
});