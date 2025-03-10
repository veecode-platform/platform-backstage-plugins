import { makeStyles } from "@material-ui/core";
import { themeVariables } from "../../../utils/constants/theme";

export const useModalComponentStyles = makeStyles(theme => ({
    modalOnBlur: {
        width: '100%',
        height: '100%',
      },
      modalContent: {
        backdropFilter: 'blur(8px)',
        '-webkit-backdrop-filter': 'blur(8px)',
        width: '100%',
        height: '100%',
        padding: '1rem',
        borderRadius: '8px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        [theme.breakpoints.down('md')]: {
          width: '100%',
        },
        overflowY: 'scroll',
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
      modalHeader: {
        width: '100%',
        padding: '.8rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
      },
      modalBody: {
        width: '70%',
        margin: 'auto',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        backgroundColor: themeVariables.background.main,
        boxShadow:
          'rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px',
        borderRadius: '5px',
        [theme.breakpoints.down('md')]: {
          width: '95%',
        },
      },
      container: {
        width: '100%',
        height: '100%',
        backgroundColor: themeVariables.background.dark,
        borderRadius: '5px',
        border: `1px solid ${theme.palette.grey[700]}`,
      },
      titleBar: {
        width: '100%',
        padding: '.8rem 2rem',
        backgroundColor: themeVariables.background.main,
        borderRadius: '5px 5px 0 0 ',
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '1rem',
        '&:after': {
          content: '""',
          display: 'block',
          position: 'absolute',
          left: 0,
          top: 0,
          bottom: 0,
          width: '6px',
          backgroundColor: themeVariables.colors.main,
          borderRadius: '5px 0 0 0',
        },
      },
      titleContent: {
        width: '100%',
      },
      closeModal: {
        cursor: 'pointer',
        color: themeVariables.colors.grey,
        transition: 'all .5s ease-in-out',
        marginRight: '-1rem',
        '&:hover': {
          color: themeVariables.colors.main,
        },
      },
      content: {
        width: '100%',
        padding: '1rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start',
        flexDirection: 'column',
        gap: '1rem',
        backgroundColor: themeVariables.background.dark,
        borderBottomRightRadius: '10px',
        borderBottomLeftRadius: '10px',
      },
}));