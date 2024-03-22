import React, { useContext } from 'react';
import { CategoryComponent } from '../CategoryComponent';
import { KongServiceManagerContext } from '../../../context';

export const AssociatedPlugins = () => { 

  const { pluginsPerCategory } = useContext(KongServiceManagerContext)
  return (
    <>
      { 
        pluginsPerCategory.map( category => 
            {
              const associatedPlugins:any[] = [];
              category.plugins.forEach(plugin => { if (plugin.associated) associatedPlugins.push(plugin)})
              return associatedPlugins.length >= 1 ? <CategoryComponent label={category.category} plugins={associatedPlugins} key={category.category}/> : null
            }
        )
      }
    </>
  );
};
