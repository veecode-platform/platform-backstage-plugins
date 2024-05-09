import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles(theme=>({
    autocompleteWrapper:{
      width: '100%',
      maxWidth: '1100px'
    },
    descriptionContent:{
        paddingTop: theme.spacing(2),
    },
    boxInfo: {
        padding: '1rem',
        fontSize: '1rem',
        borderRadius: '8px',
        background: '#60a5fa40',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '.5rem',
      },
      skeletonContent:{
        width: '100%',
        maxWidth: '1100px',
        padding: '1rem 0'
      }
}))
