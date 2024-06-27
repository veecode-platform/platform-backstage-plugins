import { makeStyles } from "@material-ui/core";

export const useResourcesComponentStyles = makeStyles( theme =>
    ({
        root:{
            display: 'grid',
            gridTemplateColumns: 'repeat(2,1fr)',
            gap: '1rem',
            padding: '1rem',
            [theme.breakpoints.down('lg')]: {
                gridTemplateColumns: '1fr',
                gap: '4rem',
             },
            position: 'relative'
        },
        chartStyles:{
           width: '100%',
           display: 'flex',
           alignItems: 'center',
           justifycontent: 'center',
           position:'relative',
           [theme.breakpoints.down('md')]: {
            width: '100%',
            display: 'block',
            overflowX: 'scroll'
           }

        },
        tableStyles:{
           width: '80%',
           margin:'auto',
           [theme.breakpoints.down('md')]: {
            width: '100%',
            overflowX: 'scroll'
           }
        },
        expandDetails:{
            cursor:'pointer',
            position: 'absolute',
            right: '0'
        }
    })
)