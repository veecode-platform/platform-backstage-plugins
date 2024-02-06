import KcAdminClient from '@keycloak/keycloak-admin-client';
import { PlatformConfig } from '../utils/PlatformConfig';

export class KeycloakAdminClient {
  public async getClient(): Promise<KcAdminClient> { // 
    const config = await PlatformConfig.Instance.getConfig();
    const baseUrl = config.getOptionalString("auth.providers.keycloak.development.baseUrl") ?? ""
    const user = config.getOptionalString("auth.providers.keycloak.development.username") ?? ""
    const password = config.getOptionalString("auth.providers.keycloak.development.password") ?? ""

    const kcAdminClient = new KcAdminClient({
      baseUrl: baseUrl,
      realmName: 'master',
    });
    
    // Authorize with username / password
    await kcAdminClient.auth({
      username: user,
      password: password,
      grantType: 'password',
      clientId: 'admin-cli',
    });
    kcAdminClient.setConfig({
      realmName: 'platform-devportal',
    });
      return kcAdminClient
  }
}

export class TestGroups {
  public async getGroup(){
    const kcAdminClient = await new KeycloakAdminClient().getClient();
    const groups = await kcAdminClient.groups.find();
    return groups;
  }
}
