import { createBackendModule } from '@backstage/backend-plugin-api';
import { stringifyEntityRef, DEFAULT_NAMESPACE } from '@backstage/catalog-model';
import { gitlabAuthenticator } from '@backstage/plugin-auth-backend-module-gitlab-provider';
import {
  authProvidersExtensionPoint,
  createOAuthProviderFactory,
} from '@backstage/plugin-auth-node';

export const customGitlabAuthProvider = createBackendModule({
  pluginId: 'auth',
  moduleId: 'custom-gitlab-auth-provider',
  register(reg) {
    reg.registerInit({
      deps: { providers: authProvidersExtensionPoint },
      async init({ providers }) {
        providers.registerProvider({
          providerId: 'gitlab',
          factory: createOAuthProviderFactory({
            authenticator: gitlabAuthenticator,
            async signInResolver(info, ctx) {
                const { 
                    result: {
                        fullProfile: {
                            username,
                            displayName
                        }
                    }
                 } = info;

                const userEntity = stringifyEntityRef({
                    kind: 'User',
                    name: username || displayName,
                    namespace: DEFAULT_NAMESPACE,
                  });
              
                return ctx.issueToken({
                    claims: {
                      sub: userEntity,
                      ent: [userEntity, `group:default/admin`],
                    },
                  });
            },
          }),
        });
      },
    });
  },
});