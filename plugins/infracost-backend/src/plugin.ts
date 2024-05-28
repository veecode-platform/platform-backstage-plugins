import {
  coreServices,
  createBackendPlugin,
} from '@backstage/backend-plugin-api';
import { createRouter } from './service/router';

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
        httpRouter: coreServices.httpRouter,
        logger: coreServices.logger,
      },
      async init({
        httpRouter,
        logger,
      }) {
        httpRouter.use(
          await createRouter({
            logger,
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
