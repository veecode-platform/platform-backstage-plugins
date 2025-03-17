import { makeStyles } from "@material-ui/core";
import { themeVariables } from "../../../utils/constants/theme";

export const useContentLayoutStyles = makeStyles({
    root: {
      width: "100%",
      height: "100%",
      backgroundColor: themeVariables.background.main,
      borderRadius: "8px",
      border: `1px solid ${themeVariables.border.main}`,
    },
    header: {
      width: "100%",
      margin: "auto",
      display: "flex",
      padding: ".5rem 2rem",
      alignItems: "center",
      justifyContent: "space-between",
      borderBottom: `1px solid ${themeVariables.border.main}`,
      position: "relative",
    },
    headerWithTitle: {
      alignItems: "flex-start",
    },
    labelContent: {
      borderLeft: `3px solid ${themeVariables.colors.main}`,
      padding: "0 1.5rem",
      color: themeVariables.colors.grey
    },
    titleBar: {
      padding: "3rem 1rem",
      color: themeVariables.colors.white,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-start',
      justifyContent: 'center',
      gap: '.5rem'
    },
    subtitleBox: {
      backgroundColor: themeVariables.colors.darkGrey,
      color: themeVariables.colors.white,
      borderRadius: '5px',
      width: 'auto',
      padding: '.5rem',
      marginTop: '.2rem'
    },
    body: {
      padding: "2.5rem 2rem",
      height: "75vh",
      display: "flex",
      alignItems: "flex-start",
      justifyContent: "flex-start",
      backgroundColor: themeVariables.background.dark,
      borderBottomLeftRadius: "10px",
      borderBottomRightRadius: "10px",
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
    }
  });