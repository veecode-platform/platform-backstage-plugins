
import { PluginName, PluginService } from '../services/PluginService';
import axios from 'axios';

export class AclPlugin extends PluginService {

  
  private static _instance: AclPlugin;


  public constructor() {
    super();
  }

  public async configAclKongService(
    serviceName: string,
    allowedList: Array<string>,
  ) {
    const map: Map<string, any> = new Map<string, any>();
    map.set('hide_groups_header', true);
    map.set('allow', allowedList);

    return this.applyPluginKongService(serviceName, PluginName.acl, map);
  }

  public async updateAclKongService(
    serviceName: string,
    pluginId: string,
    allowedList: Array<string>,
  ) {
    const response = await axios.get(`${await this.getUrl()}/services/${serviceName}/plugins/${pluginId}`);
    const array: string[] = response.data.config.allow;
    for (let index = 0; index < allowedList.length; index++) {
      array.push(allowedList[index]);
    }
    const map: Map<string, any> = new Map<string, any>();
    map.set('allow', array);
    return this.updatePluginKongService(serviceName, pluginId, map);
  }

  public async removeAclKongService(serviceName: string, pluginId: string) {
    return this.removePluginKongService(serviceName, pluginId);
  }

  public static get Instance() {
    return this._instance || (this._instance = new this());
  }

}
