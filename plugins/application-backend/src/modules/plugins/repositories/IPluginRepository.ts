import { Plugin } from '../domain/Plugin';
import { PluginDto } from '../dtos/PluginDto';

export interface IPluginRepository {
  getPlugins(): Promise<Plugin[]>;
  getPluginById(id: string): Promise<Plugin | string>;
  savePlugin(pluginDto: PluginDto): Promise<Plugin>;
  deletePlugin(id: string): Promise<void>;
  createPlugin(pluginDto: PluginDto): Promise<Plugin | string>;
  patchPlugin(id: string, pluginDto: PluginDto): Promise<Plugin | string>;
  getPluginByServiceId(id: string): Promise<any[]>;
  getPluginByTypeOnService(id: string, type:string):Promise<any>;
}
