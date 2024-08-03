import { Theme, makeStyles } from "@material-ui/core";

export const useWorkflowDetailsStyles = makeStyles<Theme>(theme=>({
    root:{
      margin: theme.spacing(2)
    },
    container:{
      padding: '1rem',
      [theme.breakpoints.up('md')]: {    
        backgroundColor: theme.palette.background.paper 
       },
       [theme.breakpoints.down('md')]: {
        minWidth:'500px'
       }
    },
    workflowDetailsNavbar:{
      padding: '.5rem 1rem',
    },
    itemContent:{
      width: '100%',
      [theme.breakpoints.down('md')]: {
        width: 'auto',
        margin: '1rem'
       }
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
    statusWrapper:{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '.5rem'
    },
    link:{
      color: theme.palette.link,
      textAlign: 'center',
      hover:{
        color: theme.palette.linkHover
      }
    },
    footer:{
      width: 'auto',
      background: theme.palette.background.paper,
      padding: '1rem 0',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-end'
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