import { makeStyles } from "@material-ui/core";
import { themeVariables } from "../../../utils/constants/theme";

export const useStepperComponentStyles = makeStyles({
      root:{
          backgroundColor: themeVariables.background.dark,
          width: '100%',
          maxWidth: themeVariables.layout.maxWidth
      },
      input: {
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
      textareaStyles: {
        width: '100%',
        color: themeVariables.colors.white,
        background: 'transparent',
        padding: '.5rem',
        '& textarea[type=number]': {
          '-moz-appearance': 'textfield'
        },
        '& textarea[type=number]::-webkit-outer-spin-button': {
          '-webkit-appearance': 'none',
          margin: 0
        },
        '& input[type=number]::-webkit-inner-spin-button': {
          '-webkit-appearance': 'none',
          margin: 0
        }
      }
})