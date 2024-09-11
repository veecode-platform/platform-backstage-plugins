import { Config } from '@backstage/config';
import { LoggerService } from "@backstage/backend-plugin-api";
import { FromConfig, IKongConfig, IKongConfigOptions } from './types';

export class KongConfig implements IKongConfig {
  
  constructor(
    private config: Config,
    private logger: LoggerService
  ){}
  
  getConfig() : FromConfig {
    const kongConfig = this.config.getConfig('kong');
    const backendBaseUrl = this.config.getString("backend.baseUrl");
    if(!kongConfig){
      this.logger.error(`No configuration found for kong`)
    }
    return {
      instances: kongConfig.get('instances') as IKongConfigOptions[],
      backendBaseUrl
    }
  };

  getInstance(instanceId: string): IKongConfigOptions {
    const { instances } = this.getConfig();
    const instance = instances.filter(i => i.id === instanceId);
    return instance[0] ?? {};
  }

}