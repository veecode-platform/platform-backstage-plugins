import { makeStyles } from "@material-ui/core";
import { themeVariables } from "../../../utils/constants/theme";

export const useTableComponentStyles = makeStyles({
    tableWrapper:{
        marginTop: '-1rem',
        maxHeight: '90%',
        overflowY: "auto",
        '& .MuiTable-root': {
            backgroundColor: themeVariables.background.main,
            color: themeVariables.colors.white, // Cor de fundo geral
          },
          '& .MuiTableCell-head': {
            backgroundColor: themeVariables.background.dark, // Cabeçalho da tabela
            border: `2px solid ${themeVariables.background.dark}`,
            fontWeight: 'bold',
          },
          '& .MuiTableRow-root:nth-of-type(odd)': {
            backgroundColor: themeVariables.colors.darkGrey, // Linhas ímpares
          },
          '& .MuiTableRow-root:hover': {
            backgroundColor:  themeVariables.background.secondary, // Cor ao passar mouse
          },
    },
    actionButton: {
        margin: 'auto .5rem',
        transition: 'all .5s ease-in-out'
    },
    deleteAction: {
        transition: 'all .5s ease-in-out',
        '&:hover':{
            color: themeVariables.colors.red,
            transition: 'all .5s ease-in'
        }
    },
    editAction: {
        transition: 'all .5s ease-in-out',
        '&:hover':{
            opacity: '0.6',
            transition: 'all .5s ease-in'
        }
    }
})