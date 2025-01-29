import React from 'react';
import { CategoryComponent } from '../CategoryComponent';
import { PluginCard } from '../../../../utils/types';
import { useKongServiceManagerContext } from '../../../../context';

export const AssociatedPlugins= () => { 

  const { pluginsPerCategoryState } = useKongServiceManagerContext();
 
  return (
    <>
      { 
        pluginsPerCategoryState.map( category => 
            {
              const associatedPlugins:any[] = [];
              category.plugins.forEach((plugin:PluginCard) => { if (plugin.associated) associatedPlugins.push(plugin)})
              return associatedPlugins.length >= 1 ? <CategoryComponent label={category.category} plugins={associatedPlugins} key={category.category}/> : null
            }
        )
      }
    </>
  );
};
