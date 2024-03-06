import React, { useContext } from 'react';
import { CategoryComponent } from '../CategoryComponent';
import { KongServiceManagerContext } from '../../../context';

export const AllPlugins = () => {

  const { pluginsPerCategory : plugins} = useContext(KongServiceManagerContext)

  return (
    <>
      {plugins.ai.plugins.length >= 1 && (
        <CategoryComponent label="AI" plugins={plugins.ai.plugins} />
      )}
      {plugins.analitics.plugins.length >= 1 && (
        <CategoryComponent
          label="Analitics & Monitoring"
          plugins={plugins.analitics.plugins}
        />
      )}
      {plugins.auth.plugins.length >= 1 && (
        <CategoryComponent
          label="Authentication"
          plugins={plugins.auth.plugins}
        />
      )}
      {plugins.logging.plugins.length >= 1 && (
        <CategoryComponent label="Logging" plugins={plugins.logging.plugins} />
      )}
      {plugins.security.plugins.length >= 1 && (
        <CategoryComponent
          label="Security"
          plugins={plugins.security.plugins}
        />
      )}
      {plugins.serverless.plugins.length >= 1 && (
        <CategoryComponent
          label="Serverless"
          plugins={plugins.serverless.plugins}
        />
      )}
      {plugins.trafficControl.plugins.length >= 1 && (
        <CategoryComponent
          label="Traffic Control"
          plugins={plugins.trafficControl.plugins}
        />
      )}
      {plugins.transformations.plugins.length >= 1 && (
        <CategoryComponent
          label="Transformations"
          plugins={plugins.transformations.plugins}
        />
      )}
    </>
  );
};
