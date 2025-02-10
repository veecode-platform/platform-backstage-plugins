import React from 'react';
import { Content } from '@backstage/core-components';
import { AllPlugins } from './AllPlugins';
import { usePluginsCardsStyles } from './styles';
import { AssociatedPlugins } from './AssociatedPlugins';
import { DrawerComponent } from '../DrawerComponent';
import { PluginsCardsProps, PluginsCardsWrapperProps } from './types';

const PluginsCardsWrapper : React.FC<PluginsCardsWrapperProps> = (props) => {
  const { children } = props;
  const { content } = usePluginsCardsStyles();
  
  return(
    <Content className={content}>
     <DrawerComponent />
     {children}
    </Content>
  )
}

export const PluginsCards : React.FC<PluginsCardsProps> = (props) => {

  const {filterByAssociated, listAllPlugins, associatedPluginsName} = props;

    React.useEffect(()=>{
      listAllPlugins()
     // eslint-disable-next-line react-hooks/exhaustive-deps
     },[associatedPluginsName])

  if(filterByAssociated) return(
    <PluginsCardsWrapper>
     <AssociatedPlugins/>
    </PluginsCardsWrapper>
  )

  return (
    <PluginsCardsWrapper>
     <AllPlugins/>
    </PluginsCardsWrapper>
  );
};