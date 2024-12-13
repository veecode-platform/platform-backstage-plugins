import { makeStyles } from "@material-ui/core";
import { themeVariables } from "../../../../../../utils/constants/theme";

export const useMenuOptionsStyles = makeStyles({
    list:{
        width: '100%',
        listStyle: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        padding: '2rem 0',
        gap: '.5rem'
    },
    listItem:{
        width: '100%',
        padding: '1.2rem',
        backgroundColor: themeVariables.list.background,
        borderRadius: '5px',
        cursor: 'pointer',
        borderLeft: `3px solid ${themeVariables.border.main}`,
        transition: 'all .5s ease-in-out',
        '&:hover':{
            borderLeft: `3px solid ${themeVariables.colors.main}`,
            backgroundColor: themeVariables.background.secondary,
            transition: 'all .5s ease-in'
        }
    }
})