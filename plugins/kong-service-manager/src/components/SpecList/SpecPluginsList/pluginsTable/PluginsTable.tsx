import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { StyledTableCell, StyledTableRow, usePluginsTableStyles } from './styles';
import Button from '@mui/material/Button';
import { IoMdAdd, IoMdRemove } from 'react-icons/io';
import TableFooter from '@mui/material/TableFooter';
import { PluginsTableProps } from './types';
import { useKongServiceManagerContext } from '../../../../context';
import { addPluginsToList, initialPluginsSpecListState, PluginsSpecListReducer, updatePluginFromList } from './state';
import { PluginForSpec } from '../../../../utils/types';
import useAsync from 'react-use/esm/useAsync';
import { addPluginsToSpec } from '../../../../context/state';
import { IKongPluginSpec } from '@veecode-platform/backstage-plugin-kong-service-manager-common';


const createData = (
  name: string,
  image: string,
  description: string,
  config : any,
  enableToSpec: boolean,
)  => {
  return { name, image, description, config, enableToSpec };
}

export const PluginsTable : React.FC<PluginsTableProps> = (props) => {
  
  const [pluginsSpecListState, pluginsSpecListDispatch] = React.useReducer(PluginsSpecListReducer,initialPluginsSpecListState);
  const { specName } = props;
  const { root,iconAndName, button, apply, remove, submit, footer, fixedToBottom } = usePluginsTableStyles();
  const { listAllPluginsForSpec, pluginsToSpecState, pluginsToSpecDispatch } = useKongServiceManagerContext();


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
    const data = await listAllPluginsForSpec(specName) as PluginForSpec[];
    return data
  };

  const { /* loading, error ,*/ value: allPlugins} = useAsync(fetchData,[specName]) // to do

  const rows = ( pluginsSpecListState  && pluginsSpecListState.length > 0 ) ? pluginsSpecListState.map(
    plugin => createData(plugin.name, plugin.image,plugin.description, plugin.config, plugin.enabledToSpec)
  ) : [];

  React.useEffect(()=>{
     if(allPlugins){
      pluginsSpecListDispatch(addPluginsToList(allPlugins))
     }
  },[allPlugins]);

  React.useEffect(()=>{
    if( pluginsSpecListState && pluginsSpecListState.length > 0){
      const pluginsListToSpec : IKongPluginSpec[] = [];
      pluginsSpecListState.map(plugin => {
        if(plugin.enabledToSpec){
          pluginsListToSpec.push({
            name: plugin.name,
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
    // eslint-disable-next-line no-console
    console.log("APPLY >>> ",pluginsToSpecState)
  },[pluginsToSpecState])

  return (
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
          {rows.map((row) => (
            <StyledTableRow key={row.name}>
              <StyledTableCell component="th" scope="row">
               <div className={iconAndName}> <img src={row.image} alt={row.name}/> {row.name}</div>
              </StyledTableCell>
              <StyledTableCell align="center">{row.description}</StyledTableCell>
              <StyledTableCell align="center">
                  <Button 
                     onClick={()=> handleAction(row.name)} 
                     className={row.enableToSpec ? `${button} ${remove}`:`${button} ${apply}`}> 
                     {row.enableToSpec ? (<><IoMdRemove size={20}/> Remove from Spec</>): (<><IoMdAdd size={20}/> Apply to Spec</>)}
                  </Button>
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
        <TableFooter className={`${footer} ${rows.length <= 3 && fixedToBottom}`}>
            <StyledTableRow>
              <StyledTableCell colSpan={3} align="center">
                <Button  disabled={pluginsToSpecState.length <= 0} className={`${button} ${submit}`}>Apply</Button>
              </StyledTableCell>
            </StyledTableRow>
        </TableFooter>
      </Table>

    </TableContainer>
  );
}