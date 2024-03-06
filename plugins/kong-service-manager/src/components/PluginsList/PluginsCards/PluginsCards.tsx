/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @backstage/no-undeclared-imports */
import React, { useContext, useEffect } from 'react';
import { Content } from '@backstage/core-components';
import { AllPlugins } from './AllPlugins';
import { useStyles } from './styles';
import { AssociatedPlugins } from './AssociatedPlugins';
import { DrawerComponent } from '../DrawerComponent';
import { useEntity } from '@backstage/plugin-catalog-react';
import { useEntityAnnotation } from '../../../hooks';
import { KongServiceManagerContext } from '../../context';

export interface PluginsCardsProps {
  filterByAssociated?: boolean
}

export const PluginsCards = ({filterByAssociated}:PluginsCardsProps) => {

  const { content } = useStyles();
  const { entity } = useEntity();
  const { kongInstance } = useEntityAnnotation(entity)
  const {listAllEnabledPlugins,disablePlugin, enablePlugin,pluginsPerCategory} = useContext(KongServiceManagerContext)

  useEffect(()=>{
    listAllEnabledPlugins(kongInstance as string)
  },[disablePlugin,enablePlugin,pluginsPerCategory])

  return (
    <Content className={content}>
      <DrawerComponent />
      <>{!filterByAssociated ? <AllPlugins /> : <AssociatedPlugins />}</>
    </Content>
  );
};