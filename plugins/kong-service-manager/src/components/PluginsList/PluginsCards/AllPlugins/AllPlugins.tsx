import React, { useContext } from 'react';
import { CategoryComponent } from '../CategoryComponent';
import { KongServiceManagerContext } from '../../../context';

export const AllPlugins = () => {

  const { pluginsPerCategory } = useContext(KongServiceManagerContext)

  return (
    <>
      { pluginsPerCategory.map( 
        category => 
          category.plugins.length >= 1 ? 
          <CategoryComponent label={category.category} plugins={category.plugins} key={category.category}/> 
          : null
        )
      }
    </>
  );
};
