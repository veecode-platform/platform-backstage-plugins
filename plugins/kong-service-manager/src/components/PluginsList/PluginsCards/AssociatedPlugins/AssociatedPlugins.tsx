import React from 'react';
import { PluginCard, PluginsPerCategoryType } from '../PluginsCards';
import { useStyles } from '../styles';
import { CategoryComponent } from '../CategoryComponent';


interface associatedPluginsProps {
  plugins: PluginsPerCategoryType;
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

export const AssociatedPlugins = ({ plugins }: associatedPluginsProps) => { 

  const { } = useStyles();

  const aiPlugins = getPlugins(plugins.ai.plugins);
  const analiticsPlugins = getPlugins(plugins.analitics.plugins);
  const authPlugins = getPlugins(plugins.auth.plugins);
  const loggingPlugins = getPlugins(plugins.logging.plugins);
  const securityPlugins = getPlugins(plugins.security.plugins);
  const serverlessPlugins = getPlugins(plugins.serverless.plugins);
  const trafficControlPlugins = getPlugins(plugins.trafficControl.plugins);
  const transformationsPlugins = (plugins.transformations.plugins);

  return (
    <>
      {(aiPlugins.some(c => c.associated) && aiPlugins.length >= 1) && ( <CategoryComponent label="AI"  plugins={aiPlugins}/>)}
      {(analiticsPlugins.some(c => c.associated) && analiticsPlugins.length >= 1) && ( <CategoryComponent label="Analitics & Monitoring"  plugins={analiticsPlugins}/>)}
      {(authPlugins.some(c => c.associated) && authPlugins.length >= 1) && ( <CategoryComponent label="Authentication"  plugins={authPlugins}/>)}
      {(loggingPlugins.some(c => c.associated) && loggingPlugins.length >= 1) && ( <CategoryComponent label="Logging"  plugins={loggingPlugins}/>)}
      {(securityPlugins.some(c => c.associated) && securityPlugins.length >= 1) && ( <CategoryComponent label="Security"  plugins={securityPlugins}/>)}
      {(serverlessPlugins.some(c => c.associated) && serverlessPlugins.length >= 1) && (<CategoryComponent label="Serverless"  plugins={serverlessPlugins}/>)}
      {(trafficControlPlugins.some(c => c.associated) && trafficControlPlugins.length >= 1) && (<CategoryComponent label="Traffic Control"  plugins={trafficControlPlugins}/>)}
      {(transformationsPlugins.some(c => c.associated)  && transformationsPlugins.length >= 1 )&& ( <CategoryComponent label="Transformations"  plugins={transformationsPlugins}/>)}
    </>
  );
};
