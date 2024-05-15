import { makeStyles } from "@material-ui/core";

export const useWorkflowActionsStyles = makeStyles({
    inProgress:{
      animation: '$spin 2s linear infinite'
    },
    waitResponse:{
      animation: '$pulse 2s linear infinite',
      color: '#FEF050',
      cursor: 'wait'
    },
    buttonWait:{
      background: 'transparent',
      border: 'none',
      outline: 'none'
    },
    '@keyframes spin':{
      '0%':{
        transform: 'rotate(0deg)'
      },
      '100%': {
        transform: 'rotate(360deg)'
      }
    },
    '@keyframes pulse': {
      '50%': {
        transform: 'scale(1.1)',
      },
      '100%': {
        transform: 'scale(1.3)',
      }
    }
  });