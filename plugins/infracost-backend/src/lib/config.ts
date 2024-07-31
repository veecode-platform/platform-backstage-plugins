import {SchedulerServiceTaskScheduleDefinition, readSchedulerServiceTaskScheduleDefinitionFromConfig} from '@backstage/backend-plugin-api';
  import { Config } from '@backstage/config';

/**
 * The configuration parameters.
 *
 * @public
 */

export type InfracostProviderConfig = {
    id: string;
    baseUrl: string;
    schedule?: SchedulerServiceTaskScheduleDefinition;
  };
  

export const readProviderConfigs = (config:Config):InfracostProviderConfig[] =>{
    const providersConfig = config.getOptionalConfig('catalog.providers.infracost');
    
    if(!providersConfig){
        return [];
    }

    return providersConfig.keys().map(id => {
        const providerConfigInstance = providersConfig.getConfig(id);

        // const baseUrl = providerConfigInstance.getString('baseUrl');
        const baseUrl = config.getString("backend.baseUrl");

        const schedule = providerConfigInstance.has('schedule')
          ? readSchedulerServiceTaskScheduleDefinitionFromConfig(
              providerConfigInstance.getConfig('schedule'),
            )
          : undefined;
    
        return {
          id,
          baseUrl,
          schedule,
        };
      });

}