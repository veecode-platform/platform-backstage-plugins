import React from 'react';
import { Content } from '@backstage/core-components';
import { AllPlugins } from './AllPlugins';
import { usePluginsCardsStyles } from './styles';
import { AssociatedPlugins } from './AssociatedPlugins';
import { DrawerComponent } from '../DrawerComponent';
import { useKongServiceManagerContext } from '../../../context';
import { PluginsCardsProps } from './types';

export const PluginsCards : React.FC<PluginsCardsProps> = (props) => {

  const {listAllEnabledPlugins,associatedPluginsName} = useKongServiceManagerContext();
  const { content } = usePluginsCardsStyles();
  const {filterByAssociated} = props;

  React.useEffect(()=>{
     listAllEnabledPlugins()
   // eslint-disable-next-line react-hooks/exhaustive-deps
   },[associatedPluginsName])

  return (
    <Content className={content}>
      <DrawerComponent />
      <>{!filterByAssociated ? <AllPlugins /> : <AssociatedPlugins />}</>
    </Content>
  );
};