import { makeStyles } from "@material-ui/core";

export const useModalStyles = makeStyles(theme=>({
    modal: {
        padding: '2rem',
        borderTop: `1px solid ${theme.palette.divider}`,
        display: 'flex',
        alignItems: 'stretch',
        justifyContent: 'center',
        flexDirection: 'column',
        gap: '1rem'
      },
      label:{
        marginLeft: '-.7rem',
      },
      formControl: {
        width: '100%'
      },
      selectEmpty: {
        marginTop: theme.spacing(2),
      },
      footer:{
        paddingBottom: '1rem'
      }
}))