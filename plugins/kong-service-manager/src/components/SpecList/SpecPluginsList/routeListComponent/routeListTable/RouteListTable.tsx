import React from 'react';
import { useKongServiceManagerContext } from '../../../../../context';
import {
  StyledTableCell,
  StyledTableRow,
  useRouteListTableStyles,
} from './styles';
import { DefaultTableProps, RouteListTableProps } from './types';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { ExpandIcon, LoadingComponent, MethodLabel } from '../../../../shared';
import { addRouteDetails } from '../state';
import { transformPath } from '../../../../../utils/helpers/transformPath';
import { RouteDetailsProps } from '../../../../../utils/types';
import { IconButton } from '@material-ui/core';

const createData = (
  id: string,
  method: string,
  name: string, // not used in table
  path: string,
) => {
  return { id, method, name, path };
};

const DefaultTable: React.FC<DefaultTableProps> = props => {
  const { root } = useRouteListTableStyles();
  const { children } = props;

  return (
    <TableContainer className={root}>
      <Table sx={{ minWidth: 700 }} aria-label="plugins table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Id</StyledTableCell>
            <StyledTableCell align="center">Method</StyledTableCell>
            <StyledTableCell align="center">Path</StyledTableCell>
            <StyledTableCell align="center">Action</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>{children}</TableBody>
      </Table>
    </TableContainer>
  );
};

const RouteListTable: React.FC<RouteListTableProps> = props => {
  const { routes, loading, setRouteDetails } = props;
  const { column } = useRouteListTableStyles();
  const { setRouteId } = useKongServiceManagerContext();

  const rows =
    routes && routes.length > 0
      ? routes.map(route =>
          createData(route.id, route.methods[0], route.name, route.paths[0]),
        )
      : [];

  const handleSetRoute = (routeParams: RouteDetailsProps) => {
    setRouteId(routeParams.id);
    setRouteDetails(
      addRouteDetails({
        id: routeParams.id,
        method: routeParams.method,
        name: routeParams.name,
        path: routeParams.path,
      }),
    );
  };

  if (loading) {
    <DefaultTable>
      <LoadingComponent />
    </DefaultTable>;
  }

  return (
    <DefaultTable>
      {rows.map(row => (
        <StyledTableRow key={row.id}>
          <StyledTableCell component="th" scope="row">
            <div className={column}>{row.id}</div>
          </StyledTableCell>
          <StyledTableCell align="center">
            <MethodLabel variant={row.method} />
          </StyledTableCell>
          <StyledTableCell align="center">
            {transformPath(row.path)}
          </StyledTableCell>
          <StyledTableCell align="center">
            <IconButton onClick={() => handleSetRoute(row)}>
              <ExpandIcon />
            </IconButton>
          </StyledTableCell>
        </StyledTableRow>
      ))}
    </DefaultTable>
  );
};

export default React.memo(RouteListTable);
