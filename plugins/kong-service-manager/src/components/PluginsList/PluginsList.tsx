import React from 'react'
import { BoxComponent, EmptyStateComponent } from '../shared'
import { PluginsCards } from './PluginsCards';
import useAsync from 'react-use/lib/useAsync';
import { CardTab, Progress, TabbedCard } from '@backstage/core-components';
import ErrorBoundary from '../ErrorBoundary/ErrorBondary';
import { useKongServiceManagerContext } from '../../context';
import { usePluginListStyles } from './styles';
import { Box } from '@material-ui/core';
import { kongServiceManagerReadPluginsAssociatedPermission } from '@veecode-platform/backstage-plugin-kong-service-manager-common';
import { usePermission } from '@backstage/plugin-permission-react';

export const PluginsList = () => {

  const { listAllEnabledPlugins ,listAssociatedPlugins, allAssociatedPluginsState, pluginsPerCategoryState} = useKongServiceManagerContext();
  const { wrapper, emptyContent } = usePluginListStyles();
  const { loading: loadingReadAssociatedPluginsPermission, allowed: canReadAssociatedPlugins } = usePermission({
    permission: kongServiceManagerReadPluginsAssociatedPermission,
  });

  const getPluginsEnabled = async () => {
    await listAllEnabledPlugins();
  };

  const getAssociatedPlugins = async () => {
    await listAssociatedPlugins();
  };

  const { loading, error } = useAsync(async (): Promise<void> => {
    getPluginsEnabled();
    getAssociatedPlugins();
  }, []);

  React.useEffect(()=>{
    getPluginsEnabled();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[allAssociatedPluginsState]);

  if (loading) return <Progress />;

  if(error) return <EmptyStateComponent/>;

  return (
    <ErrorBoundary>
      <BoxComponent title="Kong Plugins" searchBar>
        <Box className={wrapper}>
          <TabbedCard title="">
            <CardTab label="All Plugins">
              {pluginsPerCategoryState && pluginsPerCategoryState.length >=1 ? <PluginsCards /> : <div className={emptyContent}> No data to display ...</div>}
            </CardTab>
            <>
            {!loadingReadAssociatedPluginsPermission && ( 
              <CardTab 
               disabled={canReadAssociatedPlugins} 
               label="Associated Plugins">
                {allAssociatedPluginsState && allAssociatedPluginsState.length >= 1 ? (<PluginsCards filterByAssociated />) 
                : <div className={emptyContent}> No data to display ...</div>}
              </CardTab>)}
              </>
          </TabbedCard>
        </Box>
      </BoxComponent>
    </ErrorBoundary>
  );
}
