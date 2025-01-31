import React from 'react'
import { BoxComponent } from '../../shared'
import { useParams } from 'react-router-dom'
import { useSpecPluginsListStyles } from './styles';
import { Box, Typography } from '@material-ui/core';
import { PluginsTable } from './pluginsTable';
import { CardTab, TabbedCard } from '@backstage/core-components';
import { SpecPluginsListProps, WrapperProps } from './types';
import { useKongServiceManagerContext } from '../../../context';
import useAsync from 'react-use/esm/useAsync';
import { RouteResponse } from '@veecode-platform/backstage-plugin-kong-service-manager-common';
import RouteListTable from './routeListTable/RouteListTable';


const Wrapper : React.FC<WrapperProps> = (props) => {
  const { root, content,titleBar } = useSpecPluginsListStyles();
  const { title, children } = props;
  return (
    <div className={root}>
      <Box className={content}>
        <div className={titleBar}>
          <Typography variant="h6">{title}</Typography>
        </div>
         {children}
      </Box>
    </div>
  )
}


const ServiceSpecList : React.FC<SpecPluginsListProps> = (props) => {
  const { specname } = props;
  return (
    <Wrapper title="Plugins associated to service">
      <PluginsTable specName={specname} />
    </Wrapper>
  )
}


const RouteList : React.FC = () => { 
  const { getRoutesList } = useKongServiceManagerContext();

    const fetchRoutes = async (): Promise<RouteResponse[]> => {
      const data = await getRoutesList() as RouteResponse[];
      return data;
    }

  const {value: routes, loading, error} = useAsync(fetchRoutes,[]);

  if(error)  return (
    <Wrapper title="Route List">
      <div>Error..</div>
    </Wrapper>
  )

  return (
    <Wrapper title="Route List">
     <RouteListTable routes={routes!} loading={loading} />
    </Wrapper>
  )
}



export const SpecPluginsList  = () => {

  const { specName } = useParams();
  const { cardTabstyle } = useSpecPluginsListStyles();  

  return (
    <BoxComponent title={specName as string} noSelectInstance goBack>
      <TabbedCard title="">
        <CardTab label="Service" className={cardTabstyle}>
          <ServiceSpecList specname={specName!}/>
        </CardTab>
        <CardTab label="Routes" className={cardTabstyle}>
          <RouteList/>
        </CardTab>
      </TabbedCard>
    </BoxComponent>
  )
}
