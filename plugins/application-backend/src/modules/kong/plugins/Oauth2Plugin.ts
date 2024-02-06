import { PluginName, PluginService } from "../services/PluginService";

export class Oauth2Plugin  extends PluginService {

    private static _instance: Oauth2Plugin;

    public async configureOauth(serviceName: string){
        const map: Map<string, any> = new Map<string, any>();
        map.set("auth_header_name", 'authorization')
        map.set("enable_authorization_code", true)
        map.set('enable_client_credentials', true)
        return await this.applyPluginKongService(serviceName, PluginName.oauth2, map); 
    }


    public async updateOauth(serviceName: string, authHeaderName: string,authorizationCode: boolean, implictGrant: boolean, clienteCredential: boolean, passwordGrant: boolean){
        const map: Map<string, any> = new Map<string, any>();
        map.set("auth_header_name", authHeaderName)
        map.set("enable_authorization_code", authorizationCode)
        map.set('enable_implicit_grant', implictGrant)
        map.set('enable_client_credentials', clienteCredential)
        map.set('enable_password_grant', passwordGrant)
        return this.updatePluginKongService(serviceName, PluginName.oauth2, map); 
    }

    public async removeOauth(serviceId: string, pluginId: string){
        return this.removePluginKongService(serviceId, pluginId);
    }
 
    public static get Instance() {
        return this._instance || (this._instance = new this());
      }
}