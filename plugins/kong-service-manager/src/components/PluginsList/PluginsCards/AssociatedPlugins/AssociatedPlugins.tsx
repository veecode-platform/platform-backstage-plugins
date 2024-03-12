import React, { useContext } from 'react';
import { CategoryComponent } from '../CategoryComponent';
import { PluginCard } from '../../../../utils/types';
import { KongServiceManagerContext } from '../../../context';

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

export const AssociatedPlugins = () => { 

  const { pluginsPerCategory } = useContext(KongServiceManagerContext)

  const aiPlugins = getPlugins(pluginsPerCategory.ai.plugins);
  const analiticsPlugins = getPlugins(pluginsPerCategory.analitics.plugins);
  const authPlugins = getPlugins(pluginsPerCategory.auth.plugins);
  const loggingPlugins = getPlugins(pluginsPerCategory.logging.plugins);
  const securityPlugins = getPlugins(pluginsPerCategory.security.plugins);
  const serverlessPlugins = getPlugins(pluginsPerCategory.serverless.plugins);
  const trafficControlPlugins = getPlugins(pluginsPerCategory.trafficControl.plugins);
  const transformationsPlugins = getPlugins(pluginsPerCategory.transformations.plugins);

  return (
    <>
      {aiPlugins.length >= 1 && (<CategoryComponent label="AI" plugins={aiPlugins} />)}
      {analiticsPlugins.length >= 1 && (<CategoryComponent label="Analitics & Monitoring" plugins={analiticsPlugins}/>)}
      {authPlugins.length >= 1 && (<CategoryComponent label="Authentication" plugins={authPlugins} />)}
      {loggingPlugins.length >= 1 && (<CategoryComponent label="Logging" plugins={loggingPlugins} />)}
      {securityPlugins.length >= 1 && (<CategoryComponent label="Security" plugins={securityPlugins} />)}
      {serverlessPlugins.length >= 1 && (<CategoryComponent label="Serverless" plugins={serverlessPlugins} />)}
      {trafficControlPlugins.length >= 1 && (<CategoryComponent label="Traffic Control" plugins={trafficControlPlugins} />)}
      {transformationsPlugins.length >= 1 && (<CategoryComponent label="Transformations" plugins={transformationsPlugins}/>)}
    </>
  );
};
