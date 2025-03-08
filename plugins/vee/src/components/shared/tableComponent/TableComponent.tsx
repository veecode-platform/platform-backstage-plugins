import React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import type { TableComponentProps } from './types';
import TablePagination from '@mui/material/TablePagination';
import TableFooter from "@mui/material/TableFooter";
import  IconButton  from '@mui/material/IconButton';
import { MdDelete, MdEdit } from "react-icons/md";
import { useTableComponentStyles } from './styles';
import { EmptyStateComponent } from '../emptyStateComponent/EmptyStateComponent';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
    textTransform: "capitalize",
    textAlign: "center"
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    textAlign: "center"
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

function createData<T extends Record<string, any>>(data: T): T {
  return data;
}


export const TableComponent = 
<T extends Record<string,any>> 
(props: TableComponentProps<T[]>) => {

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const {title, data, noId, actions, onEdit, onDelete} = props;
  const { tableWrapper,actionButton, editAction, deleteAction } = useTableComponentStyles();

  const rows = data.map((item) => {
    if (noId) {
      const { id, ...rest } = item;
      return createData(rest);
    }
    return createData(item);
  });
  const columns = rows.length > 0 ? Object.keys(rows[0]) : [];
  columns.push(actions ? "actions" : "");

  const alignCell = (cols: string[],index: number) => {
   // const firstColumnIndex = noId ? 1 : 0; 
    if (index === 0) return "left";
    if (index === cols.length - 1) return "right";
    return "center";
  
  }

  const handleChangePage = (_: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };


  if(!data || data.length === 0) return (
    <EmptyStateComponent 
      title="No data" 
      message="No data to be rendered..."/>
  )

  return (
    <TableContainer component={Paper} className={tableWrapper}>
      <Table stickyHeader sx={{ minWidth: 700 }} aria-label={title}>
        <TableHead>
          <TableRow>
            {columns.map((column,index) => (
              <StyledTableCell 
                key={column}
                align={alignCell(columns,index)}
                >{column}</StyledTableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, rowIndex) => (
              <StyledTableRow key={rowIndex}>
                {columns.map((column,index) => (
                  column !== "actions" ? (<StyledTableCell key={column} align={alignCell(columns,index)}>{row[column]}</StyledTableCell>):
                  <>
                  {
                    actions && (
                      <StyledTableCell key="actions" align="right">
                        <IconButton onClick={onEdit} color="primary" className={`${actionButton} ${editAction}`} title="Edit item">
                          <MdEdit />
                        </IconButton>
                        <IconButton onClick={onDelete} color="error" className={`${actionButton} ${deleteAction}`} title="Delete item">
                          <MdDelete />
                        </IconButton>
                    </StyledTableCell>
                    )
                  }
                  </>
                ))}
              </StyledTableRow>
            ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={columns.length} align="right">
            <TablePagination
                rowsPerPageOptions={[5,10, 25, 100]}
                component="div"
                count={rows.length}
                rowsPerPage={rowsPerPage ?? 5}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                slotProps={{
                  select:{
                    MenuProps: {
                      sx: {
                        "& .MuiMenu-list": {
                          display: "flex",
                          flexDirection: "column",
                        },
                      },
                    },
                  }
                }}
              />
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  );
}