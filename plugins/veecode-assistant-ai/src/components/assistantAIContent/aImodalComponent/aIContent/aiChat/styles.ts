import { makeStyles } from "@material-ui/core";

export const useAIChatStyles = makeStyles(theme => ({
    root:{
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        [theme.breakpoints.down('md')]: {
          scrollY: 'auto',
          flexDirection: 'column'
         }
    },
    chatContent:{
      flex:'4',
      [theme.breakpoints.down('md')]: {
        width: '100%'
       }
    },
    footer:{
       display: "flex",
       alignItems: "flex-start",
       justifyContent: "center",
       flexDirection: "column",
       gap: '1rem',
       padding: '1rem 0'
    },
    buttonGroup:{
        flex: '1',
        width: "100%",
        height: "100%",
        minHeight: "50vh",
        marginTop: '2rem',
        display: "flex",
        alignItems: "flex-end",
        justifyContent: "center",
        flexDirection:"column",
        gap: '.8rem'
    },
    spinner:{
        marginLeft: '.5rem'
      },
      creatingPr:{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '1rem'
      }
}))