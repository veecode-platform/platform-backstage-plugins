import { makeStyles } from "@material-ui/core";
import { themeVariables } from "../../../utils/constants/theme";

export const useMarkdowRendererStyles = makeStyles(theme => ({
  wrapper: {
    width: "100%",
    maxWidth: "52vw",
    maxHeight: "48vh",
    color: themeVariables.colors.white,
    paddingBottom: "2rem",
    overflowY: "auto",
    fontSize: '.9rem',
    [theme.breakpoints.down('md')]: {
      maxWidth: "65vw",
     },
    '& p, & ul, & table, & div':{
      maxWidth: '95%',
    },
    /* scrollbar */
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
}));
