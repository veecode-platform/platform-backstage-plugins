import { makeStyles } from "@material-ui/core";

export const useLoadingProgressStyles = makeStyles(theme=>({
    root:{
       display: 'flex',
       flexDirection: 'column', 
       gap: '1.8rem', 
       padding:'2rem'
    },
    baseSkeleton:{
      width: '100%',
      backgroundColor: `${theme.palette.grey[500]}60`,
      borderRadius: '5px',
    },
    titlebar:{
        height: '74px',
    },
    chartbar:{
        height: '495px'
    },
    detailsbar:{
        height: '344px'
    }
}))