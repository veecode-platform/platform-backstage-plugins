/* eslint-disable no-restricted-syntax */
import React from 'react';
import { CategoryComponent } from '../CategoryComponent';
import { PluginPerCategory } from '@veecode-platform/backstage-plugin-kong-service-manager-common';
import { useKongServiceManagerContext } from '../../../../context';

export const AllPlugins = () => {
  const { pluginsPerCategoryState } = useKongServiceManagerContext();

  return (
    <>
      {pluginsPerCategoryState.map((category: PluginPerCategory) =>
        category.plugins.length >= 1 ? (
          <CategoryComponent
            label={category.category}
            plugins={category.plugins}
            key={category.category}
          />
        ) : null,
      )}
    </>
  );
};
