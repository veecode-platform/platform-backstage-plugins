import { Config } from '@backstage/config';
import { IKongConfig, IKongConfigOptions } from './types';

export class KongConfig implements IKongConfig {
  
  constructor(private config: Config){}
  
  getConfig() : IKongConfigOptions[] {
    return this.config.getConfig('kong').get('instances') as IKongConfigOptions[];
  };

  getInstance(instanceId: string): IKongConfigOptions {
    const instances = this.getConfig();
    const instance = instances.filter(i => i.id === instanceId);
    return instance[0] ?? {};
  }

}