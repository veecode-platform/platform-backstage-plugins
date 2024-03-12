import React, { useContext } from 'react';
import { CategoryComponent } from '../CategoryComponent';
import { KongServiceManagerContext } from '../../../context';

export const AllPlugins = () => {

  const { pluginsPerCategory } = useContext(KongServiceManagerContext)

  return (
    <>
      {pluginsPerCategory.ai.plugins.length >= 1 && (<CategoryComponent label="AI" plugins={pluginsPerCategory.ai.plugins} />)}
      {pluginsPerCategory.analitics.plugins.length >= 1 && (<CategoryComponent label="Analitics & Monitoring" plugins={pluginsPerCategory.analitics.plugins}/>)}
      {pluginsPerCategory.auth.plugins.length >= 1 && (<CategoryComponent label="Authentication" plugins={pluginsPerCategory.auth.plugins}/>)}
      {pluginsPerCategory.logging.plugins.length >= 1 && (<CategoryComponent label="Logging" plugins={pluginsPerCategory.logging.plugins} />)}
      {pluginsPerCategory.security.plugins.length >= 1 && (<CategoryComponent label="Security" plugins={pluginsPerCategory.security.plugins} />)}
      {pluginsPerCategory.serverless.plugins.length >= 1 && (<CategoryComponent label="Serverless" plugins={pluginsPerCategory.serverless.plugins}/>)}
      {pluginsPerCategory.trafficControl.plugins.length >= 1 && (<CategoryComponent label="Traffic Control" plugins={pluginsPerCategory.trafficControl.plugins}/>)}
      {pluginsPerCategory.transformations.plugins.length >= 1 && (<CategoryComponent label="Transformations" plugins={pluginsPerCategory.transformations.plugins}/>)}
    </>
  );
};
