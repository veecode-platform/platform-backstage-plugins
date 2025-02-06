import React from "react";
import { useKongServiceManagerContext } from "../../../../../context";
import { StyledTableCell, StyledTableRow, useRouteListTableStyles } from "./styles";
import { DefaultTableProps, RouteListTableProps } from "./types";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { LoadingComponent } from "../../../../shared";
import { MdOpenInNew } from "react-icons/md";
import { addRouteDetails, RouteDetailsProps } from "../state";
import { transformPath } from "../../../../../utils/helpers/transformPath";
import { themeVariables } from "../../../../../utils/constants/theme";
import { Chip } from "@material-ui/core";

const createData = (
    id: string,
    method: string,
    name: string, // not used in table
    path: string
) => {
    return { id, method, name, path }
};


const DefaultTable : React.FC<DefaultTableProps> = (props) => {
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
}


const RouteListTable : React.FC<RouteListTableProps> = (props) => {

    const { routes,loading,setRouteDetails} = props;
    const { column } = useRouteListTableStyles();
    const { setRouteId } = useKongServiceManagerContext();

    const rows = ( routes && routes.length > 0 ) ? routes.map(
        route => createData(route.id, route.methods[0], route.name, route.paths[0])
      ) : [];

    const handleSetRoute = (routeParams:RouteDetailsProps) => {
      setRouteId(routeParams.id);
      setRouteDetails(addRouteDetails({
        id: routeParams.id,
        method: routeParams.method,
        name: routeParams.name,
        path: routeParams.path
      }))
    }

    if(loading){
      <DefaultTable>
        <LoadingComponent/>
      </DefaultTable>
    }

    return (
      <DefaultTable>
        {rows.map(row => { 
           const upperMethod = row.method.toUpperCase();
           const backgroundColor = upperMethod in themeVariables.methods
                ? themeVariables.methods[upperMethod as keyof typeof themeVariables.methods]
                : themeVariables.background.secondary;
          return (
          <StyledTableRow key={row.id}>
            <StyledTableCell component="th" scope="row">
              <div className={column}>{row.id}</div>
            </StyledTableCell>
            <StyledTableCell align="center">
              <Chip
                 label={row.method} 
                 style={{
                  color: "#FFFFFF",
                  background: backgroundColor,
                  textAlign: 'center'
                 }}
                 />
            </StyledTableCell>
            <StyledTableCell align="center">{transformPath(row.path)}</StyledTableCell>
            <StyledTableCell align="center">
              <MdOpenInNew
                onClick={() => handleSetRoute(row)}
                size={26}
                color="#CDCDCD"
                style={{ cursor: 'pointer' }}
              />
            </StyledTableCell>
          </StyledTableRow>
        )})}
      </DefaultTable>
    );
}

export default React.memo(RouteListTable)