import { Chip, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, makeStyles } from '@material-ui/core';
import * as React from 'react';
import { RoutesResponse } from '../../../utils/types';


const useStyles = makeStyles(theme=>({
  header:{
    background: theme.palette.action.selected,
    color: theme.palette.text.primary
  },
  tags:{
    display:"flex",
    flexWrap: "wrap",
    maxWidth: '400px'
  }
}))

export const TableComponent = ({data}:{data: RoutesResponse[] | null}) => {

  const { header, tags } = useStyles();

  return (
    <TableContainer component={Paper}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell className={header}>Name</TableCell>
            <TableCell className={header} align="center">Protocols</TableCell>
            <TableCell className={header} align="center">Methods</TableCell>
            <TableCell className={header} align="center">Hosts</TableCell>
            <TableCell className={header} align="center">Paths</TableCell>
            <TableCell className={header} align="center">Tags</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          { data ? (
            <>
            {
              data.map((r:RoutesResponse) => (
                <TableRow
                  key={r.name}
                >
                  <TableCell component="th" scope="row">
                    {r.name}
                  </TableCell>
                  <TableCell align="center">{ r.protocols ? r.protocols.map(protocol=>(
                    <p key={protocol}>{protocol}</p>
                  )) : " - "}
                  </TableCell>
                  <TableCell align="center">
                    {r.methods ? r.methods.map(method => (<p key={method}>{method}</p>)) 
                    : " - "}
                  </TableCell>
                  <TableCell align="center">
                    {r.hosts ? r.hosts.map(host => (<p key={host}>{host}</p>)) 
                    : " - "}
                  </TableCell>
                  <TableCell align="center">
                    {r.paths ? r.paths.map(path => (<p key={path}>{path}</p>)) 
                    : " - "}
                  </TableCell>
                  <TableCell align="center" className={tags}>{r.tags.map(tag => (
                    <Chip label={tag} key={tag} />
                  ))}</TableCell>
                </TableRow>
              ))
            }
          </>
          ) : (<TableRow><TableCell colSpan={5}> No data to display...</TableCell></TableRow>)}

        </TableBody>
      </Table>
    </TableContainer>
  );
}