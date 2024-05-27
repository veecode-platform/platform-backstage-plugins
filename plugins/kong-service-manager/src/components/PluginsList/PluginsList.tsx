/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @backstage/no-undeclared-imports */
import React, { useEffect } from 'react'
import { BoxComponent, EmptyStateComponent } from '../shared'
import { Box, makeStyles } from '@material-ui/core'
import { PluginsCards } from './PluginsCards';
import useAsync from 'react-use/lib/useAsync';
import { CardTab, Progress, TabbedCard } from '@backstage/core-components';
import ErrorBoundary from '../ErrorBoundary/ErrorBondary';
import { useKongServiceManagerContext } from '../../context';

const useStyles = makeStyles(theme=>({
   wrapper:{
      paddingTop: theme.spacing(4),
   },
   emptyContent:{
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '60vh'
   }
}));

export const PluginsList = () => {

  const { listAllEnabledPlugins ,listAssociatedPlugins, allAssociatedPlugins, pluginsPerCategory} = useKongServiceManagerContext();
  const { wrapper, emptyContent } = useStyles();

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

  useEffect(()=>{
    getPluginsEnabled();
  },[allAssociatedPlugins]);


  if (loading) return <Progress />;

  if(error) return <EmptyStateComponent/>;

  return (
    <ErrorBoundary>
      <BoxComponent title="Kong Plugins" searchBar>
        <Box className={wrapper}>
          <TabbedCard title="">
            <CardTab label="All Plugins">
              {pluginsPerCategory && pluginsPerCategory.length >=1 ? <PluginsCards /> : <div className={emptyContent}> No data to display ...</div>}
            </CardTab>
            <CardTab label="Associated Plugins">
              {allAssociatedPlugins && allAssociatedPlugins.length >= 1 ? (<PluginsCards filterByAssociated />) 
              : <div className={emptyContent}> No data to display ...</div>}
            </CardTab>
          </TabbedCard>
        </Box>
      </BoxComponent>
    </ErrorBoundary>
  );
}
