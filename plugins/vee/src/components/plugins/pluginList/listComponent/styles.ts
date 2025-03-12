import { makeStyles } from "@material-ui/core";
import { themeVariables } from "../../../../utils/constants/theme";

export const useListComponentStyles = makeStyles({
    root:{
        width: '100%',
        maxWidth: themeVariables.layout.maxWidth,
        backgroundColor: themeVariables.background.dark,
        borderRadius: '5px',
        padding: '1rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '.5rem',
        "&::-webkit-scrollbar": {
            width: "6px",
            backgroundColor: themeVariables.background.dark,
          },
          "&::-webkit-scrollbar-track": {
            boxShadow: `inset 0 0 5px ${themeVariables.blur.dark}15`,
            borderRadius: "10px",
          },
          "&::-webkit-scrollbar-thumb": {
            background: themeVariables.border.main,
          },
          "&::-webkit-scrollbar-thumb:hover": {
            backgroundColor: themeVariables.background.secondary,
            cursor: 'pointer'
          },
    },
    listItemStyles:{
       backgroundColor: themeVariables.background.main,
       border: `1px solid ${themeVariables.border.main}`,
       cursor: 'pointer',
       borderRadius: '5px',
       transition: 'all .5s ease-in',
       '&:hover':{
        transition: 'all .5s ease-in-out',
        border: `1px solid ${themeVariables.colors.main}`,
        backgroundColor: themeVariables.background.secondary,
       }
    },
    iconStyle:{
       display: "flex",
       alignItems: 'flex-start',
       justifyContent: "center",
       height: "100%",
       },
    iconImg:{
       width: '60px',
       height: '60px',
       backgroundColor: themeVariables.colors.dark,
       display: 'flex',
       alignItems: 'center',
       justifyContent: 'center',
       borderRadius: '50px',
       padding: '.5rem',
       marginRight: '2rem'
    }
})