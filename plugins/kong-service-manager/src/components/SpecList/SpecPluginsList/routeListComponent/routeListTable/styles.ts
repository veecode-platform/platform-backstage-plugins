import { makeStyles, styled, TableRow } from "@material-ui/core";
import TableCell, { tableCellClasses } from '@mui/material/TableCell';

export const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.background.default,
      color: theme.palette.text.primary,
      borderBottom: '1px solid grey'
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));
  
export const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));

export const useRouteListTableStyles = makeStyles({
    root:{
        marginTop: '1rem',
        borderRadius: '5px',
        minHeight: '50vh',
        position:  'relative'
    },
    column:{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-start',
      gap: '1rem',
      padding: '0 .5rem',
      '& img':{
        width: '40px'
      }
    }
})