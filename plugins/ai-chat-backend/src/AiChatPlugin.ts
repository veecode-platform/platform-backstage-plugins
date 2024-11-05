import {
    createBackendPlugin,
    coreServices,
  } from '@backstage/backend-plugin-api';
import { createRouter } from './service/router';
  
  export const aiChatPlugin = createBackendPlugin({
    pluginId: 'aichat',
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
          discovery,
          config,
          auth,
          httpAuth
        }) {
          if(config.has('openai'))
            {
              httpRouter.use(
              await createRouter({
                logger,
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
            }else{
              logger.warn(
                'Failed to initialize Ai Chat backend: valid openai config is missing',
              );
            }
          },
        });
    },
  });