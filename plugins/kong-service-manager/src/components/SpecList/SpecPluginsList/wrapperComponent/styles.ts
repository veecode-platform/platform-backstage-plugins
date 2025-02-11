import { makeStyles } from "@material-ui/core";

export const useWrapperComponentStyles = makeStyles( theme => ({
   root:{
    width: '100%',
    minHeight: '65vh',
    padding: '1rem',
    backgroundColor: theme.palette.background.default
   },
   content:{
    backgroundColor: theme.palette.background.paper,
    borderRadius: '5px',
    padding: '1rem .5rem',
    background: theme.palette.background.paper,
    boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px'
   },
   titleBar:{
      width: '100%',
      padding: '.5rem',
      borderBottom: '1px solid grey',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      '& strong':{
         color: theme.palette.linkHover,
         marginRight: '.5rem'
      },
   }
}))