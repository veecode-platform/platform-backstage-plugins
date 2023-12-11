import {
    githubAuthApiRef, gitlabAuthApiRef
  } from '@backstage/core-plugin-api';

  
  export const providers = [
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
      apiRef: gitlabAuthApiRef,
      enableExperimentalRedirectFlow: true
    }
  ];
  