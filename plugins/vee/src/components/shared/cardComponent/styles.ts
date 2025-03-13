import { makeStyles } from "@material-ui/core";
import { themeVariables } from "../../../utils/constants/theme";

export const useCardElementStyles = makeStyles({
   root:{
    width: '500px',
    height: '100%',
    padding: '1rem',
    borderRadius: '5px',
    backgroundColor: themeVariables.background.main,
    border: `1px solid ${themeVariables.border.main}`,
    cursor: 'pointer',
    transition: 'all 0.5s ease-in-out',
    '&:hover':{
        border: `1px solid ${themeVariables.colors.main}`,
        backgroundColor: themeVariables.background.secondary,
        transition: 'all 0.5s ease-in',
    }
   },
   card: {
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
   },
   content:{
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    padding: '.8rem auto'
   },
   iconStyle:{
    display: "flex",
    alignItems: 'flex-start',
    justifyContent: "center",
    height: "100%",
   },
   iconImg:{
    width: '60px',
    height: '60px',
    backgroundColor: 'transparent'
    // backgroundColor: themeVariables.colors.dark
   },
   titleStyle: {
    color: themeVariables.colors.white
   },
   subtitleStyle: {
    color: themeVariables.colors.main
   },
   descriptionSyle: {
    color: themeVariables.colors.white
   },
   chips: {
     width: "100%",
     display: "flex",
     alignSelf:"center",
     justifyContent: "flex-end",
     paddingTop: ".5rem"
   }
});

export const useCardComponentStyles = makeStyles({    
    link:{
    textDecoration: 'none !important'}
})