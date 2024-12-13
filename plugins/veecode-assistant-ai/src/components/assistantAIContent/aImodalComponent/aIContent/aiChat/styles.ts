import { makeStyles } from "@material-ui/core";

export const useAIChatStyles = makeStyles({
    root:{
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'center',
        flexDirection: 'column'
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
        width: "100%",
        marginTop: '3rem',
        display: "flex",
        alignItems: "flex-end",
        justifyContent: "center",
        flexDirection:"column",
        gap: '.8rem',
    }
})