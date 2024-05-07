import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles(theme => ({
    uploadWrapper:{
        margin: '3rem 0',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
    },
    uploadElement:{
        background: theme.palette.background.paper,
        border: `2px dashed ${theme.palette.divider}`,
        borderRadius: '8px',
        width:'90%',
        maxWidth:'1000px',
        height: '70%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        gap: '1rem',
        padding: '2rem .5rem',
        marginTop: '.6rem',
        '& strong':{
            color: theme.palette.link,
            cursor: 'pointer'
        },
        '&:hover':{
          border: `2px dashed ${theme.palette.grey[500]}`,
        }
    },
    textUploadElement:{
        fontSize: '1.2rem',
        fontBold: '700',
        width: '70%',
        textAlign: 'center'
    },
    uploadedFileWrapper:{
        width:'90%',
        maxWidth:'1100px',
        padding: '1.1rem .5rem'
    },
    thumb:{
        width: '100%',
        backgroundColor: theme.palette.background.default,
        margin: '1rem 0'
    },
    thumbIcon: {
        width: '50px',
        height: 'auto'
    },
    removeThumb:{
        color: theme.palette.text.primary,
        width: '30px',
        height: '30px',
        border: `1px solid ${theme.palette.background.default}`,
        cursor: 'pointer',
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        '&:hover':{
            color: theme.palette.errorText,
        }
    }
}))
