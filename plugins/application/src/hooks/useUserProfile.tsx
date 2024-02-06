import { identityApiRef, useApi } from '@backstage/core-plugin-api';

export function useUserProfile() {

  const user = useApi(identityApiRef);
  const email = JSON.parse(JSON.stringify(user)).target.config.identityApi.profile.email;
  const name = JSON.parse(JSON.stringify(user)).target.config.identityApi.profile.displayName;
  const role = JSON.parse(JSON.stringify(user)).target.config.identityApi.identity.userEntityRef.split(":")[0];
  const token = user.getCredentials().then(res=> {return res});
  const authApi = JSON.parse(JSON.stringify(user)).target.config.identityApi.authApi;

  return {
    email,
    name,
    role,
    token,
    authApi
  }
}
