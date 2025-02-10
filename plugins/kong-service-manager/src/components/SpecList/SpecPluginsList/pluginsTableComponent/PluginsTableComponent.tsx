import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { StyledTableCell, StyledTableRow, usePluginsTableStyles } from './styles';
import { IoMdAdd, IoMdRemove } from 'react-icons/io';
import TableFooter from '@mui/material/TableFooter';
import { PluginsTableProps } from './types';
import { useKongServiceManagerContext } from '../../../../context';
import { addPluginsToList, initialPluginsSpecListState, PluginsSpecListReducer, updatePluginFromList } from './state';
import { PluginForSpec } from '../../../../utils/types';
import useAsync from 'react-use/esm/useAsync';
import { addPluginsToSpec } from '../../../../context/state';
import { HttpMethod, IKongPluginSpec, kongUpdateSpecPermission } from '@veecode-platform/backstage-plugin-kong-service-manager-common';
import { ButtonComponent, LoadingComponent } from '../../../shared';
import { PullRequestModal } from '../../PullRequesModal';
import { usePermission } from '@backstage/plugin-permission-react';
import { FcInfo } from "react-icons/fc";


const createData = (
  name: string,
  image: string,
  description: string,
  config : any,
  enableToSpec: boolean,
)  => {
  return { name, image, description, config, enableToSpec };
}

export const PluginsTableComponent : React.FC<PluginsTableProps> = (props) => {
  
  const [pluginsSpecListState, pluginsSpecListDispatch] = React.useReducer(PluginsSpecListReducer,initialPluginsSpecListState);
  const [showModal, setShowModal] = React.useState<boolean>(false);
  const [ hasChange, setHasChange ] = React.useState<boolean>(false);
  const { specName, route } = props;
  const { root,iconAndName, apply, remove, submit, noPluginsInfo, footer, fixedToBottom } = usePluginsTableStyles();
  const {  pluginsToSpecState, pluginsToSpecDispatch,listAllServicePluginsForSpec,listAllRoutePluginsForSpec } = useKongServiceManagerContext();
  const { loading: loadingUpdateSpecPermission, allowed: canUpdateSpec } = usePermission({
    permission: kongUpdateSpecPermission,
  });

  const handleAction = (pluginName:string) => {
    const plugin = pluginsSpecListState.filter(p => p.name === pluginName)[0];
    pluginsSpecListDispatch(updatePluginFromList({
      image: plugin.image,
      name: plugin.name,
      slug: plugin.slug,
      description: plugin.description,
      config: plugin.config,
      enabledToSpec: !plugin.enabledToSpec,
    }))
  };

  const fetchData = async (): Promise<PluginForSpec[]> => {
    let data : PluginForSpec[] = [];
    if(route) data = await listAllRoutePluginsForSpec(route.path, route.method.toLowerCase() as HttpMethod) as PluginForSpec[];
    else data = await listAllServicePluginsForSpec() as PluginForSpec[];
    return data
  };

  const {  loading, value: allPlugins} = useAsync(fetchData,[specName])

  const rows = ( pluginsSpecListState  && pluginsSpecListState.length > 0 ) ? pluginsSpecListState.map(
    plugin => createData(plugin.name, plugin.image,plugin.description, plugin.config, plugin.enabledToSpec)
  ) : [];

  const handleToggleModal = () => setShowModal(!showModal);

  const handleApplyChanges = () => handleToggleModal();


  const checkChanges = (): boolean => {
    if (allPlugins && pluginsToSpecState) {
      const enabledPlugins = allPlugins.filter(p => p.enabledToSpec);
      
      if (enabledPlugins.length !== pluginsToSpecState.length) return true;
  
      const hasDifference = enabledPlugins.some(plugin => 
        !pluginsToSpecState.some(p => p.name === plugin.slug && p.enabled === plugin.enabledToSpec)
      );

      return hasDifference;
    }
    return false;
  };

  React.useEffect(()=>{
     if(allPlugins){
      pluginsSpecListDispatch(addPluginsToList(allPlugins))
     }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[allPlugins]);

  React.useEffect(()=>{
    if( pluginsSpecListState && pluginsSpecListState.length > 0){
      const pluginsListToSpec : IKongPluginSpec[] = [];
      pluginsSpecListState.map(plugin => {
        if(plugin.enabledToSpec){
          pluginsListToSpec.push({
            name: plugin.slug,   // the slug as name
            enabled: plugin.enabledToSpec,
            config: plugin.config
          })
        }
      });
      pluginsToSpecDispatch(addPluginsToSpec(pluginsListToSpec))
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[pluginsSpecListState]);

  React.useEffect(()=>{
    const changes = checkChanges();
    setHasChange(changes)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[allPlugins,pluginsToSpecState])


  return (
      <>
        <TableContainer className={root} >
          <Table sx={{ minWidth: 700 }} aria-label="plugins table" >
            <TableHead>
              <TableRow>
                <StyledTableCell>Plugin</StyledTableCell>
                <StyledTableCell align="center">Description</StyledTableCell>
                <StyledTableCell align="center">Action</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              { loading ? <LoadingComponent/> : (<>
               { rows.length <= 0 ?  (
                <StyledTableRow>
                  <StyledTableCell component="th" scope="row" colSpan={3}>
                   <div className={noPluginsInfo}> <FcInfo /> No associated plugins</div>
                   </StyledTableCell>
                 </StyledTableRow>
               ) : (
                  rows.map((row) => (
                    <StyledTableRow key={row.name}>
                      <StyledTableCell component="th" scope="row">
                      <div className={iconAndName}> <img src={row.image} alt={row.name}/> {row.name}</div>
                      </StyledTableCell>
                      <StyledTableCell align="center">{row.description}</StyledTableCell>
                      <StyledTableCell align="center">
                      {!loadingUpdateSpecPermission && (  
                          <ButtonComponent 
                            handleClick={()=> handleAction(row.name)} 
                            isDisabled={!canUpdateSpec}
                            classes={row.enableToSpec ? remove: apply}> 
                            {row.enableToSpec ? (<><IoMdRemove size={20}/> Remove from Spec</>): (<><IoMdAdd size={20}/> Apply to Spec</>)}
                          </ButtonComponent>
                        )}
                      </StyledTableCell>
                    </StyledTableRow>
                  ))
                 )}</>
              )}
            </TableBody>
            {rows.length > 0 && (
              <TableFooter className={`${footer} ${rows.length <= 3 && fixedToBottom}`}>
                <StyledTableRow>
                  <StyledTableCell colSpan={3} align="center" className={footer} >  
                    {!loadingUpdateSpecPermission && (       
                      <ButtonComponent 
                        isDisabled={!hasChange && !canUpdateSpec} 
                        classes={submit} 
                        handleClick={handleApplyChanges}>
                          Apply
                      </ButtonComponent>)}
                  </StyledTableCell>
                </StyledTableRow>
             </TableFooter>
            )}
          </Table>
        </TableContainer>
        {showModal && (
          <PullRequestModal
            specName={specName}
            show={showModal}
            handleCloseModal={handleToggleModal}
            route={route}
           />
        )}
      </>
  );
}