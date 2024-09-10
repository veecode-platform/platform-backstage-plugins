import React from 'react';
import { CategoryComponent } from '../CategoryComponent';
import { useKongServiceManagerContext } from '../../../../context';
import { PluginPerCategory } from '../../../../utils/types';

export const AllPlugins = () => {

  const { pluginsPerCategory } = useKongServiceManagerContext();

  return (
    <>
      { pluginsPerCategory.map( 
        (category:PluginPerCategory) => 
          category.plugins.length >= 1 ? 
          <CategoryComponent label={category.category} plugins={category.plugins} key={category.category}/> 
          : null
        )
      }
    </>
  );
};
