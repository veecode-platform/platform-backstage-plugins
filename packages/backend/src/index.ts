import { createBackend } from '@backstage/backend-defaults';
import { catalogModuleVeeCodeProcessor } from '@veecode-platform/plugin-veecode-platform-module/alpha';
import {catalogModuleInfracostProcessor, infracostPlugin} from '@veecode-platform/backstage-plugin-infracost-backend/alpha';
import { customGithubAuthProvider } from './modules/auth/githubCustomResolver';
import { customGitlabAuthProvider } from './modules/auth/gitlabCustomResolver';
// import  kongServiceManagerPlugin  from '@veecode-platform/plugin-kong-service-manager-backend';
import PermissionTest from "./extensions/permissionsPolicyExtension";
import {
    gitlabPlugin,
    catalogPluginGitlabFillerProcessorModule,
} from '@immobiliarelabs/backstage-plugin-gitlab-backend';
import { scaffolderModuleCustomExtensions } from './extensions/scaffolder/ScaffolderExtension';

const backend = createBackend();


backend.add(import('@backstage/plugin-app-backend/alpha'));


backend.add(import('@backstage/plugin-catalog-backend/alpha'));
backend.add(import('@backstage/plugin-catalog-backend-module-scaffolder-entity-model'));
backend.add(import('@backstage/plugin-catalog-backend-module-github/alpha'));
backend.add(catalogModuleVeeCodeProcessor);

backend.add(catalogModuleInfracostProcessor);
backend.add(infracostPlugin);

backend.add(import('@backstage-community/plugin-catalog-backend-module-keycloak'));

backend.add(import('@backstage/plugin-auth-backend'));
backend.add(import('@backstage/plugin-auth-backend-module-oidc-provider'))
// backend.add(import('@backstage/plugin-auth-backend-module-github-provider')); 
// backend.add(import('@backstage/plugin-auth-backend-module-gitlab-provider'));
backend.add(customGithubAuthProvider)
backend.add(customGitlabAuthProvider)

backend.add(import('@veecode-platform/plugin-kong-service-manager-backend'));
// backend.add(kongServiceManagerPlugin);


backend.add(import('@backstage/plugin-scaffolder-backend/alpha'));

backend.add(import('@backstage/plugin-kubernetes-backend/alpha'));

backend.add(import('@backstage/plugin-proxy-backend/alpha'));

backend.add(import('@backstage/plugin-permission-backend/alpha'));
// backend.add(
//   import('@backstage/plugin-permission-backend-module-allow-all-policy'),
// );

backend.add(scaffolderModuleCustomExtensions);


backend.add(PermissionTest)

// gitlab immobiliareLabs
backend.add(gitlabPlugin);
backend.add(catalogPluginGitlabFillerProcessorModule);



backend.add(import('@backstage/plugin-techdocs-backend/alpha'));

backend.add(import('@veecode-platform/backstage-plugin-veecode-assistant-ai-backend'));

backend.start();

