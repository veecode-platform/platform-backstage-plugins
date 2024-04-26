import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles(theme => ({
    uploadWrapper:{
        display: 'flex',
        flex: '1.2',
        background: theme.palette.background.default,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
    },
    uploadElement:{
        border: `2px dashed ${theme.palette.background.paper}`, 
        borderRadius: '8px',
        width:'90%',
        height: '70%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        gap: '1rem',
        padding: '1rem',
        marginTop: '.6rem'
    },
    iconUpload: {
        fill: theme.palette.link,
    },
    textUploadElement:{
        fontSize: '1.5rem',
        fontBold: '700',
        width: '70%',
        textAlign: 'center'
    },
    thumbsContainer:{
        width: '100%',
        height: 'auto',
        padding: '1rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '.8rem'
    },
    thumb:{
        marginTop: '2rem',
        width: '100%',
        height: '60px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '.5rem'
    },
    thumbIcon: {
        width: '50px',
        height: 'auto'
    },
    removeThumb:{
        background: theme.palette.errorBackground,
        color: theme.palette.errorText,
        width: '30px',
        height: '30px',
        border: `1px solid ${theme.palette.errorText}`,
        cursor: 'pointer',
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    }
}))
