import { makeStyles } from "@material-ui/core";

export const useInfoboxStyles = makeStyles({
    root: {
        width: '100%',
        padding: '0 1rem',
        fontSize: '1rem',
        borderRadius: '8px',
        background: '#60a5fa40',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '.5rem',
        marginBottom: '1rem',
      },
      withoutButton:{
        width: '100%',
        padding: '.5rem',
        fontSize: '1rem',
        borderRadius: '8px',
        background: '#60a5fa40',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '.5rem',
        marginBottom: '1rem',
      }
    });