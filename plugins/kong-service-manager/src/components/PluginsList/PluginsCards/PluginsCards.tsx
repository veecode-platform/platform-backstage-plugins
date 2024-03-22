/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @backstage/no-undeclared-imports */
import React, { useContext, useEffect } from 'react';
import { Content } from '@backstage/core-components';
import { AllPlugins } from './AllPlugins';
import { useStyles } from './styles';
import { AssociatedPlugins } from './AssociatedPlugins';
import { DrawerComponent } from '../DrawerComponent';
import { KongServiceManagerContext } from '../../context';
import { useEntityAnnotation } from '../../../hooks';
import { useEntity } from '@backstage/plugin-catalog-react';

export interface PluginsCardsProps {
  filterByAssociated?: boolean
}

export const PluginsCards = ({filterByAssociated}:PluginsCardsProps) => {

  const { content } = useStyles();
  const { entity } = useEntity();
  const { serviceName} = useEntityAnnotation(entity);
  const {listAllEnabledPlugins,associatedPluginsName} = useContext(KongServiceManagerContext)

  useEffect(()=>{
     listAllEnabledPlugins(serviceName as string)
   },[associatedPluginsName])

  return (
    <Content className={content}>
      <DrawerComponent />
      <>{!filterByAssociated ? <AllPlugins /> : <AssociatedPlugins />}</>
    </Content>
  );
};