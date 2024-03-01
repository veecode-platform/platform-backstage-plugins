import React from 'react';
import { PluginsPerCategoryType } from '../PluginsCards';
import { CategoryComponent } from '../CategoryComponent';
import { CreatePlugin, PluginFieldsResponse } from '../../../../utils/types';

interface AllPluginsProps {
  plugins: PluginsPerCategoryType,
  pluginFields: (pluginName: string, proxyPath: string) => Promise<PluginFieldsResponse[] | null>,
  enablePlugin: (serviceIdOrName: string, config: CreatePlugin, proxyPath: string) => Promise<void>,
  disablePlugin: (serviceIdOrName: string, pluginId: string, proxyPath: string) => Promise<void>
}

export const AllPlugins = ({ plugins,pluginFields,enablePlugin,disablePlugin }: AllPluginsProps) => { 

  return (
    <>
      {plugins.ai.plugins.length >= 1 && ( 
        <CategoryComponent 
          label="AI" 
          plugins={plugins.ai.plugins} 
          pluginFields={pluginFields} 
          enablePlugin={enablePlugin} 
          disablePlugin={disablePlugin} 
          />
      )}
      {plugins.analitics.plugins.length >= 1 && (
        <CategoryComponent 
          label="Analitics & Monitoring"
          plugins={plugins.analitics.plugins} 
          pluginFields={pluginFields} 
          enablePlugin={enablePlugin} 
          disablePlugin={disablePlugin}
          />
      )}
      {plugins.auth.plugins.length >= 1 && (
        <CategoryComponent
         label="Authentication"
         plugins={plugins.auth.plugins}
         pluginFields={pluginFields} 
         enablePlugin={enablePlugin} 
         disablePlugin={disablePlugin}
         />
      )}
      {plugins.logging.plugins.length >= 1 && (
        <CategoryComponent 
         label="Logging" 
         plugins={plugins.logging.plugins} 
         pluginFields={pluginFields} 
         enablePlugin={enablePlugin} 
         disablePlugin={disablePlugin}/>
      )}
      {plugins.security.plugins.length >= 1 && (
       <CategoryComponent 
        label="Security" 
        plugins={plugins.security.plugins} 
        pluginFields={pluginFields} 
        enablePlugin={enablePlugin} 
        disablePlugin={disablePlugin}
        />
      )}
      {plugins.serverless.plugins.length >= 1 && (
       <CategoryComponent 
        label="Serverless" 
        plugins={plugins.serverless.plugins} 
        pluginFields={pluginFields} 
        enablePlugin={enablePlugin} 
        disablePlugin={disablePlugin}/>
      )}
      {plugins.trafficControl.plugins.length >= 1 && (
       <CategoryComponent 
        label="Traffic Control" 
        plugins={plugins.trafficControl.plugins} 
        pluginFields={pluginFields} 
        enablePlugin={enablePlugin} 
        disablePlugin={disablePlugin}/>
      )}
      {plugins.transformations.plugins.length >= 1 && (
       <CategoryComponent 
        label="Transformations" 
        plugins={plugins.transformations.plugins} 
        pluginFields={pluginFields} 
        enablePlugin={enablePlugin} 
        disablePlugin={disablePlugin}
        />
      )}
    </>
  );
};
