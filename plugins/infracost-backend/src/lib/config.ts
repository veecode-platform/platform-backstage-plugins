import {
    readTaskScheduleDefinitionFromConfig,
    TaskScheduleDefinition,
  } from '@backstage/backend-tasks';
  import { Config } from '@backstage/config';

/**
 * The configuration parameters.
 *
 * @public
 */

export type InfracostProviderConfig = {
    id: string;
    baseUrl: string;
    schedule?: TaskScheduleDefinition;
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
          ? readTaskScheduleDefinitionFromConfig(
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