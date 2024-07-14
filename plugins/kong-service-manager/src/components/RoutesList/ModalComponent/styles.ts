import { makeStyles } from "@material-ui/core";

export const useModalComponentStyles = makeStyles(theme =>
({
    modalOnBlur:{
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    modalContent:{
        backdropFilter: 'blur(8px)',
        '-webkit-backdrop-filter':'blur(8px)',
        width: '100%',
        height: '100%',
        padding: '1rem',
        borderRadius: '8px',
        [theme.breakpoints.down('md')]: {
            width: '100%'
        },
        overflowY: 'scroll',
        '&::-webkit-scrollbar': {
          width: '12px',
        },
        '&::-webkit-scrollbar-track': {
          backgroundColor: `${theme.palette.background.default}`,
        },
        '&::-webkit-scrollbar-thumb': {
          backgroundColor: `${theme.palette.grey[500]}`,
          borderRadius: '10px',
          borderColor: theme.palette.background.paper
        },
        '&::-webkit-scrollbar-thumb:hover': {
          backgroundColor: `${theme.palette.grey[700]}`,
        },
       },
       modalHeader:{
        width: '100%',
        padding: '.8rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end'
       },
       modalBody:{
        width: '85%',
        margin: 'auto',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        backgroundColor: '#1E1E1E05',
        boxShadow: 'rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px',
        borderRadius: '5px',  
        [theme.breakpoints.down('md')]: {
          width: '95%',
          },
       },
       container:{
        width: '100%',
        height: '100%',
        backgroundColor: theme.palette.background.paper,
        borderRadius: '5px',
        border: `1px solid ${theme.palette.grey[700]}`,
        },
        titleBar:{
          padding: '.8rem 2rem',
          backgroundColor: theme.palette.background.default,
          borderRadius: '5px 5px 0 0 ',
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '1rem',
          '&:after': {
              content: '""',
              display: 'block',
              position: 'absolute',
              left: 0,
              top: 0,
              bottom: 0,
              width: '6px',
              backgroundColor: theme.palette.linkHover,
              borderRadius: '5px 0 0 0'
            }
        },
        closeModal:{
          cursor: 'pointer',
          color: theme.palette.link,
          transition: 'all .5s ease-in-out',
          marginRight: '-1rem',
          '&:hover':{
              color: theme.palette.linkHover
          }
         },
        content:{
          width: '100%',
          padding: '1rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-start',
          flexDirection: 'column',
          gap: '1rem'
        },
        field: {
          width: '100%',
          marginBottom: theme.spacing(2),
        },
}));
