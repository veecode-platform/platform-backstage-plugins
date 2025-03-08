import { makeStyles } from "@material-ui/core";
import { themeVariables } from "../../../utils/constants/theme";

export const useTableComponentStyles = makeStyles({
    tableWrapper:{
        marginTop: '-1rem',
        maxHeight: '90%',
        overflowY: "auto",
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