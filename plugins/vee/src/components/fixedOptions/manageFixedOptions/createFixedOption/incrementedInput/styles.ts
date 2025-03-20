import makeStyles from "@mui/styles/makeStyles";
import { themeVariables } from "../../../../../utils/constants/theme";

export const useIncrementedInputStyles = makeStyles({
    root: {
      display: 'flex',
      justifyContent: 'flex-start',
      alignItems: 'center',
      flexDirection: 'column',
      gap: '1rem',
      backgroundColor: themeVariables.background.dark,
      padding: '.8rem',
      border: `1px solid ${themeVariables.border.main}`
    },
    newOptionStyle: {
        width: '100%',
        backgroundColor: themeVariables.colors.darkGrey,
        padding: '1rem'
    },
    inputGroup: {
        width: '100%',
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'center',
        flexDirection: 'column',
        gap: '.6rem',
    },
    input: {
        width: '100%',
        '& input[type=number]': {
          '-moz-appearance': 'textfield'
        },
        '& input[type=number]::-webkit-outer-spin-button': {
          '-webkit-appearance': 'none',
          margin: 0
        },
        '& input[type=number]::-webkit-inner-spin-button': {
          '-webkit-appearance': 'none',
          margin: 0
        }
      },
      actionButton:{
        backgroundColor: 'red'
      },
      buttonGroup:{
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '.5rem'
      },
      resetButton: {
        padding: '.4rem',
        borderRadius: '50%',
        backgroundColor: themeVariables.background.main,
        color: themeVariables.colors.grey,
        transition: 'all .5s ease-in',
        '&:hover':{
          backgroundColor: themeVariables.colors.dark,
          color: themeVariables.colors.main,
          transform: 'rotate(240deg)',
          transition: 'all .5s ease-in-out',
        }
      },
      addButton:{
        backgroundColor: themeVariables.background.main,
        color: themeVariables.colors.grey,
        padding: '.4rem',
        borderRadius: '50%',
        transition: 'all .5s ease-in',
        '&:hover':{
          backgroundColor: themeVariables.colors.dark,
          color: themeVariables.colors.main,
          transition: 'all .5s ease-in-out',
        }
      },
      footerButton: {
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-end",
        marginTop: '.7rem',
      }
})