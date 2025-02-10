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

export const usePluginsTableStyles = makeStyles(theme => ({
    root:{
        marginTop: '1rem',
        borderRadius: '5px',
        minHeight: '50vh',
        position:  'relative'
    },
    iconAndName:{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-start',
      gap: '1rem',
      padding: '0 .5rem',
      '& img':{
        width: '40px'
      }
    },
    apply:{
     backgroundColor: theme.palette.background.default,
     color: theme.palette.text.primary,
     '&:hover':{
        backgroundColor: theme.palette.linkHover,
        color: theme.palette.background.default,
    }
    },
    remove:{
        backgroundColor: theme.palette.link,
        color: theme.palette.background.default,
        '&:hover':{
            backgroundColor: theme.palette.error.main,
            color: theme.palette.text.primary,
        }
    },
    submit:{
        marginRight:'4.5rem',
        backgroundColor: theme.palette.link,
        color: theme.palette.background.default,
        '&:hover':{
            backgroundColor: theme.palette.linkHover,
            color: theme.palette.background.default,
        },
        '&:disabled': {
          backgroundColor: theme.palette.action.disabledBackground,
          color: theme.palette.action.disabled,
          cursor: 'not-allowed'
        }
    },
    noPluginsInfo:{
      margin: '.5rem auto 0 auto',
      padding: '1rem',
      borderRadius: '10px',
      backgroundColor: "#61AFFE35",
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-start',
      gap: '1rem'
    },
    footer:{
        background: theme.palette.background.default,
        marginTop: '2rem'
    },
    fixedToBottom: {
     position: 'absolute',
     bottom: '0',
     right: '0'
    }
}))