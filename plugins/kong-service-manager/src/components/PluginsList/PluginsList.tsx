import React from 'react'
import { BoxComponent, EmptyStateComponent } from '../shared'
import { PluginsCards } from './PluginsCards';
import useAsync from 'react-use/lib/useAsync';
import { CardTab, TabbedCard } from '@backstage/core-components';
import ErrorBoundary from '../ErrorBoundary/ErrorBondary';
import { usePluginListStyles } from './styles';
import { Box } from '@material-ui/core';
import { useKongServiceManagerContext } from '../../context';
import { PluginListProps } from './types';
import { PluginListSkeleton } from './PluginListSkeleton';



const PluginsList : React.FC<PluginListProps> = (props) => {

  const {listAllPlugins, listAssociatedPlugins, associatedPluginsState, associatedPluginsName } = props;
  const { wrapper, emptyContent } = usePluginListStyles();
  const { pluginsPerCategoryState } = useKongServiceManagerContext();

  const getPluginsEnabled = async () => {
    await listAllPlugins();
  };

    const { loading, error } = useAsync(async (): Promise<void> => {
      await Promise.all([
           Promise.all([listAllPlugins(), listAssociatedPlugins()])
      ]);
    }, []);

  React.useEffect(()=>{
    getPluginsEnabled();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[associatedPluginsState]);

  if(error) return <EmptyStateComponent/>;

  return (
    <ErrorBoundary>
      <BoxComponent title="Kong Plugins" searchBar>
        <Box className={wrapper}>
          <TabbedCard title="">
            <CardTab label="All Plugins">
              {loading && (<PluginListSkeleton/>)}
              {pluginsPerCategoryState && pluginsPerCategoryState.length >=1 ? <PluginsCards listAllPlugins={listAllPlugins} associatedPluginsName={associatedPluginsName} /> : <div className={emptyContent}> No data to display ...</div>}
            </CardTab>
              <CardTab 
               label="Associated Plugins">
                {loading && (<PluginListSkeleton/>)}
                {associatedPluginsState && associatedPluginsState.length >= 1 ? (<PluginsCards filterByAssociated listAllPlugins={listAllPlugins} associatedPluginsName={associatedPluginsName} />) 
                : <div className={emptyContent}> No data to display ...</div>}
              </CardTab>
          </TabbedCard>
        </Box>
      </BoxComponent>
    </ErrorBoundary>
  );
}

export default React.memo(PluginsList);