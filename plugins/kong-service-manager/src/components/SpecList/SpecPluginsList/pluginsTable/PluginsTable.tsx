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


// mock
function createData(
  name: string,
  description: string,
  action: React.ReactNode,
) {
  return { name, description, action };
}



export const PluginsTable = () => {
  
  const { root,button, apply, remove, submit, footer } = usePluginsTableStyles();

  const rows = [
    createData('Key Auth', 'Add key authentication to your Services', <><Button className={`${button} ${apply}`}> <IoMdAdd size={20}/> <span>Apply in Spec</span></Button></>),
    createData('Rate Limiting', 'Rate limit how many HTTP requests can be made in a period of time', <> <Button className={`${button} ${remove}`}> <IoMdRemove size={20} /> <span>Remove From spec</span></Button></>),
    createData('Key Auth', 'Add key authentication to your Services', <><Button className={`${button} ${apply}`}> <IoMdAdd size={20}/> <span>Apply in Spec</span></Button></>),
    createData('Rate Limiting', 'Rate limit how many HTTP requests can be made in a period of time', <> <Button className={`${button} ${remove}`}> <IoMdRemove size={20} /> <span>Remove From spec</span></Button></>),
    createData('Key Auth', 'Add key authentication to your Services', <><Button className={`${button} ${apply}`}> <IoMdAdd size={20}/> <span>Apply in Spec</span></Button></>),
    createData('Rate Limiting', 'Rate limit how many HTTP requests can be made in a period of time', <> <Button className={`${button} ${remove}`}> <IoMdRemove size={20} /> <span>Remove From spec</span></Button></>),
    createData('Key Auth', 'Add key authentication to your Services', <><Button className={`${button} ${apply}`}> <IoMdAdd size={20}/> <span>Apply in Spec</span></Button></>),
    createData('Rate Limiting', 'Rate limit how many HTTP requests can be made in a period of time', <> <Button className={`${button} ${remove}`}> <IoMdRemove size={20} /> <span>Remove From spec</span></Button></>),
    createData('Key Auth', 'Add key authentication to your Services', <><Button className={`${button} ${apply}`}> <IoMdAdd size={20}/> <span>Apply in Spec</span></Button></>),
    createData('Rate Limiting', 'Rate limit how many HTTP requests can be made in a period of time', <> <Button className={`${button} ${remove}`}> <IoMdRemove size={20} /> <span>Remove From spec</span></Button></>),
    createData('Key Auth', 'Add key authentication to your Services', <><Button className={`${button} ${apply}`}> <IoMdAdd size={20}/> <span>Apply in Spec</span></Button></>),
    createData('Rate Limiting', 'Rate limit how many HTTP requests can be made in a period of time', <> <Button className={`${button} ${remove}`}> <IoMdRemove size={20} /> <span>Remove From spec</span></Button></>),
    createData('Key Auth', 'Add key authentication to your Services', <><Button className={`${button} ${apply}`}> <IoMdAdd size={20}/> <span>Apply in Spec</span></Button></>),
    createData('Rate Limiting', 'Rate limit how many HTTP requests can be made in a period of time', <> <Button className={`${button} ${remove}`}> <IoMdRemove size={20} /> <span>Remove From spec</span></Button></>),
    createData('Key Auth', 'Add key authentication to your Services', <><Button className={`${button} ${apply}`}> <IoMdAdd size={20}/> <span>Apply in Spec</span></Button></>),
    createData('Rate Limiting', 'Rate limit how many HTTP requests can be made in a period of time', <> <Button className={`${button} ${remove}`}> <IoMdRemove size={20} /> <span>Remove From spec</span></Button></>),
    createData('Key Auth', 'Add key authentication to your Services', <><Button className={`${button} ${apply}`}> <IoMdAdd size={20}/> <span>Apply in Spec</span></Button></>),
  ];

  return (
    <TableContainer className={root}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
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
                {row.name}
              </StyledTableCell>
              <StyledTableCell align="center">{row.description}</StyledTableCell>
              <StyledTableCell align="center">{row.action}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
        <TableFooter className={footer}>
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