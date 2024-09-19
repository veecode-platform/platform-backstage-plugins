import { createBackend } from '@backstage/backend-defaults';

const backend = createBackend();


backend.add(import('@backstage/plugin-app-backend/alpha'));


backend.add(import('@backstage/plugin-catalog-backend/alpha'));
backend.add(import('@backstage/plugin-catalog-backend-module-scaffolder-entity-model'));
backend.add(import('@backstage/plugin-catalog-backend-module-github/alpha'));

backend.add(import('@janus-idp/backstage-plugin-keycloak-backend/alpha'));

backend.add(import('@backstage/plugin-auth-backend'));
backend.add(import('@backstage/plugin-auth-backend-module-oidc-provider'))


backend.add(import('@backstage/plugin-scaffolder-backend/alpha'));

backend.add(import('@backstage/plugin-kubernetes-backend/alpha'));

backend.add(import('@backstage/plugin-proxy-backend/alpha'));

backend.add(import('@backstage/plugin-permission-backend/alpha'));
backend.add(
  import('@backstage/plugin-permission-backend-module-allow-all-policy'),
);

backend.add(import('@backstage/plugin-techdocs-backend/alpha'));

backend.start();

