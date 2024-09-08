import React from 'react';
import { CategoryComponent } from '../CategoryComponent';
import { useKongServiceManagerContext } from '../../../../context';
import { PluginPerCategory } from '@veecode-platform/backstage-plugin-kong-service-manager-common';

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
