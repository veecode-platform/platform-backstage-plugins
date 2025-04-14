import { makeStyles } from "@material-ui/core";
import { themeVariables } from "../../../../utils/constants/theme";

export const useStepperStyles = makeStyles({
    root:{
        backgroundColor: themeVariables.background.dark,
        width: '100%'
    },
    input: {
      '& input':{
        padding: '.5rem !important',
        minHeight: '38px !important'
      },
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
})