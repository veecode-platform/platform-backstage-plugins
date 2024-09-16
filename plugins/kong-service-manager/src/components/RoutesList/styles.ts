import { makeStyles } from "@material-ui/core";

export const useRoutesListStyles = makeStyles(theme =>({
  content:{
    height: '100%',
    minHeight: '65vh',
    margin:'.5rem',
  },
  button:{
    outline: 'none',
    border: `1px solid #ced4da`,
    borderRadius: theme.shape.borderRadius,
    width: '100%',
    height: '46px',
    marginBottom: '-.5rem',
    padding: '.5rem 1rem',
    '&:hover':{
      transition: 'all .5s ease-in-out',
    }
   }
}))