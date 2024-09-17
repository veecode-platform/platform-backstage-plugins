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
import { PluginForSpec } from '../../../../utils/types';
import useAsync from 'react-use/esm/useAsync';


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
  
  const { specName } = props;
  const { root,iconAndName, button, apply, remove, submit, footer, fixedToBottom } = usePluginsTableStyles();
  const { listAllPluginsForSpec } = useKongServiceManagerContext();

  
  const fetchData = async (): Promise<PluginForSpec[]> => {
    const data = await listAllPluginsForSpec(specName) as PluginForSpec[];
    return data;
  };

  const {loading, error, value: allPlugins } = useAsync(fetchData,[]) // to do

  const rows = allPlugins ? allPlugins.map(
    plugin => createData(plugin.name, plugin.image,plugin.description, plugin.config, plugin.enabledToSpec)
  ) : []

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
                {
                 row.enableToSpec ? 
                  <Button className={`${button} ${remove}`}> <IoMdRemove size={20}/> Remove from Spec </Button>
                  : <Button className={`${button} ${apply}`}> <IoMdAdd size={20}/> Apply to Spec </Button> 
                 }
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
        <TableFooter className={`${footer} ${rows.length <= 3 && fixedToBottom}`}>
            <StyledTableRow>
              <StyledTableCell colSpan={3} align="center">
                <Button className={`${button} ${submit}`}>Apply</Button>
              </StyledTableCell>
            </StyledTableRow>
        </TableFooter>
      </Table>

    </TableContainer>
  );
}