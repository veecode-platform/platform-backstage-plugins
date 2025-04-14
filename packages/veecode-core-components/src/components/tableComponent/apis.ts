import {
  ScmIntegrationsApi,
  scmIntegrationsApiRef,
  ScmAuth,
} from '@backstage/integration-react';
import {
  AnyApiFactory,
  ApiRef,
  BackstageIdentityApi,
  configApiRef,
  createApiFactory,
  createApiRef,
  discoveryApiRef,
  fetchApiRef,
  identityApiRef,
  oauthRequestApiRef,
  OpenIdConnectApi,
  ProfileInfoApi,
  SessionApi,
} from '@backstage/core-plugin-api';
import { scaffolderApiRef } from '@backstage/plugin-scaffolder-react';
import { ScaffolderClient } from '@backstage/plugin-scaffolder';
import { OAuth2 } from '@backstage/core-app-api';
import { errorApiRef } from '@backstage/core-plugin-api';
import { ErrorApiForwarder } from '@backstage/core-app-api';

export const oidcAuthApiRef: ApiRef<
  OpenIdConnectApi & ProfileInfoApi & BackstageIdentityApi & SessionApi
> = createApiRef({
  id: 'auth.oidc-provider',
});

const translationApiRef = createApiRef<any>({
  id: 'core.translation',
});

const mockTranslationApi = {
  getLocale: () => 'en',
  getTranslations: () => Promise.resolve({}),
  translate: (key: string) => key,
};

export const apis: AnyApiFactory[] = [
  createApiFactory({
    api: scmIntegrationsApiRef,
    deps: { configApi: configApiRef },
    factory: ({ configApi }) => ScmIntegrationsApi.fromConfig(configApi),
  }),
  createApiFactory({
    api: translationApiRef,
    deps: {},
    factory: () => mockTranslationApi,
  }),
  createApiFactory({
    api: errorApiRef,
    deps: {},
    factory: () => new ErrorApiForwarder(),
  }),
  
  ScmAuth.createDefaultApiFactory(),
  createApiFactory({
    api: oidcAuthApiRef,
      deps: {
        discoveryApi: discoveryApiRef,
        oauthRequestApi: oauthRequestApiRef,
        configApi: configApiRef,
      },
      factory: ({ discoveryApi, oauthRequestApi, configApi }) =>
        OAuth2.create({
          discoveryApi,
          oauthRequestApi,
          configApi,
          provider: {
            id: 'oidc',
            title: 'Default keycloak authentication provider',
            icon: () => null,
          },
          environment: configApi.getOptionalString('auth.environment'),
          defaultScopes: [
            'openid',
            'profile',
            'email',
          ],
        }),
    }),
  createApiFactory({
    api: scaffolderApiRef,
    deps: {
      discoveryApi: discoveryApiRef,
      identityApi: identityApiRef,
      scmIntegrationsApi: scmIntegrationsApiRef,
      fetchApi: fetchApiRef,
    },
    factory: ({ scmIntegrationsApi, discoveryApi, identityApi, fetchApi }) =>
      new ScaffolderClient({
        discoveryApi,
        identityApi,
        scmIntegrationsApi,
        fetchApi,
        useLongPollingLogs: true,
      }),
  })
];
