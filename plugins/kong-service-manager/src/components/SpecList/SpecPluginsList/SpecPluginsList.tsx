import React from 'react'
import { BoxComponent } from '../../shared'
import { useParams } from 'react-router-dom'
import { useSpecPluginsListStyles } from './styles';
import { CardTab, TabbedCard } from '@backstage/core-components';
import RouteListComponent from './routeListComponent/RouteListComponent';
import ServiceComponent from './serviceComponent/ServiceComponent';


export const SpecPluginsList  = () => {

  const { specName } = useParams();
  const { cardTabstyle } = useSpecPluginsListStyles();  

  return (
    <BoxComponent title={specName as string} noSelectInstance goBack>
      <TabbedCard title="">
        <CardTab label="Service" className={cardTabstyle}>
          <ServiceComponent specname={specName!}/>
        </CardTab>
        <CardTab label="Routes" className={cardTabstyle}>
          <RouteListComponent specname={specName!} />
        </CardTab>
      </TabbedCard>
    </BoxComponent>
  )
}
