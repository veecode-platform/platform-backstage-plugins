import { makeStyles } from "@material-ui/core";

export const usePipelineActionsStyles = makeStyles(theme => (({
    button: {
      padding: '0 1.2rem',
      background: theme.palette.info.main,
      minHeight: '46px',
      borderRadius: '5px',
      fontSize: '.85rem',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '1rem',
      color: '#F5F5F5',
      cursor: 'pointer'
    },
    inProgress: {
      animation: '$spin 2s linear infinite'
    },
    '@keyframes spin': {
      '0%': {
        transform: 'rotate(0deg)'
      },
      '100%': {
        transform: 'rotate(360deg)'
      }
    },
    boxInfo: {
      padding: '1rem',
      fontSize: '1rem',
      borderRadius: '8px',
      background: '#60a5fa40',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: '.5rem'
    },
    buttonDocs: {
      alignSelf: 'flex-end',
      background: '#f5f5f5',
      color: '#151515',
      fontSize: '10px',
      '&:hover': {
        background: '#f5f5f5'
      }
    }
  })));