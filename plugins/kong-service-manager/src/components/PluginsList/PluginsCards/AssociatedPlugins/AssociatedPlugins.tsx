/* eslint-disable @backstage/no-undeclared-imports */
import React, { useContext, useEffect } from 'react';
import { CategoryComponent } from '../CategoryComponent';
import { PluginCard } from '../../../../utils/types';
import { KongServiceManagerContext } from '../../../context';
import { useEntityAnnotation } from '../../../../hooks';
import { useEntity } from '@backstage/plugin-catalog-react';

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

  // const { entity } = useEntity();
  // const { kongInstance } = useEntityAnnotation(entity)
  // const {listAllEnabledPlugins} = useContext(KongServiceManagerContext)
  const { pluginsPerCategory : plugins} = useContext(KongServiceManagerContext)

  const aiPlugins = getPlugins(plugins.ai.plugins);
  const analiticsPlugins = getPlugins(plugins.analitics.plugins);
  const authPlugins = getPlugins(plugins.auth.plugins);
  const loggingPlugins = getPlugins(plugins.logging.plugins);
  const securityPlugins = getPlugins(plugins.security.plugins);
  const serverlessPlugins = getPlugins(plugins.serverless.plugins);
  const trafficControlPlugins = getPlugins(plugins.trafficControl.plugins);
  const transformationsPlugins = getPlugins(plugins.transformations.plugins);

  // useEffect(()=>{
  //   listAllEnabledPlugins(kongInstance as string)
  // // eslint-disable-next-line react-hooks/exhaustive-deps
  // },[])

  return (
    <>
      {aiPlugins.length >= 1 && (
        <CategoryComponent label="AI" plugins={aiPlugins} />
      )}
      {analiticsPlugins.length >= 1 && (
        <CategoryComponent
          label="Analitics & Monitoring"
          plugins={analiticsPlugins}
        />
      )}
      {authPlugins.length >= 1 && (
        <CategoryComponent label="Authentication" plugins={authPlugins} />
      )}
      {loggingPlugins.length >= 1 && (
        <CategoryComponent label="Logging" plugins={loggingPlugins} />
      )}
      {securityPlugins.length >= 1 && (
        <CategoryComponent label="Security" plugins={securityPlugins} />
      )}
      {serverlessPlugins.length >= 1 && (
        <CategoryComponent label="Serverless" plugins={serverlessPlugins} />
      )}
      {trafficControlPlugins.length >= 1 && (
        <CategoryComponent
          label="Traffic Control"
          plugins={trafficControlPlugins}
        />
      )}
      {transformationsPlugins.length >= 1 && (
        <CategoryComponent
          label="Transformations"
          plugins={transformationsPlugins}
        />
      )}
    </>
  );
};
