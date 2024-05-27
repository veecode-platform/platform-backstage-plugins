import React from 'react';
import { CategoryComponent } from '../CategoryComponent';
import { useKongServiceManagerContext } from '../../../../context';
import { PluginCard } from '../../../../utils/types';

export const AssociatedPlugins = () => { 

  const { pluginsPerCategory } = useKongServiceManagerContext()
  return (
    <>
      { 
        pluginsPerCategory.map( category => 
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
