import { Theme, makeStyles } from "@material-ui/core";

export const useStyles = makeStyles<Theme>(theme=>({
    root:{
      margin: theme.spacing(2)
    },
    container:{
      backgroundColor: theme.palette.background.paper,
      padding: '1rem'
    },
    workflowDetailsNavbar:{
      padding: '.5rem 1rem',
    },
    itemContent:{
      width: '100%',
    },
    itemWrapper:{
      flexDirection: 'column',
      justifyContent: 'flex-start',
      alignItems: 'center',

    },
    workflowInfo:{
      display:'flex',
      alignItems: 'center',
      justifyContent: 'flex-start',
      marginTop: '.3rem',
      gap: '.5rem'
    },
    avatarImg:{
      objectFit:'cover',
      width: '42px',
      height: 'auto',
      borderRadius:'50%'
    },
    link:{
      color: theme.palette.link,
      textAlign: 'center',
      hover:{
        color: theme.palette.linkHover
      }
    },
    jobsSection:{
      marginTop: '1.5rem',
      padding: '1.5rem',
      backgroundColor: theme.palette.background.default
    },
    jobsContent:{
      width: '100%',
      display: 'flex',
      margin: '10rem 1rem',
      gap: '2rem',
    },
    jobItem:{
      width: '350px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      backgroundColor: '#0611182d',
      backdropFilter: 'blur(13.5px)',
      '-webkit-backdrop-filter':'blur(13.5px)',
      padding: '1rem',
      borderRadius: '10px',
      border: `1px solid ${theme.palette.background.paper}`,
      cursor: 'pointer'
    },
    jobDuration:{
      justifySelf: 'flex-end',
      width: '40%'
    }
}))