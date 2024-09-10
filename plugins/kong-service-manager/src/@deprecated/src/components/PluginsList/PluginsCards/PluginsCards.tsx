/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @backstage/no-undeclared-imports */
import React, { useEffect } from 'react';
import { Content } from '@backstage/core-components';
import { AllPlugins } from './AllPlugins';
import { usePluginsCardsStyles } from './styles';
import { AssociatedPlugins } from './AssociatedPlugins';
import { DrawerComponent } from '../DrawerComponent';
import { useKongServiceManagerContext } from '../../../context';

export interface PluginsCardsProps {
  filterByAssociated?: boolean
}

export const PluginsCards = ({filterByAssociated}:PluginsCardsProps) => {

  const {listAllEnabledPlugins,associatedPluginsName} = useKongServiceManagerContext();
  const { content } = usePluginsCardsStyles();

  useEffect(()=>{
     listAllEnabledPlugins()
   },[associatedPluginsName])

  return (
    <Content className={content}>
      <DrawerComponent />
      <>{!filterByAssociated ? <AllPlugins /> : <AssociatedPlugins />}</>
    </Content>
  );
};