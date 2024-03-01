import React from 'react';
import { PluginCard, PluginsPerCategoryType } from '../PluginsCards';
import { CategoryComponent } from '../CategoryComponent';
import { PluginFieldsResponse } from '../../../../utils/types';


interface associatedPluginsProps {
  plugins: PluginsPerCategoryType,
  pluginFields: (pluginName: string, proxyPath: string) => Promise<PluginFieldsResponse[] | null>,
  disablePlugin: (serviceIdOrName: string, pluginId: string, proxyPath: string) => Promise<void>
}

const getPlugins = (data:PluginCard[]|[]) => {
  if(data.length >=1){
    const pluginsAvaliable : PluginCard[] = [];
    data.forEach(i => {
      if(i.associated) pluginsAvaliable.push(i)
    });
  return pluginsAvaliable;
  }
  return []
}

export const AssociatedPlugins = ({ plugins, pluginFields, disablePlugin }: associatedPluginsProps) => { 

  const aiPlugins = getPlugins(plugins.ai.plugins);
  const analiticsPlugins = getPlugins(plugins.analitics.plugins);
  const authPlugins = getPlugins(plugins.auth.plugins);
  const loggingPlugins = getPlugins(plugins.logging.plugins);
  const securityPlugins = getPlugins(plugins.security.plugins);
  const serverlessPlugins = getPlugins(plugins.serverless.plugins);
  const trafficControlPlugins = getPlugins(plugins.trafficControl.plugins);
  const transformationsPlugins = getPlugins(plugins.transformations.plugins);

  return (
    <>
      {aiPlugins.length >= 1 && ( 
        <CategoryComponent 
         label="AI"  
         plugins={aiPlugins}
         pluginFields={pluginFields} 
         disablePlugin={disablePlugin} />
      )}
      {analiticsPlugins.length >= 1 && ( 
        <CategoryComponent 
         label="Analitics & Monitoring"  
         plugins={analiticsPlugins}
         pluginFields={pluginFields} 
         disablePlugin={disablePlugin}/>
      )}
      {authPlugins.length >= 1 && ( 
        <CategoryComponent 
         label="Authentication"  
         plugins={authPlugins}
         pluginFields={pluginFields} 
         disablePlugin={disablePlugin}/>
      )}
      {loggingPlugins.length >= 1 && ( 
        <CategoryComponent 
         label="Logging"  
         plugins={loggingPlugins}
         pluginFields={pluginFields} 
         disablePlugin={disablePlugin}/>
      )}
      {securityPlugins.length >= 1 && ( 
        <CategoryComponent 
         label="Security"  
         plugins={securityPlugins}
         pluginFields={pluginFields} 
         disablePlugin={disablePlugin}/>
      )}
      {serverlessPlugins.length >= 1 && (
        <CategoryComponent 
         label="Serverless"  
         plugins={serverlessPlugins}
         pluginFields={pluginFields} 
         disablePlugin={disablePlugin}/>
      )}
      {trafficControlPlugins.length >= 1 && (
        <CategoryComponent 
         label="Traffic Control"  
         plugins={trafficControlPlugins}
         pluginFields={pluginFields} 
         disablePlugin={disablePlugin}/>
      )}
      {transformationsPlugins.length >= 1 && ( 
        <CategoryComponent 
         label="Transformations"  
         plugins={transformationsPlugins}
         pluginFields={pluginFields} 
         disablePlugin={disablePlugin}/>
      )}
    </>
  );
};
