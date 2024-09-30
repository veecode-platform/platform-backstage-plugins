
import {
  githubAuthApiRef,
  gitlabAuthApiRef,
} from '@backstage/core-plugin-api';
import { oidcAuthApiRef } from './apis';

export const providers = [
  {
    id: "keycloak",
    title: "Keycloak",
    message: "Sign in using Keycloak",
    apiRef: oidcAuthApiRef,
  },
  {
    id: 'github-auth-provider',
    title: 'GitHub',
    message: 'Sign in using GitHub',
    apiRef: githubAuthApiRef,
  },
  {
    id: 'gitlab-auth-provider',
    title: 'Gitlab',
    message: 'Sign in using Gitlab',
    apiRef: gitlabAuthApiRef
  }
];