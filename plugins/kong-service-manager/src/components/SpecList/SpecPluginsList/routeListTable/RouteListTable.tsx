import React from "react";
import { useKongServiceManagerContext } from "../../../../context";
import { StyledTableCell, StyledTableRow, useRouteListTableStyles } from "./styles";
import { DefaultTableProps, RouteListTableProps } from "./types";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { LoadingComponent } from "../../../../components/shared";
import { MdOpenInNew } from "react-icons/md";

const createData = (
    name: string,
    id: string
) => {
    return { name, id }
};


const DefaultTable : React.FC<DefaultTableProps> = (props) => {
  const { root } = useRouteListTableStyles();
  const { children } = props;

  return (
    <TableContainer className={root}>
      <Table sx={{ minWidth: 700 }} aria-label="plugins table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Name</StyledTableCell>
            <StyledTableCell align="center">Id</StyledTableCell>
            <StyledTableCell align="center">Action</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>{children}</TableBody>
      </Table>
    </TableContainer>
  );
}


const RouteListTable : React.FC<RouteListTableProps> = (props) => {

    const { routes,loading } = props;
    const { column } = useRouteListTableStyles();
    const { setRouteId } = useKongServiceManagerContext();

    const rows = ( routes && routes.length > 0 ) ? routes.map(
        route => createData(route.name, route.id)
      ) : [];

    const handleSetRoute = (routeId:string) => {
      setRouteId(routeId)
    }

    if(loading){
      <DefaultTable>
        <LoadingComponent/>
      </DefaultTable>
    }

    return (
          <DefaultTable>
              { rows.map((row) => (
                  <StyledTableRow key={row.id}>
                    <StyledTableCell component="th" scope="row">
                    <div className={column}>{row.name}</div>
                    </StyledTableCell>
                    <StyledTableCell align="center">{row.id}</StyledTableCell>    
                    <StyledTableCell align="center">
                      <MdOpenInNew onClick={() => handleSetRoute(row.id)} size={26} color="#CDCDCD" style={{ cursor: 'pointer'}}/>
                    </StyledTableCell>
                  </StyledTableRow>
                ))
              }
          </DefaultTable>
    )
}

export default React.memo(RouteListTable)