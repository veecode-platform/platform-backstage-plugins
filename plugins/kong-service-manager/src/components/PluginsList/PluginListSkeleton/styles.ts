import { makeStyles } from "@material-ui/core";

export const usePluginListSkeletonStyles = makeStyles(theme =>({
    content:{
        minHeight: '60vh',
        backgroundColor: `${theme.palette.background.default}85`,
        borderRadius: '5px',
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'center',
        flexDirection: 'column',
        gap: '30px',
        padding: '.7rem',
        paddingTop: '78px'
       },
     titleBar:{
        width: "93.5%",
        margin: "auto",
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-start"
     },
     title:{
      borderRadius: '2px'
     },
     gridCard:{
        width: '100%',
        display: 'grid',
        gridTemplateColumns: 'repeat(3,367px)',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '18.5px'
     },
     card:{
      borderRadius: '4px',
     }
}))
