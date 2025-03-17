import { makeStyles } from "@material-ui/core";
import { themeVariables } from "../../../utils/constants/theme";

export const useArchivesFileStyles = makeStyles({
    root: {
        width: "100%",
        height: "100% !important",
        backgroundColor: themeVariables.background.main,
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