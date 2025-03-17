import { makeStyles } from "@material-ui/core";
import { themeVariables } from "../../../utils/constants/theme";

export const useArchivesFileStyles = makeStyles({
    root: {
        width: "100%",
        height: "100% !important",
        backgroundColor: themeVariables.background.main,
        overflow: 'auto',
        "&::-webkit-scrollbar": {
            width: "6px",
            height: "4px",
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
    menu:{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        justifyContent: "center",
        gap: '.3rem'
    },
    item:{
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-start",
        gap: '-20rem'
    },
    itemLabel:{
        marginLeft: '-.7rem'
    },
    subMenu:{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        justifyContent: "center",
        marginLeft: '20px'
    }
})